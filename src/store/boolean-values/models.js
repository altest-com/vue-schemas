import { ValueModel, valueModel } from '../values/models';

class BooleanValueModel extends ValueModel {
    props = Object.assign({}, valueModel.props, {
        type: {
            writable: false,
            type: String,
            default: 'boolean'
        },
        value: {
            writable: true,
            api: 'value',
            type: Boolean
        }
    })
}

const booleanValueModel = new BooleanValueModel();

export {
    BooleanValueModel,
    booleanValueModel
};
