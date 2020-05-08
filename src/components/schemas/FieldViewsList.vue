<template>

<el-form 
    ref="values-form" 
    label-position="top" 
    size="small" 
    class="field-views-list"
    :class="{'focusable': focus}"
>
    <div
        v-for="(field, index) in fields" 
        :key="field.type + field.id"
        class="field-wrapper"
        :style="{width: field.config.width}"
        :class="{'focus': focus && (field.type + field.id) === focusKey}"
        @click="onFieldClick(field.type + field.id)"
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
        <div class="order-control">
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

import AbOrderButtons from '../blocks/AbOrderButtons';
import BooleanFieldView from '../fields-booleans/BooleanFieldView';
import ChoicesFieldView from '../fields-choices/ChoicesFieldView';
import DateFieldView from '../fields-dates/DateFieldView';
import FileFieldView from '../fields-files/FileFieldView';
import ImagesFieldView from '../fields-images/ImagesFieldView';
import ItemFieldView from '../fields-items/ItemFieldView';
import NumberFieldView from '../fields-numbers/NumberFieldView';
import TextFieldView from '../fields-texts/TextFieldView';
import params from '../../params';

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
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: space-between;
    order-control {
        display: none;
    }

    &.focusable {
        >.field-wrapper {
            position: relative;
            border: 2px solid transparent;
            border-radius: 4px;
            padding-left: 4px;
            padding-right: 4px;
            >.order-control {
                display: block;
                visibility: hidden;
                position: absolute;
                top: 0;
                right: 0;
                padding: 6px;
                border-radius: 4px;
                background-color: #fff;
                z-index: 10;
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
