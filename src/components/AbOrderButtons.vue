<template>

<div class="ab-order-buttons">
    <el-button
        icon="el-icon-caret-top"
        @click="$emit('up')"
    ></el-button>
    <el-button
        icon="el-icon-caret-bottom"
        @click="$emit('down')"
    ></el-button>
</div>

</template>

<script>

export default {
    name: 'AbOrderButtons',

    props: {
    } 
};
</script>

<style lang="scss">

.ab-order-buttons {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    .el-button {
        padding: 2px;
        margin: 0;
        border: none;
        font-size: 18px;
        line-height: 12px;
        i {
            line-height: 0;
        }
    }
}

</style>
