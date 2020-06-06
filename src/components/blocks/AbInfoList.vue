<template>

<div class="ab-info-list">
    <div 
        v-for="(item, index) in data" 
        :key="index"
        class="info-item"
        :class="{[item.class]: item.class}"
    >
        <div v-if="item.label" class="label"> {{ item.label }} </div>
        <div class="value" :class="item.type">
            <img v-if="item.type === 'image'" :src="item.value" alt="">
            <template v-else> {{ item.value }} </template>
        </div>
    </div>
</div>

</template>

<script>

import filters from '@/filters';

const filter = {
    'date': filters.dateFilter,
    'time': filters.timeFilter,
    'datetime': filters.dateTimeFilter
};

export default {
    name: 'AbInfoList',
    
    props: {
        items: {
            type: Array,
            default: () => []
        }
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
    }
};
</script>

<style lang="scss">

.ab-info-list {
    .info-item {
        border-bottom: 1px solid #ebeef5;
        padding: 8px 16px;
        &:first-child {
            border-top: 1px solid #ebeef5;
        }
    }
    .label {
        font-weight: 300;
        color: rgb(78, 78, 78);
        font-size: 14px;
    }
    .value {
        font-weight: 400;
        color: #000;
        font-size: 14px;
    }
    .value.image {
        width: 100%;
        height: 256px;
        background-color: #000;
        img {
            display: block;
            height: 100%;
            max-width: 100%;
            margin: auto;
            object-fit: contain;
        }
    }
}

</style>
