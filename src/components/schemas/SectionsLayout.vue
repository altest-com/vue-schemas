<template>

<div v-if="schema" class="sections-layout">
    <template v-if="config.sections.length">
        <el-tabs 
            v-if="config.sectionsType === 'tabs'"
            v-model="curSection"
            :tab-position="config.tabsPosition"
            class="mt-3"
        >
            <el-tab-pane 
                v-for="sec in config.sections"
                :key="sec.id"
                :label="sec.name" 
                :name="sec.id"
            >
                <slot 
                    name="section" 
                    :section-id="sec.id"
                ></slot>
            </el-tab-pane>
        </el-tabs>

        <el-collapse 
            v-if="config.sectionsType === 'accordion'"
            v-model="curSection"
            class="mt-3"
            accordion
        >
            <el-collapse-item 
                v-for="sec in config.sections"
                :key="sec.id"
                :title="sec.name" 
                :name="sec.id"
            >
                <slot name="section" :section-id="sec.id"></slot>
            </el-collapse-item>
        </el-collapse>

        <div v-if="config.sectionsType === 'blocks'" class="mt-3">
            <div v-for="sec in config.sections" :key="sec.id">
                <el-divider content-position="left" class="section-label">
                    {{ sec.name }}
                </el-divider>
                <slot name="section" :section-id="sec.id"></slot>
            </div>
        </div>

        <ab-step-views 
            v-if="config.sectionsType === 'steps'"
            v-model="step"
            class="mt-3"
            size="small"
            :nsteps="config.sections.length"
        >
            <template>
                <el-divider content-position="left" class="section-label">
                    {{ config.sections[step].name }}
                </el-divider>
                <slot name="section" :section-id="config.sections[step].id">
                </slot>
            </template>
        </ab-step-views>
        
    </template>

    <slot v-else name="fields"></slot>
</div>

</template>

<script>

import AbStepViews from '../blocks/AbStepViews';

export default {
    name: 'SectionsLayout',

    components: {
        AbStepViews
    },
    
    props: {
        schemaId: {
            type: [Number, String],
            required: true
        },
        section: {
            type: String,
            default: undefined
        }
    },

    data() {
        return {
            step: 0
        };
    },

    computed: {
        state() {
            return this.$store.state.schemas;
        },
        schema() {
            /* this.$store.dispatch('schemas/itemSchemas/getItem', this.schemaId); */
            return this.state.itemSchemas.items[this.schemaId];
        },
        config() {
            return this.schema.config;
        },
        curSection: {
            get() {
                if (
                    this.section === undefined && 
                    this.config.sections.length && 
                    this.config.initSection
                ) {
                    const val = this.config.initSection;
                    this.$emit('update:section', val);
                    return val;                    
                }
                return this.section;
            },
            set(val) {
                this.$emit('update:section', val);
            }
        }
    }
};
</script>

<style lang="scss">

.sections-layout {
    .el-collapse-item__header {
        font-weight: 700;
    }
    .el-tabs--left .el-tabs__content {
        padding-left: 24px;
    }
    .section-label > .el-divider__text {
        font-weight: 700;
    }
}

</style>
