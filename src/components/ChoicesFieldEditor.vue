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

            <el-form-item label="Añadir opción">
                <div class="flex-row jb">
                    <el-input
                        v-model="addChoice"
                        placeholder="Opción"                    
                    ></el-input>
                    <el-button 
                        type="primary" 
                        icon="el-icon-plus"
                        class="ml-2"
                        @click="onAddChoice"
                    ></el-button>
                </div>                
            </el-form-item>

            <el-form-item label="Selección múltiple">
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
        </el-form>
    </template>
</field-editor>

</template>

<script>

import { choicesConfigModel } from '../store/choices-fields/models';
import FieldEditor from './FieldEditor';
import FieldEditorMixin from './FieldEditorMixin';

const displayChoices = Object.keys(
    choicesConfigModel.DISPLAY_CHOICES
).map(key => ({
    label: choicesConfigModel.DISPLAY_CHOICES[key],
    value: key
}));

export default {
    name: 'ChoicesFieldEditor',

    components: {
        FieldEditor
    },

    mixins: [FieldEditorMixin],

    data() {
        return {
            displayChoices: displayChoices,
            addChoice: '',
            fieldStore: 'choicesFields'
        };
    },

    computed: {
        choices() {
            const choices = [];
            this.field.choices.forEach(choiceId => {
                this.$store.dispatch('schemas/choices/getItem', choiceId);
                const choice = this.$store.state.schemas.choices.items[choiceId];
                if (choice) {
                    choices.push(choice);
                }
            });
            return choices;
        }
    },

    methods: {
        onAddChoice() {
            this.$store.dispatch('schemas/choices/createItem', {
                persist: true,
                item: {name: this.addChoice, field: this.fieldId}
            }).then(() => {
                this.$store.dispatch('schemas/choicesFields/retrieveItem', this.fieldId);
                this.addChoice = '';
            });
        }
    }
};
</script>

<style lang="scss">
</style>
