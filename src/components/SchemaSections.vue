<template>

<div v-if="schema" class="schema-sections">
    <el-form
        ref="form"
        label-position="top"            
        size="small"
    >
        <el-form-item label="Tipo de secciones">
            <el-select
                :value="config.sectionsType"
                @change="val => onParamChange({sectionsType: val})"
            >
                <el-option
                    v-for="option in sectionTypes"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                ></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="Sección por defecto">
            <el-select
                clearable
                :value="config.initSection"
                @change="val => onParamChange({initSection: val})"
            >
                <el-option
                    v-for="option in config.sections"
                    :key="option.id"
                    :label="option.name"
                    :value="option.id"
                ></el-option>
            </el-select>
        </el-form-item>

        <el-form-item 
            v-if="config.sectionsType === 'tabs'" 
            label="Ubicación de las pestañas"
        >
            <el-select
                :value="config.tabsPosition"
                @change="val => onParamChange({tabsPosition: val})"
            >
                <el-option
                    v-for="option in tabsPositions"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                ></el-option>
            </el-select>
        </el-form-item>

        <ab-editable-list
            addLabel="Añadir sección"
            listLabel="Secciones"
            :value="config.sections"
            @input="val => onParamChange({sections: val})"
        ></ab-editable-list>
    </el-form>
</div>

</template>

<script>

import AbEditableList from './AbEditableList';
import { configModel } from '../store/item-schemas/models';

const sectionTypes = Object.keys(
    configModel.SECTIONS_CHOICES
).map(key => ({
    label: configModel.SECTIONS_CHOICES[key],
    value: key
}));

const tabsPositions = Object.keys(
    configModel.TABS_POSITION_CHOICES
).map(key => ({
    label: configModel.TABS_POSITION_CHOICES[key],
    value: key
}));

export default {
    name: 'SchemaSections',

    components: {
        AbEditableList
    },

    props: {
        schemaId: {
            type: [Number, String],
            required: true
        }
    },

    data() {
        return {
            newSection: '',
            sectionTypes: sectionTypes,
            tabsPositions: tabsPositions
        };
    },

    computed: {
        config() {
            return this.schema.config;
        },
        schema() {
            this.$store.dispatch('schemas/itemSchemas/getItem', this.schemaId);
            return this.$store.state.schemas.itemSchemas.items[this.schemaId];
        }
    },

    methods: {
        onParamChange(data) {
            this.$store.dispatch('schemas/itemSchemas/updateItem', {
                persist: false,
                item: {
                    id: this.schemaId, 
                    config: {...this.config, ...data}
                }
            });
        },
        onSectionsChange(sections) {            
            const sectionsId = this.config.sections.map(({ id }) => id);
            if (
                sections.length !== sectionsId.length || 
                !sections.every(({ id }) => sectionsId.includes(id))
            ) {
                this.$emit();
            }
            this.onParamChange({sections: sections});
        }
    }    
};
</script>

<style lang="scss">
</style>
