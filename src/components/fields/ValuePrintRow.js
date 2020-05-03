const nodes = {
    'table': 'tr',
    'list': 'div'
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
        view: {
            type: String,
            required: true,
            validator: val => val in nodes
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
            return nodes[this.view];
        }
    }
};

