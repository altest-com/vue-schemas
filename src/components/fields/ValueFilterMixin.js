
export default {    
    props: {
        fieldId: {
            type: [Number, String],
            required: true
        }
    },

    computed: {
        filter() {
            const filters = this.$store.state.schemas.items.filters;
            return filters[this.field.itemSchema]; 
        },
        field() {
            const fields = this.$store.state.schemas[this.fieldStore].items;
            return fields[this.fieldId];        
        },
        label() {
            return this.field.config.showLabel ? this.field.name : '';
        }
    },

    methods: {
        onParamChange(query, value) {
            this.$store.dispatch(`schemas/items/updateFilter`, {
                id: this.field.itemSchema, 
                [query]: value
            });
            this.$emit('change');
        }
    }
};

