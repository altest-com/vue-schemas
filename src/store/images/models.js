import { Model } from 'vrudex';

class ImageModel extends Model {
    props = {
        id: {
            writable: false,
            api: 'id',
            type: Number
        },
        image: {
            writable: false,
            api: 'image',
            type: String
        },
        sizeBytes: {
            writable: false,
            api: 'size_bytes',
            type: Number
        },
        width: {
            writable: false,
            api: 'width',
            type: Number
        },
        height: {
            writable: false,
            api: 'height',
            type: Number
        }
    }
}

const imageModel = new ImageModel();

Object.freeze(imageModel);

export {
    imageModel
};
