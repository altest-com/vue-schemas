import { 
    FieldModel, 
    fieldModel, 
    configModel, 
    ConfigModel 
} from '../fields/models';

class TextConfigModel extends ConfigModel {
    props = Object.assign({}, configModel.props, {
        rows: {
            writable: true,
            api: 'rows',
            type: Number,
            fill: true,
            default: 1
        }
    })
}

const textConfigModel = new TextConfigModel();

Object.freeze(TextConfigModel);

class TextFieldModel extends FieldModel {
    props = Object.assign({}, fieldModel.props, {
        type: {
            writable: false,
            type: String,
            default: 'text'
        },        
        name: {
            writable: true,
            api: 'name',
            type: String,
            default: 'Texto'
        },
        default: {
            writable: true,
            api: 'default',
            type: String
        },
        query: {
            writable: true,
            api: 'query',
            type: Boolean,
            default: false
        },
        represent: {
            writable: true,
            api: 'represent',
            type: Boolean,
            default: false
        },
        config: {
            writable: true,
            api: 'config',
            type: Object,
            default: {},
            model: textConfigModel
        }
    })
}

const textFieldModel = new TextFieldModel();

Object.freeze(textFieldModel);

export {
    textFieldModel,
    textConfigModel
};
