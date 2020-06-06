import { 
    FieldModel, 
    fieldModel, 
    configModel, 
    ConfigModel 
} from '../fields/models';

import { readers, writers } from 'vrudex';

class NumberConfigModel extends ConfigModel {
    DISPLAY_INPUT = 'input'
    DISPLAY_SLIDER = 'slider'

    DISPLAY_CHOICES = {
        [this.DISPLAY_INPUT]: 'Edición de línea',
        [this.DISPLAY_SLIDER]: 'Barra deslizante'
    }

    props = Object.assign({}, configModel.props, {
        displayAs: {
            writable: true,
            api: 'display_as',
            type: String,
            fill: true,
            default: this.DISPLAY_INPUT,
            choices: Object.keys(this.DISPLAY_CHOICES)
        },
        integer: {
            writable: true,
            api: 'integer',
            type: Boolean,
            fill: true,
            default: true
        },
        prefix: {
            writable: true,
            api: 'prefix',
            fill: true,
            type: String
        },
        suffix: {
            writable: true,
            api: 'suffix',
            fill: true,
            type: String
        }
    })
}

const numberConfigModel = new NumberConfigModel();

Object.freeze(numberConfigModel);

class NumberFieldModel extends FieldModel {
    props = Object.assign({}, fieldModel.props, {
        type: {
            writable: false,
            type: String,
            default: 'number'
        },        
        name: {
            writable: true,
            api: 'name',
            type: String,
            default: 'Número'
        }, 
        default: {
            writable: true,
            api: 'default',
            type: Number,
            reader: readers.numberReader,
            writer: writers.numberWriter
        },
        minValue: {
            writable: true,
            api: 'min_value',
            type: Number,
            reader: readers.numberReader,
            writer: writers.numberWriter
        },
        maxValue: {
            writable: true,
            api: 'max_value',
            type: Number,
            reader: readers.numberReader,
            writer: writers.numberWriter
        },
        config: {
            writable: true,
            api: 'config',
            type: Object,
            default: {},
            model: numberConfigModel
        }
    })
}

const numberFieldModel = new NumberFieldModel();

Object.freeze(numberFieldModel);

export {
    numberFieldModel,
    numberConfigModel
};
