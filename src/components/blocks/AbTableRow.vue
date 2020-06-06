<template>

<tr class="ab-table-row" :class="{'focus': focus}" @click="$emit('click')">
    <td
        v-for="(item, index) in data" 
        :key="index"
        :class="{[item.class]: item.class}"
        :style="getStyle(item.type)"
    >
        <template v-if="item.type === 'image'">
            <router-link v-if="item.route" :to="item.route">
                <img :src="item.value" alt="">
            </router-link>
            <img v-else :src="item.value" alt="">
        </template>
        <template v-else-if="item.type === 'actions'">
            <el-button
                v-if="item.edit"
                size="mini"
                icon="el-icon-edit"
                class="mr-1"
                @click.stop="$emit('edit')"
            />
            <el-button
                v-if="item.remove"
                size="mini"
                icon="el-icon-delete"
                type="danger"
                @click.stop="$emit('remove')"
            />
        </template>
        <template v-else-if="item.type === 'menu'">
            <el-dropdown size="small" @command="cmd => $emit(cmd)">
                <el-button
                    circle
                    size="mini"
                    icon="el-icon-more"
                    :style="{'border': 'none'}"
                />
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                        v-if="item.edit"
                        icon="el-icon-edit"
                        command="edit"
                    >
                        Editar
                    </el-dropdown-item>
                    <el-dropdown-item
                        v-if="item.remove"
                        icon="el-icon-delete"
                        command="remove"
                    >
                        Eliminar
                    </el-dropdown-item>
                    <slot name="menu" />
                </el-dropdown-menu>
            </el-dropdown>
<!--            <el-popover-->
<!--                placement="bottom"-->
<!--                width="64"-->
<!--                trigger="hover"-->
<!--            >-->
<!--                <el-button-->
<!--                    v-if="item.edit"-->
<!--                    class="pt-0"-->
<!--                    type="text"-->
<!--                    size="mini"-->
<!--                    icon="el-icon-edit"-->
<!--                    @click.stop="$emit('edit')"-->
<!--                >-->
<!--                    Editar-->
<!--                </el-button>-->

<!--                <el-button-->
<!--                    v-if="item.remove"-->
<!--                    class="pb-0 ml-0"-->
<!--                    type="text"-->
<!--                    size="mini"-->
<!--                    icon="el-icon-delete"-->
<!--                    @click.stop="$emit('remove')"-->
<!--                >-->
<!--                    Eliminar-->
<!--                </el-button>-->

<!--                <slot name="menu" />-->
<!--            </el-popover>-->
        </template>
        <template v-else>
            <router-link v-if="item.route" :to="item.route">
                {{ item.value }}
            </router-link>
            <template v-else>{{ item.value }}</template>        
        </template>
    </td>
</tr>

</template>

<script>

import filters from '../../filters';

const filter = {
    'date': filters.dateFilter,
    'time': filters.timeFilter,
    'datetime': filters.dateTimeFilter
};

export default {
    name: 'AbTableRow',

    props: {
        items: {
            type: Array,
            default: () => []
        },
        focus: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
        };
    },

    computed: {
        data() {
            return this.items.map(item => {
                let value = item.value;
                if (value || value === 0) {
                    const filter_ = filter[item.type];
                    value = filter_ ? filter_(value) : value;
                } else {
                    value = '';
                }
                return {
                    ...item,
                    value: value
                };
            });
        }
    },

    methods: {
        getStyle(type) {
            const style = {};
            switch (type) {
                case 'actions':
                    style.width = '124px';
                    break;
                case 'menu':
                    style.width = '64px';
                    break;
            }
            return style;
        }
    }
};
</script>

<style lang="scss">
</style>
