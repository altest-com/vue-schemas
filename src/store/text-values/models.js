import { ValueModel, valueModel } from '../values/models';

class TextValueModel extends ValueModel {
    props = Object.assign({}, valueModel.props, {
        type: {
            writable: false,
            type: String,
            default: 'text'
        }, 
        value: {
            writable: true,
            api: 'value',
            type: String
        }
    })
}

const textValueModel = new TextValueModel();

Object.freeze(textValueModel);

export {
    textValueModel
};
