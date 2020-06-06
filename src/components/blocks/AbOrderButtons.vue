<template>

<div 
    class="ab-order-buttons" 
    :class="vertical ? 'vertical' : 'horizontal'"
>
    <el-button
        :icon="vertical ? 'el-icon-caret-top' : 'el-icon-caret-left'"
        @click="$emit('up')"
    />
    <el-button
        :icon="vertical ? 'el-icon-caret-bottom' : 'el-icon-caret-right'"
        @click="$emit('down')"
    />
</div>

</template>

<script>

export default {
    name: 'AbOrderButtons',

    props: {
        vertical: {
            type: Boolean,
            default: true
        }
    } 
};
</script>

<style lang="scss">

.ab-order-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    .el-button {
        padding: 2px;
        margin: 0;
        border: none;
        font-size: 18px;
        line-height: 12px;
        background-color: #ecf5ff;
        i {
            line-height: 0;
        }
    }
    &.vertical {
        flex-flow: column nowrap;
        .el-button:first-child {
            margin-bottom: 1px;
        }
    }
    &.horizontal {
        flex-flow: row nowrap;
        .el-button {
            padding-left: 0;
            padding-right: 0;
        }
        .el-button:first-child {
            margin-right: 1px;
        }
    }
}

</style>
