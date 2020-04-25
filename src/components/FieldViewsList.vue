<template>

<el-form 
    ref="values-form" 
    label-position="top" 
    size="small" 
    class="field-views-list"
    :class="{
        'focusable': focus,
        'row': layout === 'row',
        'col': layout === 'col'
    }"
>
    <div
        v-for="(field, index) in fields" 
        :key="field.type + field.id"
        class="field-wrapper"
        :class="{'focus': (field.type + field.id) === focusKey}"
        @click.stop="onFieldClick(field.type + field.id)"
    >
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
        <div class="selector" v-if="focus"></div>
        <div class="order-control pl-3">
            <ab-order-buttons
                v-if="focus"
                @up="onFieldUp(index)"
                @down="onFieldDown(index)"
            ></ab-order-buttons> 
        </div>          
    </div>
</el-form>

</template>

<script>

import AbOrderButtons from './AbOrderButtons';
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
        AbOrderButtons,
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
        focus: {
            type: Boolean,
            default: true
        },
        layout: {
            type: String,
            default: 'col'
        }
    },

    data() {
        return {
        };
    },

    computed: {
        focusKey() {
            return this.$store.state.schemas.itemSchemas.fieldKey;
        }
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
        },
        onFieldClick(key) {
            if (this.focus) {
                this.$store.dispatch('schemas/itemSchemas/setField', key);
            }
        }
    }    
};
</script>

<style lang="scss">

.field-views-list{
    .field-wrapper {
        .selector, .order-control {
            display: none;
        }
    }
    &.row {
        display: flex;
        flex-flow: row nowrap;
        align-self: center;
    }
    &.col.focusable {
        >.field-wrapper {
            display: flex;
            flex-flow: row nowrap;
            align-items: flex-start;
            position: relative;
            padding-right: 20px;
            >.field-content {
                flex-grow: 1;
            }
            >.selector {
                display: none;
                position: absolute;
                top: 0;
                right: 0;
                width: 8px;
                height: 100%;                            
            }
            >.order-control {
                display: block;
                visibility: hidden;
            }
            &:hover {
                cursor: pointer;
                .selector {
                    display: block;
                    background-color:#f5f7fa;
                }
            } 
            &.focus {
                >.selector {
                    display: block;
                    border-right: 1px dashed #909399;
                    background-color: #ecf5ff;
                }
                >.order-control {
                    visibility: visible;
                }
            }
        }
    }
    &.row.focusable {
        >.field-wrapper {
            position: relative;
            border: 2px solid transparent;
            border-radius: 4px;
            >.selector {
                display: none;                          
            }
            >.order-control {
                visibility: hidden;
                position: absolute;
                top: 0;
                right: 0;
            }
            &:hover {
                cursor: pointer;
                border-color: #f5f7fa;
            } 
            &.focus {
                border-color: #ecf5ff;
                >.order-control {
                    visibility: visible;
                }
            }
        }
    }
}

</style>
