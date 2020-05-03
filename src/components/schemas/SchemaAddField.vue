<template>
    <div class="schema-add-field">
        <el-button
            v-for="(field, index) in fields" 
            :key="index"
            type="info"
            size="small"
            plain
            :disabled="disabled"          
            @click.stop="event => onClick(event, field.type)"
        >
            <img :src="field.icon" alt="">
            <span>{{ field.name }}</span>
        </el-button>
    </div>
</template>

<script>

import params from '../../params';

const fields = Object.keys(params).map(key => ({
    name: params[key].name,
    type: params[key].type,
    icon: params[key].icon
}));

export default {
    name: 'SchemaAddField',

    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            fields: fields
        };
    },

    methods: {
        onClick(event, type) {
            event.currentTarget.blur();
            this.$emit('click', type);
        }
    }    
};
</script>

<style lang="scss">

.schema-add-field {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    img {
        width: 16px;
        height: 16px;
        margin-right: 8px;
    }
    .el-button--info.is-plain {
        width: 48%;
        margin-left: 0;
        padding: 12px 0 12px 20px;
        text-align: left;
        margin-bottom: 8px;
        border: none;
        &:hover, &:focus {
            background-color: #e9e9e9;
            color: #909399;
        }
        &:focus {
            outline: none;
        }
        >span {
            display: flex;
            flex-flow: row nowrap;
            align-items: flex-end;
        }
    }
}

</style>
