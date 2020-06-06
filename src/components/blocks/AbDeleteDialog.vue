<template>

<el-dialog
    class="ab-delete-dialog"
    title="Advertencia"
    :visible="visible"
    :width="width"
    @update:visible="val => $emit('update:visible', val)"
>
    <p>
        {{ message }}
    </p>
    <span slot="footer" class="dialog-footer">
        <el-button
            size="small"
            icon="el-icon-close"
            @click="$emit('update:visible', false)"
        >
            Cancelar
        </el-button>
        <el-button 
            type="primary"
            class="ml-2"
            :disabled="disabled"
            size="small"
            icon="el-icon-check"
            @click="$emit('confirm')"
        >
            Confirmar
        </el-button>
    </span>
</el-dialog>

</template>

<script>

export default {
    name: 'AbDeleteDialog',

    props: {
        visible: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: 'Advertencia'
        },
        message: {
            type: String,
            default: 'Por favor confirme que desea eliminar este elemento.'
        },
        width: {
            type: String,
            default: '400px'
        }
    }
};
</script>

<style lang="scss">

.ab-delete-dialog {
    .el-dialog__title {
        font-weight: 700;
    }
}

</style>
