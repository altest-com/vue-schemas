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

export {
    TextFieldModel,
    textFieldModel,
    TextConfigModel,
    textConfigModel
};
