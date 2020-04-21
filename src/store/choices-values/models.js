import { ValueModel, valueModel } from '../values/models';

class ChoicesValueModel extends ValueModel {
    props = Object.assign({}, valueModel.props, {
        type: {
            writable: false,
            type: String,
            default: 'choices'
        },  
        value: {
            writable: true,
            api: 'value',
            type: Number,
            many: true
        }
    })
}

const choicesValueModel = new ChoicesValueModel();

export {
    ChoicesValueModel,
    choicesValueModel
};
