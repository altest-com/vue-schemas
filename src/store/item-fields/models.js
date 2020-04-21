import { FieldModel, fieldModel } from '../fields/models';

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
        }
    })
}

const itemFieldModel = new ItemFieldModel();

export {
    ItemFieldModel,
    itemFieldModel
};
