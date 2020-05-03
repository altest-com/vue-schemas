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
            /* store.dispatch(`schemas/${this.fieldStore}/getItem`, this.fieldId); */
            return store.state.schemas[this.fieldStore].items[this.fieldId];          
        }
    },

    methods: {
        onParamChange(data) {
            this.$store.dispatch(`schemas/${this.fieldStore}/updateItem`, {
                persist: false,
                item: {id: this.fieldId, ...data}
            });
        },
        onConfigChange(data) {
            this.$store.dispatch(`schemas/${this.fieldStore}/updateItem`, {
                persist: false,
                item: {
                    id: this.fieldId, 
                    config: {...this.field.config, ...data}
                }
            });
        }
    }
};
