<template>

<div class="ab-step-views">

    <slot name="view" :step="step"></slot>

    <div class="step-buttons" :class="{'single': step === 0}">
        <el-button
            v-if="step > 0"
            :disabled="disabled"
            :size="size"  
            type="text"
            @click="onPrevStep"
            class="mr-4"
        >
            <i class="el-icon-arrow-left"></i> Anterior                
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

        <el-button
            v-if="step !== (nsteps - 1)"
            :disabled="disabled"
            :size="size"
            type="primary"
            @click="onNextStep"
        >
            Siguiente <i class="el-icon-arrow-right"></i>
        </el-button>

        <el-button
            v-else
            :disabled="disabled"
            :size="size"
            type="primary"
            @click="$emit('confirm')"
        >
            <i class="el-icon-check"></i>
            Confirmar 
        </el-button>
    </div>
</div>

</template>

<script>

export default {
    name: 'AbStepViews',
    
    props: {
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
        }
    },

    data() {
        return {
            step: 0
        };
    },

    methods: {
        onNextStep() {
            this.step = Math.min(this.step + 1, this.nsteps - 1);                            
        },
        onPrevStep() {
            this.step = Math.max(this.step - 1, 0);
        }
    }
};
</script>

<style lang="scss">

.ab-step-views {
    .step-buttons {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        align-items: center;
        &.single {
            justify-content: flex-end;
        }
    }
}

</style>
