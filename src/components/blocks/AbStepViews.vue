<template>

<div class="ab-step-views">

    <slot></slot>

    <div class="step-buttons">
        <el-button
            :disabled="value <= 0 && !cycle"
            :size="size"  
            type="text"
            @click="onPrevStep"
            class="mr-4"
        >
            <i class="el-icon-arrow-left"></i> Anterior                
        </el-button>

        <template v-if="(value >= nsteps - 1) && (confirm || cancel)">
            <el-button
                v-if="confirm"
                :disabled="disabled"
                :size="size"
                type="primary"
                @click="$emit('confirm')"
            >
                <i class="el-icon-check"></i>
                Confirmar 
            </el-button>
            <el-button
                v-if="cancel"
                icon="el-icon-close"
                :disabled="disabled" 
                :size="size" 
                @click="$emit('cancel')"
            >
                Cancelar
            </el-button>
        </template>

        <el-button
            v-else
            :disabled="(value >= nsteps - 1) && !cycle"
            :size="size"
            type="text"
            @click="onNextStep"
        >
            Siguiente <i class="el-icon-arrow-right"></i>
        </el-button>

    </div>
</div>

</template>

<script>

export default {
    name: 'AbStepViews',
    
    props: {
        value: {
            type: Number,
            required: true
        },
        nsteps: {
            type: Number,
            required: true
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        size: {
            type: String,
            default: 'medium'
        },
        cancel: {
            type: Boolean,
            default: false
        },
        confirm: {
            type: Boolean,
            default: false
        },
        cycle: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {};
    },

    methods: {
        onNextStep() {
            const value = (this.cycle && this.value === this.nsteps - 1) ? 
                0 : Math.min(this.value + 1, this.nsteps - 1); 
            this.$emit('input', value);                           
        },
        onPrevStep() {
            const value = (this.cycle && this.value === 0) ? 
                this.nsteps - 1 : Math.max(this.value - 1, 0);
            this.$emit('input', value);
        }
    }
};
</script>

<style lang="scss">

.ab-step-views {
    .step-buttons {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
    }
}

</style>
