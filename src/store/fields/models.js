import { Model } from 'vrudex';

class ConfigModel extends Model {
    props = {
        section: {
            writable: true,
            api: 'section',
            type: String,
            fill: true
        },
        showLabel: {
            writable: true,
            api: 'show_label',
            type: Boolean,
            default: true,
            fill: true
        },
        width: {
            writable: true,
            api: 'width',
            type: String,
            default: '100%',
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
