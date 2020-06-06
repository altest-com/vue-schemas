import { ValueModel, valueModel } from '../values/models';

class FileValueModel extends ValueModel {
    props = Object.assign({}, valueModel.props, {
        type: {
            writable: false,
            type: String,
            default: 'file'
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

const fileValueModel = new FileValueModel();

Object.freeze(fileValueModel);

export {
    fileValueModel
};
