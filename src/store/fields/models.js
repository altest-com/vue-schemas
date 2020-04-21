import { Model } from 'vrudex';

class ConfigModel extends Model {
    props = {
        section: {
            writable: true,
            api: 'section',
            type: String,
            fill: true
        }
    }
}

const configModel = new ConfigModel();

class FieldModel extends Model {
    props = {
        id: {
            writable: false,
            api: 'id',
            type: Number
        },
        name: {
            writable: true,
            api: 'name',
            type: String
        },
        required: {
            writable: true,
            api: 'required',
            type: Boolean,
            default: false
        },
        order: {
            writable: true,
            api: 'order',
            type: Number
        },
        help: {
            writable: true,
            api: 'help',
            type: String
        },
        config: {
            writable: true,
            api: 'config',
            type: Object,
            default: {},
            model: configModel
        },
        itemSchema: {
            writable: true,
            api: 'item_schema',
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

const fieldModel = new FieldModel();

export {
    FieldModel,
    fieldModel,
    ConfigModel,
    configModel
};
