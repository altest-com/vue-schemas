import { Model } from 'vrudex';

class FileModel extends Model {
    props = {
        id: {
            writable: false,
            api: 'id',
            type: Number
        },
        file: {
            writable: false,
            api: 'file',
            type: String
        },
        sizeBytes: {
            writable: false,
            api: 'size_bytes',
            type: Number
        }
    }
}

const fileModel = new FileModel();

Object.freeze(fileModel);

export {
    fileModel
};
