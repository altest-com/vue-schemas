export default {
    
    props: {
        valueId: {
            type: [Number, String],
            required: true
        }
    },

    computed: {
        value() {
            const state = this.$store.state.schemas;
            return state[this.valueStore].items[this.valueId];          
        },
        field() {
            if (!this.fieldStore) {
                return null;
            }
            const state = this.$store.state.schemas;
            return state[this.fieldStore].items[this.value.field];        
        }
    }
};

