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

        <el-form-item label="Añadir sección">
            <div class="flex-row jb">
                <el-input
                    v-model="newSection"
                    placeholder="Opción"                    
                ></el-input>
                <el-button
                    :disabled="!newSection"
                    type="primary" 
                    icon="el-icon-plus"
                    class="ml-2"
                    @click="onAddSection"
                ></el-button>
            </div>                
        </el-form-item>

        <el-form-item label="Secciones">
            <div class="sections-list mt-2">
                <div 
                    v-for="section in config.sections" 
                    :key="section.id"
                    class="section-item flex-row jb ac"
                >
                    <span>{{ section.name }}</span>
                    <el-button 
                        type="text" 
                        icon="el-icon-close" 
                        size="small"
                        @click="onRemoveSection(section.id)"
                    ></el-button>
                </div>
            </div>           
        </el-form-item>
    </el-form>
</div>

</template>

<script>

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

const randId = () => Math.random().toString(36).substr(2, 9);

export default {
    name: 'SchemaSections',

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
        onAddSection() {
            if (this.newSection) {
                this.onParamChange({
                    sections: [
                        ...this.config.sections, {
                            id: randId(),
                            name: this.newSection
                        }
                    ]
                });
            }
        },
        onRemoveSection(id) {
            this.onParamChange({
                sections: this.config.sections.filter(
                    section => section.id !== id
                )
            });
        },
        onParamChange(data) {
            this.$store.dispatch('schemas/itemSchemas/updateItem', {
                persist: false,
                item: {
                    id: this.schemaId, 
                    config: {...this.config, ...data}
                }
            });
        }
    }    
};
</script>

<style lang="scss">

.schema-sections {
    .section-item {
        width: 100%;
        font-size: 14px;
        padding: 0px 8px;
        border-bottom: 1px solid #ebeef5;
        &:first-child {
            border-top: 1px solid #ebeef5;
        }
        .el-button {
            border: none;
            padding: 0px;
            opacity: 0;
        } 
        &:hover {
            background-color: #f5f7fa;
            .el-button {
                opacity: 1;
            }
        } 
      
    }
}

</style>
