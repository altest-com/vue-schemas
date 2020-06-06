<template>

<table class="ab-flex-table">
    <slot />
</table>

</template>

<script>

export default {
    name: 'AbFlexTable',

    props: {
    }
};
</script>

<style lang="scss">

.ab-flex-table {
    border-collapse: collapse;
    width: 100%;
    th, td {
        text-align: left;
        border-bottom: 1px solid #ebeef5;
        padding: 12px 10px;
        max-width: 0;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: break-all;
        vertical-align: middle;
        position: relative;
        line-height: 23px;
    }
    td {
        transition: background-color .25s ease;
    }
    >tr:not(:first-child):hover {
        background-color:#f5f7fa;
        cursor: pointer;
    }
    >tr:not(:first-child).focus {
        background-color:#ecf5ff;
    }
}

</style>
