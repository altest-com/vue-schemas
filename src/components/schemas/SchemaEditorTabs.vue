<template>
            
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
                    :value="schema.name"                    
                    @input="val => onParamChange({name: val})"
                    @change="updateRoutes"                  
                />
            </el-form-item>

            <el-form-item label="Categoría">
                <query-select
                    store="schemas/categories"
                    :multiple="false"
                    :value="[schema.category]"
                    @change="val => onParamChange({
                        category: val.length ? val[0] : null
                    })"
                />
            </el-form-item>

            <el-form-item label="Imagen">
                <ab-image-uploader
                    store="schemas/images"
                    :multiple="false"
                    :upload-url="uploadUrl"
                    :upload-headers="uploadHeaders"
                    button="block"
                    display="labels"
                    :value="schema.image"
                    @input="val => onParamChange({image: val})"
                />
            </el-form-item>
        </el-form>
    </el-tab-pane>

    <el-tab-pane label="Secciones" name="sections">
        <schema-sections :schema-id="schemaId">
        </schema-sections>
    </el-tab-pane>
    
    <el-tab-pane label="Impresión" name="print">
        <el-form label-position="top" size="small">
            <el-form-item label="Diposión de los elementos">
                <el-select
                    :value="schema.config.printLayout"
                    @change="val => onConfigChange({printLayout: val})"
                >
                    <el-option
                        v-for="choice in printLayouts"
                        :key="choice.value"
                        :label="choice.label"
                        :value="choice.value"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="Diposión de las etiquetas">
                <el-select
                    :value="schema.config.printLabels"
                    @change="val => onConfigChange({printLabels: val})"
                >
                    <el-option
                        v-for="choice in printLabels"
                        :key="choice.value"
                        :label="choice.label"
                        :value="choice.value"
                    ></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-tab-pane>
</el-tabs>

</template>

<script>

import QuerySelect from '../blocks/QuerySelect';
import AbImageUploader from '../blocks/AbImageUploader';
import SchemaSections from './SchemaSections';
import config from '../../config';
import { configModel } from '../../store/item-schemas/models';
import { imagesApi } from "../../store/images";

const printLayouts = Object.keys(
    configModel.PRINT_LAYOUT_CHOICES
).map(key => ({
    label: configModel.PRINT_LAYOUT_CHOICES[key],
    value: key
}));

const printLabels = Object.keys(
    configModel.PRINT_LABELS_CHOICES
).map(key => ({
    label: configModel.PRINT_LABELS_CHOICES[key],
    value: key
}));

export default {
    name: 'SchemaEditorTabs',

    components: {
        QuerySelect,
        AbImageUploader,
        SchemaSections
    },

    props: {
        schemaId: {
            type: [Number, String],
            required: true
        }
    },

    data() {
        return {
            editorTab: 'schema',
            printLayouts: printLayouts,
            printLabels: printLabels,
            uploadUrl: imagesApi.getUrl(),
            uploadHeaders: imagesApi.getHeader(),
        };
    },

    computed: {
        schema() {
            const state = this.$store.state.schemas;
            return state.itemSchemas.items[this.schemaId];
        }
    },

    methods: {

        onParamChange(data) {
            this.$store.dispatch('schemas/itemSchemas/updateItem', {
                persist: false,
                item: {id: this.schemaId, ...data}
            });
        },

        onConfigChange(data) {
            this.onParamChange({
                config: {...this.schema.config, ...data}
            });
        },

        updateRoutes() {
            if (config.buildNavTree) {
                this.$store.dispatch('schemas/navigation/buildRoutes');
            }            
        }
    }   
};

</script>
