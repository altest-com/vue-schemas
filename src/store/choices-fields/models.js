import { 
    FieldModel, 
    fieldModel, 
    configModel, 
    ConfigModel 
} from '../fields/models';

class ChoicesConfigModel extends ConfigModel {
    DISPLAY_SELECT = 'select'
    DISPLAY_BUTTONS = 'buttons'
    DISPLAY_CHECK = 'check'

    DISPLAY_CHOICES = {
        [this.DISPLAY_SELECT]: 'Lista',
        [this.DISPLAY_BUTTONS]: 'Botones',
        [this.DISPLAY_CHECK]: 'Checkboxes'
    }

    LAYOUT_FLOW = 'flow'
    LAYOUT_VERTICAL = 'vertical'

    LAYOUT_CHOICES = {
        [this.LAYOUT_FLOW]: 'Fluida',
        [this.LAYOUT_VERTICAL]: 'Vertical'
    }

    props = Object.assign({}, configModel.props, {
        multi: {
            writable: true,
            api: 'multi',
            type: Boolean,
            default: false,
            fill: true
        },
        displayAs: {
            writable: true,
            api: 'display_as',
            type: String,
            fill: true,
            default: this.DISPLAY_SELECT,
            choices: Object.keys(this.DISPLAY_CHOICES)
        },
        layout: {
            writable: true,
            api: 'layout',
            type: String,
            fill: true,
            default: this.LAYOUT_FLOW,
            choices: Object.keys(this.LAYOUT_CHOICES)
        }
    })
}

const choicesConfigModel = new ChoicesConfigModel();

class ChoicesFieldModel extends FieldModel {
    props = Object.assign({}, fieldModel.props, {
        type: {
            writable: false,
            type: String,
            default: 'choices'
        },        
        name: {
            writable: true,
            api: 'name',
            type: String,
            default: 'Opciones'
        },
        default: {
            writable: true,
            api: 'default',
            type: Number,
            many: true
        },
        choices: {
            writable: true,
            api: 'choices',
            type: Number,
            many: true
        },
        config: {
            writable: true,
            api: 'config',
            type: Object,
            default: {},
            model: choicesConfigModel
        }
    })
}

const choicesFieldModel = new ChoicesFieldModel();

export {
    ChoicesFieldModel,
    choicesFieldModel,
    ChoicesConfigModel,
    choicesConfigModel
};
