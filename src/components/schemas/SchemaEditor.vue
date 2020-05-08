<template>

<split-view class="item-schema-editor">
    <template v-slot:main>
        <div class="flex-row jb ac mx-3 mb-3">
            <h2  v-if="!booting" class="text-lg mb-0">
                {{ itemSchema.name }}
            </h2>
            <el-button 
                type="primary" 
                round 
                size="small"
                :icon="loading ? 'el-icon-loading' : 'el-icon-check'"
                @click="onSaveChanges"
            >
                Guardar
            </el-button>
        </div>        
        <el-card shadow="never" class="mx-3">
            <div 
                v-if="booting" 
                v-loading="true" 
                :style="{'height': '400px'}"
            ></div>

            <schema-fields-view
                v-else
                :schema-id="schemaId"
                :fields="sortedFields"
                :section.sync="section"
            ></schema-fields-view>
        </el-card>

        <el-dialog
            title="Advertencia"
            :visible.sync="showDeleteDialog"
            width="400px"
        >
            <p class="mb-0">
                ¿Seguro deseas eliminar esta esquema de forma permanente? 
                Se eliminará cualquier objecto asociado.
            </p>
            <span slot="footer" class="dialog-footer">
                <el-button 
                    icon="el-icon-close"
                    size="small"
                    class="mr-2"
                    @click="showDeleteDialog = false"
                >
                    Cancelar
                </el-button>
                <el-button 
                    type="danger" 
                    icon="el-icon-delete" 
                    size="small"
                    @click="onDeleteSchema"
                >Confirmar</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="Clonar esquema"
            :visible.sync="showCloneDialog"
            width="400px"
            :close-on-click-modal="!cloningSchema"
            :close-on-press-escape="!cloningSchema"
            :show-close="!cloningSchema" 
        >
            <el-form label-position="top" size="small">
                <el-form-item label="Nombre del nuevo esquema">
                    <el-input v-model="cloneName"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button 
                    :disabled="cloningSchema" 
                    icon="el-icon-close"
                    size="small"
                    @click="showCloneDialog = false"
                >
                    Cancelar
                </el-button>
                <el-button
                    :disabled="cloningSchema"
                    type="primary" 
                    icon="el-icon-check"
                    size="small"
                    class="ml-2"
                    @click="onConfirmCloneSchema"
                    v-loading="cloningSchema" 
                >Confirmar</el-button>
            </span>
        </el-dialog>
    </template>

    <template v-slot:side-actions>
        <template v-if="panel === 'schema'">
            <div class="text-lg text-w6">Editar Esquema</div>
            <div class="flex-row">
                <tool-button
                    tooltip="Clonar esquema"
                    :disabled="cloningSchema" 
                    :icon="cloningSchema ? 
                        'el-icon-loading' : 'el-icon-copy-document'"
                    @click="onRequestCloneSchema"
                ></tool-button>
                <tool-button
                    tooltip="Eliminar esquema" 
                    icon="el-icon-delete"
                    class="ml-1"
                    @click="showDeleteDialog = true"
                ></tool-button>
            </div>            
        </template>
        <template v-if="panel === 'field'">
            <div class="flex-row ac">
                <el-button 
                    type="text" 
                    icon="el-icon-back" 
                    class="mr-2 back"
                    @click="onCloseFieldEditor"
                ></el-button>
                <div class="text-lg text-w6">Editar Campo</div>
            </div>
            
            <div class="flex-row">
                <tool-button
                    tooltip="Clonar campo"
                    :disabled="cloningField" 
                    :icon="cloningField ? 
                        'el-icon-loading' : 'el-icon-copy-document'"
                    @click="onCloneField"
                ></tool-button>
                <tool-button
                    class="ml-1"
                    tooltip="Eliminar campo" 
                    icon="el-icon-delete"
                    @click="onDeleteField"
                ></tool-button>                
            </div>
        </template>
    </template>

    <template v-slot:side-content>
        <template v-if="panel === 'schema'">
            <schema-add-field 
                :disabled="booting" 
                @click="onAddField"
            ></schema-add-field>

            <div 
                v-if="booting" 
                v-loading="true" 
                :style="{'height': '400px'}"
            ></div>

            <schema-editor-tabs 
                v-else 
                :schema-id="schemaId" 
                class="mt-3"
            ></schema-editor-tabs>            
        </template>

        <template v-else-if="panel === 'field'">
            <component
                :is="curField.type + '-field-editor'"
                :field-id="curField.id"
            ></component>
        </template>
    </template>
</split-view>

</template>

<script>

import ToolButton from '../blocks/ToolButton';
import SplitView from '../blocks/SplitView';
import BooleanFieldEditor from '../fields-booleans/BooleanFieldEditor';
import ChoicesFieldEditor from '../fields-choices/ChoicesFieldEditor';
import DatetimeFieldEditor from '../fields-dates/DatetimeFieldEditor';
import FileFieldEditor from '../fields-files/FileFieldEditor';
import ImageFieldEditor from '../fields-images/ImageFieldEditor';
import ItemFieldEditor from '../fields-items/ItemFieldEditor';
import NumberFieldEditor from '../fields-numbers/NumberFieldEditor';
import TextFieldEditor from '../fields-texts/TextFieldEditor';
import SchemaAddField from './SchemaAddField';
import SchemaFieldsView from './SchemaFieldsView';
import SchemaEditorTabs from './SchemaEditorTabs';
import params from '../../params';
import { itemSchemaModel } from '../../store/item-schemas/models';
import { loadSchema } from '../loader';
import { Message } from 'element-ui';
import config from '../../config';

export default {
    name: 'SchemaEditor',

    components: {
        ToolButton,
        SplitView,
        BooleanFieldEditor,
        ChoicesFieldEditor,
        DatetimeFieldEditor,
        ImageFieldEditor,
        ItemFieldEditor,
        FileFieldEditor,
        NumberFieldEditor,
        TextFieldEditor,
        SchemaAddField,
        SchemaFieldsView,
        SchemaEditorTabs
    },

    props: {
        schemaId: {
            type: [Number, String],
            required: true
        }
    },

    data() {
        return {
            showDeleteDialog: false,
            editorTab: 'schema',
            section: undefined,
            loading: false,
            booting: false,
            cloningField: false,
            cloningSchema: false,
            cloneName: '',
            showCloneDialog: false
        };
    },

    computed: {
        state() {
            return this.$store.state.schemas;
        },

        panel() {
            return this.curFieldId ? 'field' : 'schema';
        },

        curFieldId() {
            return this.$store.state.schemas.itemSchemas.fieldKey;
        },

        itemSchema() {
            return this.$store.state.schemas.itemSchemas.items[this.schemaId];
        },

        schemaImage() {
            const image = this.itemSchema.image;
            return image || image === 0 ? [image] : []; 
        },

        config() {
            return this.itemSchema.config;
        },

        fields() {
            const fields = {};
            Object.keys(params).forEach(key => {
                const store = params[key].fieldStore;
                this.itemSchema[store].forEach(fieldId => {
                    const field = this.state[store].items[fieldId];
                    if (field) {
                        fields[field.type + field.id] = field;
                    }
                });
            });
            return fields;
        },

        sortedFields() {
            return Object.values(this.fields).sort(
                (fa, fb) => (fa.order < fb.order) ? 1 : -1
            );
        },

        curField() {
            return this.curFieldId ? this.fields[this.curFieldId] : null;
        }
    },

    created() {
        this.setCurFieldKey(null);
        this.booting = true;
        loadSchema(this.$store, this.schemaId).then(() => {
            this.booting = false;
        });
    },

/*     watch: {
        '$route': function(newId, oldId) {
            console.log(newId);
            console.log(oldId);
            if (newId !== oldId) {
                this.created();
            }
        }
    }, */

    methods: {

        setCurFieldKey(key) {
            this.$store.dispatch('schemas/itemSchemas/setField', key);
        },

        onCloseFieldEditor() {
            this.setCurFieldKey(null);
        },

        onAddField(fieldType) {    
            let order = 0;
            if (this.curField) {
                order = this.curField.order - 1;
            } else if (this.sortedFields.length) {
                const nFields = this.sortedFields.length;
                order = this.sortedFields[nFields - 1].order - 1;
            }

            const param = params[fieldType];
            if (param) {
                const field = param.fieldModel.create();                    
                field.itemSchema = this.schemaId;
                field.order = order;
                if (this.section) {
                    field.config.section = this.section;
                }
                this.$store.dispatch(`schemas/${param.fieldStore}/createItem`, {
                    item: field, 
                    persist: true
                }).then(({id, type}) => {
                    this.$store.dispatch(
                        'schemas/itemSchemas/retrieveItem', this.schemaId
                    );
                });
            } else {
                this.$log.error(`Invalid field type ${fieldType}`);
            }
        },

        onRequestCloneSchema() {
            this.showCloneDialog = true;
            this.cloneName = this.itemSchema.name;
            this.cloneProgress = 0;
        },

        onConfirmCloneSchema() {
            if (!this.cloneName) {
                return;
            }

            this.cloningSchema = true;
            const schema = this.itemSchema;
            const data = itemSchemaModel.create();

            data.name = this.cloneName;
            data.category = schema.category;
            data.image = schema.image;
            data.config = schema.config;

            this.$store.dispatch('schemas/itemSchemas/createItem', {
                persist: true,
                item: data
            }).then(({ id }) => {
                const proms = [];
                this.sortedFields.forEach((field, index) => {
                    proms.push(this.cloneField(field, {itemSchema: id}));
                });
                Promise.all(proms).then(() => {
                    this.$router.push({
                        name: 'SchemaEditor', 
                        params: { schemaId: id }
                    });
                }).catch((error) => {                    
                    Message.error(config.errorMessage);
                    console.error(error);
                }).finally(() => {
                    this.cloningSchema = false;
                    this.showCloneDialog = false;
                });                
            }).catch((error) => {
                this.cloningSchema = false;
                this.showCloneDialog = false;
                Message.error(config.errorMessage);
                console.error(error);
            });
        },

        onCloneField() {
            if (this.curField) {
                this.cloningField = true;
                const order = this.curField.order - 1;
                this.cloneField(
                    this.curField, {order: order}
                ).then(() => {
                    this.cloningField = false;
                    this.$store.dispatch(
                        'schemas/itemSchemas/retrieveItem', this.schemaId
                    );
                }).catch(() => {
                    this.cloningField = false;
                    Message.error('No se ha podido ejecutar la operación');
                });               
            }
        },

        cloneField(field, data) {
            const param = params[field.type];
            const clonedField = field;

            field = {...field, ...data};
                
            if (param.type === 'choices') {
                field = {
                    ...field,
                    default: [], 
                    choices: []
                };
            }

            return new Promise((resolve, reject) => {
                this.$store.dispatch(
                    `schemas/${param.fieldStore}/createItem`, {
                        item: field, 
                        persist: true
                    }
                ).then(({ id }) => {
                    if (param.type === 'choices') {
                        const state = this.$store.state.schemas.choices.items;
                        const proms = [];
                        clonedField.choices.forEach(choiceId => {
                            const choice = state[choiceId];
                            if (choice) {
                                proms.push(this.$store.dispatch(
                                    `schemas/choices/createItem`, {
                                        item: {name: choice.name, field: id}, 
                                        persist: true
                                    }
                                ));
                            }
                        });
                        Promise.all(proms).then(() => {
                            resolve();
                            /* this.$store.dispatch(
                                `schemas/${param.fieldStore}/retrieveItem`, id
                            ); */
                        }).catch(error => {
                            reject(error);
                        });
                    } else {
                        resolve();
                    }
                }).catch(error => {
                    reject(error);
                });
            });
        },

        onSaveChanges() {
            this.loading = true;
            const promises = [];

            promises.push(
                this.$store.dispatch('schemas/itemSchemas/updateItem', {
                    persist: true,
                    item: this.itemSchema
                })
            );

            Object.keys(params).forEach(key => {
                const store = params[key].fieldStore;
                this.itemSchema[store].forEach(fieldId => {
                    const field = this.$store.state.schemas[store].items[fieldId];
                    if (field) {
                        promises.push(this.$store.dispatch(
                            `schemas/${store}/updateItem`, {
                                persist: true,
                                item: {id: fieldId, ...field}
                            }
                        ));
                    }
                });
            });

            Promise.all(promises).then(() => {
                this.loading = false;
            });
        },

        onDeleteField() {
            if (this.curField) {
                const param = params[this.curField.type];
                const fieldId = this.curField.id;
                this.setCurFieldKey(null);
                this.$store.dispatch(
                    `schemas/${param.fieldStore}/destroyItem`, fieldId
                ).then(() => {                    
                    this.$store.dispatch(
                        'schemas/itemSchemas/retrieveItem', this.schemaId
                    );
                });
            }
        },

        onDeleteSchema() {
            if (this.itemSchema) {
                this.showDeleteDialog = false;
                this.booting = true;                
                this.$store.dispatch(
                    'schemas/itemSchemas/destroyItem', this.schemaId
                ).then(() => {
                    this.$router.push({name: 'SchemasIndex'});
                });
            }
        }
    }   
};

</script>

<style lang="scss">

.item-schema-editor {
    .main {
        &:hover {
            cursor: pointer;
        }      
    }
    .field-views-list {
        max-width: 500px;
    }
    .el-button.back 
    {
        padding: 0;
        i {
            margin-top: 3px;
            font-weight: 700;
            font-size: 18px;
            color: #606266;
        }
        &:hover, &:active {
            i {
                color: #409eff; 
            }
        }
    }
}

</style>
