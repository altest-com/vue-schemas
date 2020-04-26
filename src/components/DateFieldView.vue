<template>

<div v-if="field" class="date-field-view">
    <el-form-item :label="label">
        <el-time-picker
            v-if="field.config.dataType === 'time'"
            arrow-control
            :value="field.default"
        ></el-time-picker>
        <el-date-picker
            v-else
            :type="field.config.dataType"
            :value="field.default"
        ></el-date-picker>
    </el-form-item>
</div>

</template>

<script>

export default {
    name: 'DateFieldView',
    
    props: {
        fieldId: {
            type: [Number, String],
            required: true
        }
    },

    computed: {
        field() {
            this.$store.dispatch('schemas/dateTimeFields/getItem', this.fieldId);
            return this.$store.state.schemas.dateTimeFields.items[this.fieldId];         
        }
    }
};
</script>

<style lang="scss">
</style>
