<template>

<div v-if="value && field" class="choices-value-editor">
    <el-form-item :label="field.name">
        <div v-if="choices.length">
            <el-select
                v-if="field.config.displayAs === 'select'"
                multiple
                :multiple-limit="field.config.multi ? 0 : 1"
                :value="value.value"
                @input="val => onParamChange({value: val})"
            >
                <el-option
                    v-for="choice in choices"
                    :key="choice.id"
                    :label="choice.name"
                    :value="choice.id"
                ></el-option>
            </el-select>
            <el-checkbox-group 
                v-else-if="field.config.displayAs === 'buttons'"
                :value="value.value"
                @input="val => onParamChange({value: val})"
            >
                <el-checkbox-button 
                    v-for="choice in choices"
                    :key="choice.id"
                    :label="choice.id"
                > 
                    {{ choice.name }} 
                </el-checkbox-button>
            </el-checkbox-group>
            <el-checkbox-group 
                v-else-if="field.config.displayAs === 'check'"
                :value="value.value"
                @input="val => onParamChange({value: val})"
            >
                <el-checkbox
                    v-for="choice in choices"
                    :key="choice.id"
                    :label="choice.id"
                > 
                    {{ choice.name }} 
                </el-checkbox>
            </el-checkbox-group>
        </div>
        <div v-else class="no-options">
            Aún no se ha añadido ninguna opción
        </div>
        
    </el-form-item>
</div>

</template>

<script>

import ValueEditorMixin from './ValueEditorMixin';

export default {
    name: 'ChoicesFieldView',

    mixins: [ValueEditorMixin],

    data() {
        return {
            fieldStore: 'choicesFields',
            valueStore: 'choicesValues'
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
    }
};
</script>

<style lang="scss">

.choices-value-editor {
    .no-options {
        background-color: #f4f4f5;
        border-radius: 6px;
        padding-left: 12px;
        color: #9b9b9b;
        font-weight: 600;
    }
}

</style>
