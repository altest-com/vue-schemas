const nodes = {
    'blocks': 'div',
    'fluid': 'div',
    'vtable': 'tr',
    'htable': 'td'
};

export default {
    
    props: {
        valueId: {
            type: [Number, String],
            required: true
        },
        showLabel: {
            type: Boolean,
            default: true
        },
        layout: {
            type: String,
            required: true,
            validator: val => val in nodes
        },
        level: {
            type: Number,
            default: 1
        }
    },

    computed: {
        state() {
            return this.$store.state.schemas;
        },
        value() {
            return this.state[this.valueStore].items[this.valueId];          
        },
        field() {
            return this.state[this.fieldStore].items[this.value.field];        
        },
        label() {
            return this.field.config.showLabel ? this.field.name : '';
        },
        node() {
            return nodes[this.layout];
        }
    }
};

