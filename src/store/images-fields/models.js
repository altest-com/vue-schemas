import { FieldModel, fieldModel } from '../fields/models';

class ImagesFieldModel extends FieldModel {
    props = Object.assign({}, fieldModel.props, {
        type: {
            writable: false,
            type: String,
            default: 'image'
        },        
        name: {
            writable: true,
            api: 'name',
            type: String,
            default: 'Imagen'
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

const imagesFieldModel = new ImagesFieldModel();

export {
    ImagesFieldModel,
    imagesFieldModel
};
