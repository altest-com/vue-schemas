<template>
    <div class="ab-tool-button" :class="{active: active}">
        <el-tooltip
            v-if="tooltip"
            class="item" 
            effect="dark" 
            :content="tooltip" 
            placement="top-start"
            transition="el-opacity-transition"
        >
            <el-button
                plain
                type="primary"
                :icon="icon"
                :disabled="disabled"
                @click="onButtonClick"
            />
        </el-tooltip>

        <el-button
            v-else
            plain
            type="primary"
            :icon="icon"
            :disabled="disabled"
            @click="onButtonClick"
        />
    </div>
</template>

<script>
export default {
    name: 'AbToolButton',

    props: {
        tooltip: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },

    computed: {
    },

    methods: {
        onButtonClick(event) {
            event.currentTarget.blur();
            this.$emit('click');
        }
    }
};
</script>

<style lang="scss">

.ab-tool-button {
    .el-button {
        border: none;
        border-radius: 8px;
        padding: 8px 10px;
    }
    i {
        font-size: 18px;
    }
    &.active {
        .el-button {
            color: #FFFFFF;
            background-color: #409eff;
            border-color: #409eff;
        }
    }
}
</style>
