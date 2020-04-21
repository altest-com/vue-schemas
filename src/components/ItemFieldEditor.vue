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
                    store="schemas/itemSchemas"
                    :value="[field.targetSchema]"
                    @change="val => onParamChange({
                        targetSchema: val.length ? val[0] : null
                    })"
                ></query-select>
            </el-form-item>

            <el-form-item label="Valor por defecto">
                <query-select
                    :disabled="!hasRelated"
                    :multiple="field.multi"
                    store="schemas/items"
                    :params="params"
                    :value="field.default"
                    @change="val => onParamChange({default: val})"
                ></query-select>
            </el-form-item>

            <el-form-item label="Múltiples Objetos">
                <el-switch
                    :value="field.multi"           
                    @change="val => onParamChange({multi: val})"
                ></el-switch>
            </el-form-item>
        </el-form>
    </template>
</field-editor>

</template>

<script>

import QuerySelect from './QuerySelect';
import FieldEditor from './FieldEditor';
import FieldEditorMixin from './FieldEditorMixin';

export default {
    name: 'ItemFieldEditor',

    components: {
        FieldEditor,
        QuerySelect
    },

    mixins: [FieldEditorMixin],

    data() {
        return {
            fieldStore: 'itemFields'
        };
    },

    computed: {
        hasRelated() {
            return !!this.field.targetSchema || this.field.targetSchema === 0; 
        },
        params() {
            return this.hasRelated ? {schema_pk: this.field.targetSchema} : {};
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
