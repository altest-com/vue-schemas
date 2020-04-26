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
            store.dispatch(`schemas/${this.valueStore}/getItem`, this.valueId);
            return store.state.schemas[this.valueStore].items[this.valueId];          
        },
        field() {
            const fieldId = this.value.field;
            this.$store.dispatch(`schemas/${this.fieldStore}/getItem`, fieldId);
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

