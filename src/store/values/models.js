import { Model } from 'vrudex';

class ValueModel extends Model {
    props = {
        id: {
            writable: false,
            api: 'id',
            type: Number
        },
        item: {
            writable: true,
            api: 'item',
            type: Number
        },
        field: {
            writable: true,
            api: 'field',
            type: Number
        },
        order: {
            writable: false,
            api: 'order',
            type: Number
        },
        createdAt: {
            writable: false,
            api: 'created_at',
            type: Date
        },
        updatedAt: {
            writable: false,
            api: 'updated_at',
            type: Date
        }
    }
}

const valueModel = new ValueModel();

export {
    ValueModel,
    valueModel
};
