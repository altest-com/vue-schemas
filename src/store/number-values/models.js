import { ValueModel, valueModel } from '../values/models';
import { readers, writers } from 'vrudex';

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
            reader: readers.numberReader,
            writer: writers.numberWriter
        }
    })
}

const numberValueModel = new NumberValueModel();

Object.freeze(numberValueModel);

export {
    numberValueModel
};
