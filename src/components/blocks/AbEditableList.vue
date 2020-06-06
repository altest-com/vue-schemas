<template>

<div class="ab-editable-list">
    <el-form
        ref="form"
        label-position="top"            
        size="small"
    >
        <el-form-item :label="addLabel">
            <div class="flex-row jb">
                <el-input
                    v-model="newItem"
                    placeholder="Opción"                    
                ></el-input>
                <el-button
                    :disabled="!newItem"
                    type="primary" 
                    icon="el-icon-plus"
                    class="ml-2"
                    @click="onAddItem"
                />
            </div>                
        </el-form-item>

        <el-form-item :label="listLabel">
            <div class="items-list mt-2">
                <div 
                    v-for="(item, index) in value" 
                    :key="item.id"
                    class="item flex-row jb ac"
                >
                    <div class="item-value flex-row js ac">
                        <ab-order-buttons
                            v-if="sortable" 
                            @up="onItemUp(index)"
                            @down="onItemDown(index)"
                            class="mr-2"
                        ></ab-order-buttons>
                        <el-input
                            class="item-edit"
                            v-if="item.id === editId" 
                            v-model="editValue"
                            :ref="'edit-' + item.id"
                            @change="onFinishEdit(item, true)"
                            @blur="onFinishEdit(item, false)"
                        ></el-input>
                        <div v-else class="label">{{ item.name }}</div>
                    </div>
                    <div class="item-actions">
                        <el-button 
                            type="text" 
                            icon="el-icon-delete" 
                            size="small"
                            class="mr-2"
                            @click="onRemoveItem(item)"
                        />
                        <el-button 
                            type="text" 
                            icon="el-icon-edit" 
                            size="small"
                            @click="onStartEdit(item)"
                        />
                    </div>
                </div>
            </div>           
        </el-form-item>
    </el-form>
</div>

</template>

<script>

import AbOrderButtons from './AbOrderButtons';

const randId = () => Math.random().toString(36).substr(2, 9);

const move = (arr, from, to) => {
    if (from >= 0 && to >= 0 && from < arr.length && to < arr.length) {
        arr = arr.slice();
        arr.splice(to, 0, arr.splice(from, 1)[0]);
        return arr;
    }
    return arr;
};

export default {
    name: 'AbEditableList',

    components: {
        AbOrderButtons
    },

    props: {
        value: {
            type: Array,
            required: true
        },
        listLabel: {
            type: String,
            default: 'Opciones'
        },
        addLabel: {
            type: String,
            default: 'Añadir opción'
        },
        manage: {
            type: Boolean,
            default: true
        },
        delete: {
            type: Boolean,
            default: true
        },
        sortable: {
            type: Boolean,
            default: true
        }
    },

    data() {
        return {
            newItem: '',
            editId: null,
            editValue: ''
        };
    },

    computed: {
    },

    methods: {
        onAddItem() {
            if (this.newItem) {
                if (this.manage) {
                    this.$emit('input', [...this.value, {
                        id: randId(),
                        name: this.newItem
                    }]);
                } else {
                    this.$emit('add', this.newItem);
                }
                this.newItem = '';
            }
        },
        onStartEdit(item) {
            this.editId = item.id;
            this.editValue = item.name;
            this.$nextTick(() => {
                this.$refs['edit-' + item.id][0].focus();
            });            
        },
        onFinishEdit(item, change = true) {
            this.editId = null;
            if (change) {
                if (this.manage) {
                    this.$emit('input', this.value.map(item_ => {
                        return item_.id === item.id ? {
                            id: item.id,
                            name: this.editValue
                        } : item_;
                    }));
                } else {
                    this.$emit('edit', item.id, this.editValue);
                }
            }
            this.editValue = '';
        },
        onRemoveItem(item) {
            if (this.manage && this.delete) {
                this.$emit('input', this.value.filter(
                    item_ => item_.id !== item.id
                ));
            } else {
                this.$emit('remove', item.id);
            }
        },
        onItemUp(index) {
            if (index > 0) {
                const value = move(this.value, index, index - 1);
                if (this.manage) {
                    this.$emit('input', value);
                } else {
                    this.$emit('sort', value.map(val => val.id));
                }
            }
        },
        onItemDown(index) {
            if (index < this.value.length) {
                const value = move(this.value, index, index + 1);
                if (this.manage) {
                    this.$emit('input', value);
                } else {
                    this.$emit('sort', value.map(val => val.id));
                }
            }
        }           
    }    
};
</script>

<style lang="scss">

.ab-editable-list {
    .items-list {
        .item {
            width: 100%;
            font-size: 14px;
            padding: 6px 8px;
            border-bottom: 1px solid #ebeef5;
            &:first-child {
                border-top: 1px solid #ebeef5;
            }
            .item-actions {
                flex-shrink: 0;
                .el-button {
                    border: none;
                    padding: 0px;
                }
            }
            .item-value, .el-input, input, .item-actions {
                height: 30px;
            }
            .ab-order-buttons, .item-actions {
                visibility: hidden;
            }
            &:hover {
                background-color: #f5f7fa;
                .ab-order-buttons, .item-actions {
                    visibility: visible;
                }
            }
            .item-value {
                min-width: 0;
                >.label {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }    
}

</style>
