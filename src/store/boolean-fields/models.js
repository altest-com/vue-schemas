import { 
    FieldModel, 
    fieldModel, 
    configModel, 
    ConfigModel 
} from '../fields/models';

class BooleanConfigModel extends ConfigModel {
    DISPLAY_SWITCH = 'switch'
    DISPLAY_BUTTONS = 'buttons'
    DISPLAY_RADIO = 'radio'

    DISPLAY_CHOICES = {
        [this.DISPLAY_SWITCH]: 'Switch',
        [this.DISPLAY_BUTTONS]: 'Botones',
        [this.DISPLAY_RADIO]: 'Radio'
    }

    props = Object.assign({}, configModel.props, {
        displayAs: {
            writable: true,
            api: 'display_as',
            type: String,
            fill: true,
            default: this.DISPLAY_SWITCH,
            choices: Object.keys(this.DISPLAY_CHOICES)
        }
    })
}

const booleanConfigModel = new BooleanConfigModel();

class BooleanFieldModel extends FieldModel {
    props = Object.assign({}, fieldModel.props, {
        type: {
            writable: false,
            type: String,
            default: 'boolean'
        },
        name: {
            writable: true,
            api: 'name',
            type: String,
            default: 'Binario'
        },
        default: {
            writable: true,
            api: 'default',
            type: Boolean
        },
        config: {
            writable: true,
            api: 'config',
            type: Object,
            default: {},
            model: booleanConfigModel
        }
    })
}

const booleanFieldModel = new BooleanFieldModel();

export {
    BooleanFieldModel,
    booleanFieldModel,
    BooleanConfigModel,
    booleanConfigModel
};
