import { FieldModel, fieldModel } from '../fields/models';

class FileFieldModel extends FieldModel {
    props = Object.assign({}, fieldModel.props, {
        type: {
            writable: false,
            type: String,
            default: 'file'
        },        
        name: {
            writable: true,
            api: 'name',
            type: String,
            default: 'Archivo'
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
        }
    })
}

const fileFieldModel = new FileFieldModel();

export {
    FileFieldModel,
    fileFieldModel
};
