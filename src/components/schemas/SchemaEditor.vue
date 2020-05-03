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
            center
        >
            <p>
                ¿Seguro deseas eliminar esta esquema de forma permanente? 
                Se eliminará cualquier objecto asociado.
            </p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showDeleteDialog = false">
                    Cancelar
                </el-button>
                <el-button 
                    type="danger" 
                    icon="el-icon-delete" 
                    @click="onDeleteSchema"
                >Confirmar</el-button>
            </span>
        </el-dialog>
    </template>

    <template v-slot:side-actions>
        <template v-if="panel === 'schema'">
            <div class="text-lg text-w6">Editar Esquema</div>
            <div class="flex-row">
                <tool-button
                    tooltip="Eliminar esquema" 
                    icon="el-icon-delete"
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
                    icon="el-icon-copy-document"
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
            
            <el-tabs v-else v-model="editorTab" class="mt-3">
                <el-tab-pane label="Esquema" name="schema">
                    <el-form
                        ref="form"
                        label-position="top"            
                        size="small"                
                    >
                        <el-form-item label="Nombre del Esquema">
                            <el-input
                                placeholder="Ingresa el nombre del esquema"
                                :value="itemSchema.name"                    
                                @input="val => onParamChange({name: val})"
                                @change="updateRoutes"                  
                            ></el-input>
                        </el-form-item>

                        <el-form-item label="Categoría">
                            <query-select
                                store="schemas/categories"
                                :multiple="false"
                                :value="[itemSchema.category]"
                                @change="val => onParamChange({
                                    category: val.length ? val[0] : null
                                })"
                            ></query-select>
                        </el-form-item>

                        <el-form-item label="Imagen">
                            <image-uploader
                                store="schemas/images"
                                :multiple="false"
                                button="block"
                                display="labels"
                                :value="schemaImage"
                                @input="val => onParamChange({
                                    image: val.length ? val[0] : null
                                })"
                            ></image-uploader>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="Secciones" name="sections">
                    <schema-sections :schema-id="schemaId">
                    </schema-sections>
                </el-tab-pane>
            </el-tabs>
            
        </template>

        <template v-else-if="panel === 'field'">
            <boolean-field-editor 
                v-if="curField.type === 'boolean'"
                :field-id="curField.id"
            ></boolean-field-editor>
            <choices-field-editor 
                v-else-if="curField.type === 'choices'"
                :field-id="curField.id"
            ></choices-field-editor>
            <date-field-editor 
                v-else-if="curField.type === 'datetime'"
                :field-id="curField.id"
            ></date-field-editor>
            <file-field-editor 
                v-else-if="curField.type === 'file'"
                :field-id="curField.id"
            ></file-field-editor>
            <images-field-editor
                v-else-if="curField.type === 'image'"
                :field-id="curField.id"
            ></images-field-editor>
            <item-field-editor
                v-else-if="curField.type === 'item'"
                :field-id="curField.id"
            ></item-field-editor>
            <number-field-editor 
                v-else-if="curField.type === 'number'"
                :field-id="curField.id"
            ></number-field-editor>
            <text-field-editor 
                v-else-if="curField.type === 'text'"
                :long="true"
                :field-id="curField.id"
            ></text-field-editor>
        </template>
    </template>
</split-view>

</template>

<script>

import ToolButton from '../blocks/ToolButton';
import SplitView from '../blocks/SplitView';
import QuerySelect from '../blocks/QuerySelect';
import BooleanFieldEditor from '../fields-booleans/BooleanFieldEditor';
import ChoicesFieldEditor from '../fields-choices/ChoicesFieldEditor';
import DateFieldEditor from '../fields-dates/DateFieldEditor';
import FileFieldEditor from '../fields-files/FileFieldEditor';
import ImagesFieldEditor from '../fields-images/ImagesFieldEditor';
import ItemFieldEditor from '../fields-items/ItemFieldEditor';
import NumberFieldEditor from '../fields-numbers/NumberFieldEditor';
import TextFieldEditor from '../fields-texts/TextFieldEditor';
import ImageUploader from '../blocks/ImageUploader';
import SchemaAddField from './SchemaAddField';
import SchemaSections from './SchemaSections';
import SchemaFieldsView from './SchemaFieldsView';
import params from '../../params';
import config from '../../config';
import { loadSchema } from '../loader';

export default {
    name: 'SchemaEditor',

    components: {
        ToolButton,
        SplitView,
        QuerySelect,
        BooleanFieldEditor,
        ChoicesFieldEditor,
        DateFieldEditor,
        ImagesFieldEditor,
        ItemFieldEditor,
        FileFieldEditor,
        NumberFieldEditor,
        TextFieldEditor,
        ImageUploader,
        SchemaAddField,
        SchemaSections,
        SchemaFieldsView
    },

    props: {
        schemaId: {
            type: [Number, String],
            required: true
        }
    },

    data() {
        return {
            routeFrom: {},
            showDeleteDialog: false,
            editorTab: 'schema',
            section: undefined,
            loading: false,
            booting: false
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

    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.routeFrom = from;
        });
    },

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

        onCloneField() {
            if (this.curField) {
                const order = this.curField.order - 1;
                const param = params[this.curField.type];
                let field = {...this.curField, order: order};
                
                if (param.type === 'choices') {
                    field = {
                        ...field, 
                        order: order, 
                        default: [], 
                        choices: []
                    };
                }

                this.$store.dispatch(
                    `schemas/${param.fieldStore}/createItem`, {
                        item: field, 
                        persist: true
                }).then(({ id }) => {
                    this.$store.dispatch(
                        'schemas/itemSchemas/retrieveItem', this.schemaId
                    );
                    if (param.type === 'choices') {
                        const state = this.$store.state.schemas.choices.items;
                        const proms = [];
                        this.curField.choices.forEach(choiceId => {
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
                            this.$store.dispatch(
                                `schemas/${param.fieldStore}/retrieveItem`, id
                            );
                        });
                    }
                });               
            }
        },

        onParamChange(data) {
            this.$store.dispatch('schemas/itemSchemas/updateItem', {
                persist: false,
                item: {id: this.schemaId, ...data}
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

        updateRoutes() {
            if (config.buildNavTree) {
                this.$store.dispatch('schemas/navigation/buildRoutes');
            }            
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
                this.$store.dispatch(
                    'schemas/itemSchemas/destroyItem', this.schemaId
                ).then(() => {
                    this.$router.replace(this.routeFrom);
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
