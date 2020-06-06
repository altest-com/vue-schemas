export default {
    methods: {
        labelItem(item) {
            return new Promise((resolve, reject) => {
                const textValues = this.$store.state.schemas.textValues;
                const values = [];
                const proms = [];
                item.represent.forEach(valueId => {
                    const value = textValues.items[valueId];
                    if (!value) {
                        proms.push(this.$store.dispatch(
                                `schemas/textValues/retrieveItem`, { 
                                    id: valueId 
                                }
                            ).then(value_ => { 
                                values.push({
                                    value: value_.value,
                                    order: value_.order
                                }); 
                            })
                        );                       
                    } else {
                        values.push({
                            value: value.value,
                            order: value.order
                        });
                    }
                });
                Promise.all(proms).then(() => {
                    const label = values.sort(
                        (va, vb) => (va.order < vb.order) ? 1 : -1
                    ).map(value => value.value).join(' ');
                    
                    const choice = {
                        value: item.id, 
                        label: label
                    };
                    resolve(choice);
                });
            });            
        }
    }
};
