import { ValueModel, valueModel } from '../values/models';

class ImagesValueModel extends ValueModel {
    props = Object.assign({}, valueModel.props, {
        type: {
            writable: false,
            type: String,
            default: 'image'
        }, 
        value: {
            writable: true,
            api: 'value',
            many: true,
            type: Number,
            default: []
        }
    })
}

const imagesValueModel = new ImagesValueModel();

Object.freeze(imagesValueModel);

export {
    imagesValueModel
};
