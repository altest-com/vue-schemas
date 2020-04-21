import { ValueModel, valueModel } from '../values/models';

class DateTimeValueModel extends ValueModel {
    props = Object.assign({}, valueModel.props, {
        type: {
            writable: false,
            type: String,
            default: 'datetime'
        }, 
        value: {
            writable: true,
            api: 'value',
            type: Date
        }
    })
}

const dateTimeValueModel = new DateTimeValueModel();

export {
    DateTimeValueModel,
    dateTimeValueModel
};
