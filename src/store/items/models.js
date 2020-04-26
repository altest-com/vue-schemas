import { Model } from 'vrudex';

class ItemModel extends Model {
    props = {
        id: {
            writable: false,
            api: 'id',
            type: Number
        },
        schema: {
            writable: true,
            api: 'schema',
            type: Number
        },
        booleanValues: {
            writable: false,
            api: 'boolean_values',
            many: true,
            type: Number
        },
        choicesValues: {
            writable: false,
            api: 'choices_values',
            many: true,
            type: Number
        },
        dateTimeValues: {
            writable: false,
            api: 'datetime_values',
            many: true,
            type: Number
        },
        fileValues: {
            writable: false,
            api: 'file_values',
            many: true,
            type: Number
        },
        imagesValues: {
            writable: false,
            api: 'images_values',
            many: true,
            type: Number
        },
        itemValues: {
            writable: false,
            api: 'item_values',
            many: true,
            type: Number
        },
        numberValues: {
            writable: false,
            api: 'number_values',
            many: true,
            type: Number
        },
        textValues: {
            writable: false,
            api: 'text_values',
            many: true,
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

const itemModel = new ItemModel();

export {
    itemModel,
    ItemModel
};
