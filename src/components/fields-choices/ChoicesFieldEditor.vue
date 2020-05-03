<template>

<field-editor
    v-if="field"
    :field-id="fieldId" 
    store="choicesFields" 
    class="choices-field-editor"
>
    <template v-slot:extend>
        <el-form
            ref="form"
            label-position="top"            
            size="small"
        >
            <el-form-item label="Valor por defecto">
                <el-select
                    multiple
                    :multiple-limit="field.config.multi ? 0 : 1"
                    :value="field.default"
                    @change="val => onParamChange({default: val})"
                >
                    <el-option
                        v-for="choice in choices"
                        :key="choice.id"
                        :label="choice.name"
                        :value="choice.id"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="Selección múltiple" class="switch">
                <el-switch
                    :value="field.config.multi"           
                    @change="val => onConfigChange({multi: val})"
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
                v-if="field.config.displayAs === 'check'"
                label="Distribución"
            >
                <el-select
                    :value="field.config.layout"
                    @change="val => onConfigChange({layout: val})"
                >
                    <el-option
                        v-for="option in layoutChoices"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                    ></el-option>
                </el-select>
            </el-form-item>

            <ab-editable-list 
                :value="choices"
                :manage="false"
                :sortable="false"
                addLabel="Añadir opción"
                listLabel="Opciones"
                @add="onAddChoice"
                @edit="onEditChoice"
                @remove="onRemoveChoice"
                @sort="onSortChoices"
            ></ab-editable-list>            
        </el-form>
    </template>
</field-editor>

</template>

<script>

import { choicesConfigModel } from '../../store/choices-fields/models';
import FieldEditor from '../fields/FieldEditor';
import FieldEditorMixin from '../fields/FieldEditorMixin';
import AbEditableList from '../blocks/AbEditableList';

const displayChoices = Object.keys(
    choicesConfigModel.DISPLAY_CHOICES
).map(key => ({
    label: choicesConfigModel.DISPLAY_CHOICES[key],
    value: key
}));

const layoutChoices = Object.keys(
    choicesConfigModel.LAYOUT_CHOICES
).map(key => ({
    label: choicesConfigModel.LAYOUT_CHOICES[key],
    value: key
}));

export default {
    name: 'ChoicesFieldEditor',

    components: {
        FieldEditor,
        AbEditableList
    },

    mixins: [FieldEditorMixin],

    data() {
        return {
            displayChoices: displayChoices,
            layoutChoices: layoutChoices,
            fieldStore: 'choicesFields'
        };
    },

    computed: {
        choices() {
            const choices = [];
            this.field.choices.forEach(choiceId => {
                /* this.$store.dispatch('schemas/choices/getItem', choiceId); */
                const choice = this.$store.state.schemas.choices.items[choiceId];
                if (choice) {
                    choices.push(choice);
                }
            });
            return choices;
        }
    },

    methods: {
        updateField() {
            this.$store.dispatch(
                'schemas/choicesFields/retrieveItem', 
                this.fieldId
            );
        },
        onAddChoice(name) {
            this.$store.dispatch('schemas/choices/createItem', {
                persist: true,
                item: {
                    name: name, 
                    field: this.fieldId
                }
            }).then(() => {
                this.updateField();
            });
        },
        onEditChoice(id, name) {
            this.$store.dispatch('schemas/choices/updateItem', {
                persist: true,
                item: {
                    id: id,
                    name: name
                }
            }).then(() => {
                this.updateField();
            });
        },
        onRemoveChoice(id) {
            this.$store.dispatch(
                'schemas/choices/destroyItem', id
            ).then(() => {
                this.updateField();
            });
        },
        onSortChoices(choices) {
            this.$store.dispatch('schemas/choicesFields/updateItem', {
                persist: true,
                item: {
                    id: this.fieldId,
                    choices: choices
                }
            }).then(() => {
                this.updateField();
            });
        }
    }
};
</script>

<style lang="scss">
</style>
