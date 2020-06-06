<template>
    <div 
        class="ab-empty p-3" 
        :style="{height: height, color: color, backgroundColor: background}"
    >
        <i 
            v-if="icon"
            :class="icon"
            :style="{fontSize: iconSize, marginBottom: iconMargin}"
        />
        <div
            v-if="title" 
            class="title mb-1" 
            :style="{fontSize: titleSize}"
        >
            {{ title }}
        </div>
        <div
            v-if="message" 
            class="message" 
            :style="{fontSize: messageSize}"
        >
            {{ message }}
        </div>
    </div>
</template>

<script>

export default {
    name: 'AbEmpty',

    props: {
        title: {
            type: String,
            default: ''
        },
        message: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: 'el-icon-warning-outline'
        },
        iconSize: {
            type: String,
            default: '3em'
        },
        iconMargin: {
            type: String,
            default: '1rem'
        },
        titleSize: {
            type: String,
            default: '1.5em'
        },
        messageSize: {
            type: String,
            default: '0.8em'
        },
        height: {
            type: String,
            default: '100%'
        },
        color: {
            type: String,
            default: '#aaa'
        },
        background: {
            type: String,
            default: '#eee'
        }
    }
};
</script>

<style lang="scss">
    .ab-empty {
        background: #eeeeee;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        border-radius: 6px;
        .title, .message {
            text-align: center;
        }
    }
</style>
