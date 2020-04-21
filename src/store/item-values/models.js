import { ValueModel, valueModel } from '../values/models';

class ItemValueModel extends ValueModel {
    props = Object.assign({}, valueModel.props, {
        type: {
            writable: false,
            type: String,
            default: 'item'
        }, 
        value: {
            writable: true,
            api: 'value',
            many: true,
            type: Number,
            default: []
        }
    })
}

const itemValueModel = new ItemValueModel();

export {
    ItemValueModel,
    itemValueModel
};
