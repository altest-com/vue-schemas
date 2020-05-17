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
            :delete="false"
            @input="val => onParamChange({sections: val})"
            @remove="onRequestDelete"
        ></ab-editable-list>
    </el-form>

    <el-dialog
        title="Confirmar"
        :visible.sync="showDeleteDialog"
        width="400px"
    >
        <p class="mb-2">
            Selecciona que elementos deseas eliminar
        </p>
        <el-radio-group v-model="fullDelete">
            <el-radio :label="false">Eliminar solo la sección seleccionada</el-radio>
            <el-radio :label="true">Eliminar la sección y sus campos</el-radio>
        </el-radio-group>
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
                @click="onConfirmDelete"
            >
                Confirmar
            </el-button>
        </span>
    </el-dialog>
</div>

</template>

<script>

import AbEditableList from '../blocks/AbEditableList';
import { configModel } from '../../store/item-schemas/models';
import params from '../../params';

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
            tabsPositions: tabsPositions,
            showDeleteDialog: false,
            fullDelete: false,
            sectionId: null
        };
    },

    computed: {
        config() {
            return this.schema.config;
        },
        schema() {
            return this.$store.state.schemas.itemSchemas.items[this.schemaId];
        }
    },

    methods: {
        onParamChange(data) {
            return this.$store.dispatch('schemas/itemSchemas/updateItem', {
                persist: true,
                item: {
                    id: this.schemaId, 
                    config: {...this.config, ...data}
                }
            });
        },
        onSectionsChange(sections) {
            this.onParamChange({sections: sections});
        },

        onRequestDelete(sectionId) {
            this.showDeleteDialog = true;
            this.sectionId = sectionId;
        },

        onConfirmDelete() {
            this.showDeleteDialog = false;
            if (this.fullDelete) {
                this.deleteFields(this.sectionId).then(() => {
                    this.deleteSection(this.sectionId);
                });
            } else {
                this.deleteSection(this.sectionId);
            }                       
        },

        deleteSection(sectionId) {
            this.onParamChange({
                sections: this.config.sections.filter(
                    section => section.id !== this.sectionId
                )
            }).then(() => {
                this.$store.dispatch(
                    'schemas/itemSchemas/retrieveItem', { id: this.schemaId }
                ); 
            });
        },

        deleteFields(sectionId) {
            const state = this.$store.state.schemas;
            const proms = [];
            const curFieldKey = this.$store.state.schemas.itemSchemas.fieldKey;           

            return new Promise((resolve, reject) => {
                Object.keys(params).forEach(key => {
                    const store = params[key].fieldStore;
                    this.schema[store].forEach(fieldId => {
                        const field = state[store].items[fieldId];
                        if (field && field.config.section === sectionId) {
                            if ((field.type + field.id) === curFieldKey) {
                                this.$store.dispatch(
                                    'schemas/itemSchemas/setField', null
                                );
                            }
                            proms.push(this.$store.dispatch(
                                `schemas/${store}/destroyItem`, fieldId
                            ));
                        }
                    });
                });
                Promise.all(proms).then(() => {
                    resolve();
                }).catch((error) => {
                    reject(error);
                });
            });
        }
    }    
};
</script>

<style lang="scss">
</style>
