export default {    
    props: {
        fieldId: {
            type: [Number, String],
            required: true
        }
    },
    computed: {
        field() {
            const store = this.$store;
            store.dispatch(`schemas/${this.fieldStore}/getItem`, this.fieldId);
            return store.state.schemas[this.fieldStore].items[this.fieldId];          
        },
        label() {
            return this.field.config.showLabel ? this.field.name : '';
        }
    }
};
