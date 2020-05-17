<template>

<div v-if="field && filter" class="choices-value-filter">
    <el-form-item :label="label">
        <el-select
            clearable
            multiple
            :value="filter[queryIn]"
            @input="val => onParamChange(queryIn, val)"
        >
            <el-option
                v-for="choice in choices"
                :key="choice.id"
                :label="choice.name"
                :value="choice.id"
            />
        </el-select>
    </el-form-item>
</div>

</template>

<script>

import ValueFilterMixin from '../fields/ValueFilterMixin';

export default {
    name: 'ChoicesValueFilter',

    mixins: [ValueFilterMixin],

    data() {
        return {
            fieldStore: 'choicesFields'
        };
    },

    computed: {
        queryIn() {
            return `${this.field.id}-choices_in`;
        },
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
    }
};
</script>
