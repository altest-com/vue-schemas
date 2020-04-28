<template>

<split-view v-if="itemSchema" class="item-schema-editor">
    <template v-slot:main>
        <div class="flex-row jb ac mx-3 mb-3">
            <h2 class="text-lg mb-0">
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
            <schema-fields-view 
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
            <schema-add-field @click="onAddField"></schema-add-field>
            
            <el-tabs v-model="editorTab" class="mt-3">
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

import ToolButton from './ToolButton';
import SplitView from './SplitView';
import QuerySelect from './QuerySelect';
import BooleanFieldEditor from './BooleanFieldEditor';
import ChoicesFieldEditor from './ChoicesFieldEditor';
import DateFieldEditor from './DateFieldEditor';
import FileFieldEditor from './FileFieldEditor';
import ImagesFieldEditor from './ImagesFieldEditor';
import ItemFieldEditor from './ItemFieldEditor';
import NumberFieldEditor from './NumberFieldEditor';
import TextFieldEditor from './TextFieldEditor';
import ImageUploader from './ImageUploader';
import SchemaAddField from './SchemaAddField';
import SchemaSections from './SchemaSections';
import SchemaFieldsView from './SchemaFieldsView';
import params from '../params';
import config from '../config';

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
            loading: false
        };
    },

    computed: {
        panel() {
            return this.curFieldId ? 'field' : 'schema';
        },

        curFieldId() {
            return this.$store.state.schemas.itemSchemas.fieldKey;
        },

        itemSchema() {
            this.$store.dispatch('schemas/itemSchemas/getItem', this.schemaId);
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
                    this.$store.dispatch(`schemas/${store}/getItem`, fieldId);
                    const field = this.$store.state.schemas[store].items[fieldId];
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

    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.routeFrom = from;
        });
    },

    methods: {

        setCurFieldKey(key) {
            this.$store.dispatch('schemas/itemSchemas/setField', key);
        },

        onSchemaClick() {
            /* this.panel = 'schema'; */
            this.setCurFieldKey(null);
        },

        onCloseFieldEditor() {
            this.setCurFieldKey(null);
            /* this.panel = 'schema'; */
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
                this.$store.dispatch(
                    `schemas/${param.fieldStore}/createItem`, {
                        item: {...this.curField, order: order}, 
                        persist: true
                }).then(({id, type}) => {
                    this.$store.dispatch(
                        'schemas/itemSchemas/retrieveItem', this.schemaId
                    );
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
