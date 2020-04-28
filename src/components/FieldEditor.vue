<template>

<div v-if="field" class="field-editor">
    <el-tabs v-model="tab">
        <el-tab-pane label="Común" name="common">
            <el-form
                ref="form"
                label-position="top"            
                size="small"
            >
                <el-form-item label="Nombre del Campo">
                    <el-input
                        placeholder="Ingresa el nombre del campo"
                        :value="field.name"                    
                        @input="val => onParamChange({name: val})"                    
                    ></el-input>
                </el-form-item>

                <div class="flex-row js as">
                    <el-form-item label="Requerido" class="mr-2 shrink-0">
                        <el-radio-group 
                            :value="field.required"
                            @input="val => onParamChange({required: val})"
                        >
                            <el-radio-button :label="true">
                                Si
                            </el-radio-button>
                            <el-radio-button :label="false">
                                No
                            </el-radio-button>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="Orden" class="grow-1">
                        <el-input-number 
                            :value="field.order"
                            controls-position="right"
                            @change="val => onParamChange({order: val})"
                        ></el-input-number>
                    </el-form-item>
                </div>

                <el-form-item label="Descripción">
                    <el-input
                        :value="field.help"
                        type="textarea"
                        :rows="4"                    
                        placeholder="Ingrese la descripción del campo"
                        @input="val => onParamChange({help: val})"
                    ></el-input>
                </el-form-item>

                <el-form-item label="Mostrar en la sección">
                    <el-select
                        :value="field.config.section"
                        @change="val => onConfigChange({section: val})"
                    >
                        <el-option
                            v-for="section in sections"
                            :key="section.id"
                            :label="section.name"
                            :value="section.id"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="Mostrar nombre del campo" class="switch">
                    <el-switch
                        :value="field.config.showLabel"                    
                        @change="val => onConfigChange({showLabel: val})"
                    ></el-switch>
                </el-form-item>

                <el-form-item label="Ancho">
                    <el-input
                        :value="field.config.width"
                        @input="val => onConfigChange({width: val})"
                    ></el-input>
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="Detalles" name="extend">
            <slot name="extend"></slot>                    
        </el-tab-pane>
    </el-tabs>
</div>

</template>

<script>

export default {
    name: 'FieldEditor',
    
    props: {
        fieldId: {
            type: [Number, String],
            required: true
        },
        store: {
            type: String,
            required: true,
            validator: val => [
                'booleanFields',
                'choicesFields',
                'dateTimeFields',
                'fileFields',
                'imagesFields',
                'itemFields',
                'numberFields',
                'textFields'
            ]
        }
    },

    data() {
        return {
            tab: 'common'
        };
    },

    computed: {
        field() {
            this.$store.dispatch(`schemas/${this.store}/getItem`, this.fieldId);
            return this.$store.state.schemas[this.store].items[this.fieldId];          
        },
        schema() {
            const schemaId = this.field.itemSchema;
            this.$store.dispatch('schemas/itemSchemas/getItem', schemaId);
            return this.$store.state.schemas.itemSchemas.items[schemaId];
        },
        sections() {
            return this.schema.config.sections;
        }
    },

    methods: {
        onParamChange(data) {
            this.$store.dispatch(`schemas/${this.store}/updateItem`, {
                persist: false,
                item: {id: this.fieldId, ...data}
            });
        },
        onConfigChange(data) {
            this.$store.dispatch(`schemas/${this.store}/updateItem`, {
                persist: false,
                item: {
                    id: this.fieldId, 
                    config: {...this.field.config, ...data}
                }
            });
        }
    }
};
</script>

<style lang="scss">
</style>
