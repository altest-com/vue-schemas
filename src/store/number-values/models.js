import { ValueModel, valueModel } from '../values/models';
import { readers } from 'vrudex';

class NumberValueModel extends ValueModel {
    props = Object.assign({}, valueModel.props, {
        type: {
            writable: false,
            type: String,
            default: 'number'
        },  
        value: {
            writable: true,
            api: 'value',
            type: Number,
            reader: readers.numberReader
        }
    })
}

const numberValueModel = new NumberValueModel();

export {
    NumberValueModel,
    numberValueModel
};
