import { 
    FieldModel, 
    fieldModel, 
    configModel, 
    ConfigModel 
} from '../fields/models';

class DateConfigModel extends ConfigModel {
    TYPE_TIME = 'time'
    TYPE_DATE = 'date'
    TYPE_YEAR = 'year'
    TYPE_MONTH = 'month'
    TYPE_DATETIME = 'datetime'

    TYPE_CHOICES = {
        [this.TYPE_TIME]: 'Hora',
        [this.TYPE_DATE]: 'Fecha',
        [this.TYPE_YEAR]: 'Año',
        [this.TYPE_MONTH]: 'Mes',
        [this.TYPE_DATETIME]: 'Fecha y hora'
    }

    props = Object.assign({}, configModel.props, {
        dataType: {
            writable: true,
            api: 'data_type',
            type: String,
            fill: true,
            default: this.TYPE_DATE,
            choices: Object.keys(this.TYPE_CHOICES)
        }
    })
}

const dateConfigModel = new DateConfigModel();

class DateTimeFieldModel extends FieldModel {
    props = Object.assign({}, fieldModel.props, {
        type: {
            writable: false,
            type: String,
            default: 'datetime'
        },        
        name: {
            writable: true,
            api: 'name',
            type: String,
            default: 'Fecha'
        },
        default: {
            writable: true,
            api: 'default',
            type: Date
        },
        minValue: {
            writable: true,
            api: 'min_value',
            type: Date
        },
        maxValue: {
            writable: true,
            api: 'max_value',
            type: Date
        },
        config: {
            writable: true,
            api: 'config',
            type: Object,
            default: {},
            model: dateConfigModel
        }
    })
}

const dateTimeFieldModel = new DateTimeFieldModel();

Object.freeze(dateTimeFieldModel);
Object.freeze(dateConfigModel);

export {
    dateTimeFieldModel,
    dateConfigModel
};
