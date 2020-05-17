export default {    
    props: {
        valueId: {
            type: [Number, String],
            required: true
        }
    },

    computed: {
        value() {
            const store = this.$store;
            return store.state.schemas[this.valueStore].items[this.valueId];          
        },
        field() {
            const fieldId = this.value.field;
            return this.$store.state.schemas[this.fieldStore].items[fieldId];        
        },
        label() {
            return this.field.config.showLabel ? this.field.name : '';
        }
    },

    methods: {
        onParamChange(data) {
            this.$store.dispatch(`schemas/${this.valueStore}/updateItem`, {
                persist: true,
                item: {id: this.valueId, ...data}
            });
        }
    }
};

