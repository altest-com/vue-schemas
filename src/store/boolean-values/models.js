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
            type: Boolean,
            default: false
        }
    })
}

const booleanValueModel = new BooleanValueModel();

Object.freeze(booleanValueModel);

export {
    booleanValueModel
};
