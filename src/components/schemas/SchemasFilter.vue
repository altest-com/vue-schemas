<template>

<div class="schemas-filter">
    <el-form
        label-position="top"
        size="small"
    >
        <el-form-item label="Ordenar por">
            <ab-order-select
                :order-choices="orderChoices"
                :value="filter.orderBy"                    
                @change="val => onParamChange({orderBy: val})"
            />           
        </el-form-item>

        <el-form-item label="Nombre">
            <el-input
                clearable
                :value="filter.name"                    
                @input="val => onParamChange({name: val})"
            ></el-input>
        </el-form-item>

        <el-form-item label="Categoría">
            <query-select
                store="schemas/categories"
                :value="filter.category"
                @change="val => onParamChange({category: val})"
            ></query-select>
        </el-form-item>

        <el-form-item label="Creado después de">
            <el-date-picker
                type="datetime"
                :value="filter.minCreatedAt"
                @input="val => onParamChange({minCreatedAt: val})"  
            ></el-date-picker>
        </el-form-item>

        <el-form-item label="Creado antes de">
            <el-date-picker
                type="datetime"
                :value="filter.maxCreatedAt"
                @input="val => onParamChange({maxCreatedAt: val})"  
            ></el-date-picker>
        </el-form-item>
    </el-form>
</div>

</template>

<script>

import AbOrderSelect from '../blocks/AbOrderSelect';
import QuerySelect from '../blocks/QuerySelect';
import { schemasFilter as filter } from '../../store/item-schemas/models';

const orderChoices = Object.keys(
    filter.ORDER_CHOICES
).map(value => ({
    value: value,
    label: filter.ORDER_CHOICES[value]
}));

export default {
    name: 'SchemasFilter',

    components: {
        AbOrderSelect,
        QuerySelect
    },

    props: {
        params: {
            type: Object,
            default: () => {}
        }
    },

    data() {
        return {
            orderChoices: orderChoices
        };
    },

    computed: {
        filter() {
            return this.$store.state.schemas.itemSchemas.filter;
        }
    },

    methods: {
        onParamChange(data) {
            this.$store.dispatch('schemas/itemSchemas/setFilter', data);
            this.$store.dispatch('schemas/itemSchemas/fetchItems', this.params);
            this.$emit('change');
        }
    }
};
</script>

<style lang="scss">
</style>
