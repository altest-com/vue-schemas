<template>

<el-form 
    ref="values-form" 
    label-position="top" 
    size="small" 
    class="field-views-list"
>
    <div
        v-for="(field, index) in fields" 
        :key="field.type + field.id"
        class="field-wrapper flex-row as"
        :class="{'focus': (field.type + field.id) === focusId}"
        @click.stop="$emit('update:focus-id', field.type + field.id)"
    >
        <div class="selector"></div>
        <boolean-field-view 
            v-if="field.type === 'boolean'"
            class="field-content"
            :field-id="field.id"
        ></boolean-field-view>
        <choices-field-view 
            v-else-if="field.type === 'choices'"
            class="field-content"
            :field-id="field.id"
        ></choices-field-view>
        <date-field-view 
            v-else-if="field.type === 'datetime'"
            class="field-content"
            :field-id="field.id"
        ></date-field-view>
        <file-field-view
            v-else-if="field.type === 'file'"
            class="field-content"
            :field-id="field.id"
        ></file-field-view>
        <images-field-view
            v-else-if="field.type === 'image'"
            class="field-content"
            :field-id="field.id"
        ></images-field-view>
        <item-field-view
            v-else-if="field.type === 'item'"
            class="field-content"
            :field-id="field.id"
        ></item-field-view>
        <number-field-view 
            v-else-if="field.type === 'number'"
            class="field-content"
            :field-id="field.id"
        ></number-field-view>
        <text-field-view 
            v-else-if="field.type === 'text'"
            class="field-content"
            :field-id="field.id"
        ></text-field-view>
        <div class="order-control">
            <el-button
                class="pb-0"
                icon="el-icon-caret-top"
                @click="onFieldUp(index)"
            ></el-button>
            <el-button
                class="pt-0"
                icon="el-icon-caret-bottom"
                @click="onFieldDown(index)"
            ></el-button>
        </div>            
    </div>
</el-form>

</template>

<script>

import BooleanFieldView from './BooleanFieldView';
import ChoicesFieldView from './ChoicesFieldView';
import DateFieldView from './DateFieldView';
import FileFieldView from './FileFieldView';
import ImagesFieldView from './ImagesFieldView';
import ItemFieldView from './ItemFieldView';
import NumberFieldView from './NumberFieldView';
import TextFieldView from './TextFieldView';
import params from '../params';

export default {
    name: 'FieldViewsList',

    components: {
        BooleanFieldView,
        ChoicesFieldView,
        DateFieldView,
        ImagesFieldView,
        ItemFieldView,
        FileFieldView,
        NumberFieldView,
        TextFieldView
    },

    props: {
        fields: {
            type: Array,
            default: () => []
        },
        focusId: {
            type: [String, Number],
            default: null
        }
    },

    data() {
        return {
        };
    },

    computed: {
    },

    methods: {
        onUpdateField(field, data) {
            const store = params[field.type].fieldStore;
            this.$store.dispatch(`schemas/${store}/updateItem`, {
                persist: false,
                item: {id: field.id, ...data}
            });
        },
        onFieldUp(index) {
            if (index !== 0) {
                const field = this.fields[index];
                const order = this.fields[index - 1].order + 1;
                const fields = [];
                for (let i = index - 2; i >= 0; i--) {
                    fields.push(this.fields[i]);                                        
                }
                fields.forEach(field_ => {
                    this.onUpdateField(field_, { order: field_.order + 1 });
                });
                this.onUpdateField(field, { order: order });
            }            
        },
        onFieldDown(index) {
            if (index !== (this.fields.length - 1)) {
                const field = this.fields[index];
                const order = this.fields[index + 1].order - 1;
                const fields = [];
                for (let i = index + 2; i < this.fields.length; i++) {
                    fields.push(this.fields[i]);                                        
                }
                fields.forEach(field_ => {
                    this.onUpdateField(field_, { order: field_.order - 1 });
                });
                this.onUpdateField(field, { order: order });
            }
        }
    }    
};
</script>

<style lang="scss">

.field-views-list {
    .field-wrapper {
        position: relative;
        padding-right: 24px;
        .field-content {
            flex-grow: 1;
        }
        &:hover {
            cursor: pointer;
        }
        .selector {
            display: none;
            position: absolute;
            top: 0;
            right: 0;
            width: 8px;
            height: 100%;
                        
        }
        .order-control {
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            justify-content: center;
            margin-left: 42px;
            visibility: hidden;
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
        &:hover {
            .selector {
                display: block;
                background-color:#f5f7fa;
            }
        } 
        &.focus {
            .selector {
                display: block;
                border-right: 1px dashed #909399;
                background-color: #ecf5ff;
            }
            .order-control {
                visibility: visible;
            }
        }
    }
}

</style>
