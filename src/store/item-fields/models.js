import { 
    FieldModel, 
    fieldModel, 
    configModel, 
    ConfigModel 
} from '../fields/models';

class ItemConfigModel extends ConfigModel {
    DISPLAY_SELECT = 'select'
    DISPLAY_NEST = 'nest'

    LIST_STEPS = 'steps'
    LIST_BLOCKS = 'blocks'

    DISPLAY_CHOICES = {
        [this.DISPLAY_SELECT]: 'Selección',
        [this.DISPLAY_NEST]: 'Editor anidado'
    }

    LIST_CHOICES = {
        [this.LIST_STEPS]: 'Secuencia',
        [this.LIST_BLOCKS]: 'Bloques'
    }

    props = Object.assign({}, configModel.props, {
        displayAs: {
            writable: true,
            api: 'display_as',
            type: String,
            fill: true,
            default: this.DISPLAY_SELECT,
            choices: Object.keys(this.DISPLAY_CHOICES)
        },
        listAs: {
            writable: true,
            api: 'list_as',
            type: String,
            fill: true,
            default: this.LIST_STEPS,
            choices: Object.keys(this.LIST_CHOICES)
        }
    })
}

const itemConfigModel = new ItemConfigModel();

class ItemFieldModel extends FieldModel {
    props = Object.assign({}, fieldModel.props, {
        type: {
            writable: false,
            type: String,
            default: 'item'
        },        
        name: {
            writable: true,
            api: 'name',
            type: String,
            default: 'Objeto'
        },
        default: {
            writable: true,
            api: 'default',
            type: Number,
            many: true
        },
        multi: {
            writable: true,
            api: 'multi',
            type: Boolean,
            default: false
        },
        targetSchema: {
            writable: true,
            api: 'target_schema',
            type: Number
        },
        config: {
            writable: true,
            api: 'config',
            type: Object,
            default: {},
            model: itemConfigModel
        }
    })
}

const itemFieldModel = new ItemFieldModel();

export {
    ItemFieldModel,
    itemFieldModel,
    itemConfigModel,
    ItemConfigModel
};
