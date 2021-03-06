<template>

<field-editor
    v-if="field"
    :field-id="fieldId" 
    store="itemFields" 
    class="item-field-editor"
>
    <template v-slot:extend>
        <el-form
            ref="form"
            label-position="top"            
            size="small"
        >
            <el-form-item label="Esquema relacionado">
                <query-select
                    :multiple="false"
                    query="name__icontains"
                    store="schemas/itemSchemas"
                    :value="[field.targetSchema]"
                    @change="val => onParamChange({
                        targetSchema: val.length ? val[0] : null
                    })"
                />
            </el-form-item>

            <el-form-item label="Valor por defecto">
                <item-query
                    :field-id="fieldId"
                    :value="field.default"
                    @change="val => onParamChange({default: val})"
                />
            </el-form-item>

            <el-form-item label="Múltiples Objetos" class="switch">
                <el-switch
                    :value="field.multi"           
                    @change="val => onParamChange({multi: val})"
                ></el-switch>
            </el-form-item>

            <el-form-item label="Mostrar como">
                <el-select
                    :value="field.config.displayAs"
                    @change="val => onConfigChange({displayAs: val})"
                >
                    <el-option
                        v-for="option in displayChoices"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item 
                v-if="field.multi && field.config.displayAs === 'nest'" 
                label="Listar objetos como"
            >
                <el-select
                    :value="field.config.listAs"
                    @change="val => onConfigChange({listAs: val})"
                >
                    <el-option
                        v-for="option in listChoices"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                    ></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </template>
</field-editor>

</template>

<script>

import QuerySelect from '../blocks/QuerySelect';
import FieldEditor from '../fields/FieldEditor';
import ItemQuery from './ItemQuery';
import FieldEditorMixin from '../fields/FieldEditorMixin';
import { itemConfigModel as config } from '../../store/item-fields/models';

const displayChoices = Object.keys(
    config.DISPLAY_CHOICES
).map(key => ({
    label: config.DISPLAY_CHOICES[key],
    value: key
}));

const listChoices = Object.keys(
    config.LIST_CHOICES
).map(key => ({
    label: config.LIST_CHOICES[key],
    value: key
}));

export default {
    name: 'ItemFieldEditor',

    components: {
        FieldEditor,
        QuerySelect,
        ItemQuery
    },

    mixins: [FieldEditorMixin],

    data() {
        return {
            fieldStore: 'itemFields',
            displayChoices: displayChoices,
            listChoices: listChoices
        };
    },

    computed: {
        hasRelated() {
            return !!this.field.targetSchema || this.field.targetSchema === 0; 
        },
        params() {
            return this.hasRelated ? {schema_id: this.field.targetSchema} : {};
        }
    },

    methods: {
        onParamChange(data) {
            if ('targetSchema' in data && 
                data.targetSchema !== this.field.targetSchema
            ) {
                data.default = [];
            }
            this.$store.dispatch('schemas/itemFields/updateItem', {
                persist: false,
                item: {id: this.fieldId, ...data}
            });
        }
    }
};
</script>

<style lang="scss">
</style>
