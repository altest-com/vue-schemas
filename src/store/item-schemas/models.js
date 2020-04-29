import { Model } from 'vrudex';

class ConfigModel extends Model {
    SECTIONS_TABS = 'tabs'
    SECTIONS_ACCORDION = 'accordion'
    SECTIONS_BLOCKS = 'blocks'
    SECTIONS_STEPS = 'steps'

    TAB_POSITION_TOP = 'top'
    TAB_POSITION_RIGHT = 'right'
    TAB_POSITION_BOTTOM = 'bottom'
    TAB_POSITION_LEFT = 'left'

    SECTIONS_CHOICES = {
        [this.SECTIONS_TABS]: 'Pestañas',
        [this.SECTIONS_ACCORDION]: 'Acordeón',
        [this.SECTIONS_BLOCKS]: 'Bloques',
        [this.SECTIONS_STEPS]: 'Secuencia'
    }

    TABS_POSITION_CHOICES = {
        [this.TAB_POSITION_TOP]: 'Superior',
        [this.TAB_POSITION_RIGHT]: 'Derecha',
        [this.TAB_POSITION_BOTTOM]: 'Inferior',
        [this.TAB_POSITION_LEFT]: 'Izquierda'
    }

    props = {
        sections: {
            writable: true,
            api: 'sections',
            type: String,
            many: true,
            fill: true
        },
        sectionsType: {
            writable: true,
            api: 'sections_type',
            type: String,
            choices: Object.keys(this.SECTIONS_CHOICES),
            default: this.SECTIONS_ACCORDION,
            fill: true
        },
        tabsPosition: {
            writable: true,
            api: 'tabs_position',
            type: String,
            choices: Object.keys(this.TABS_POSITION_CHOICES),
            default: this.TAB_POSITION_TOP,
            fill: true
        },
        initSection: {
            writable: true,
            api: 'init_section',
            type: String,
            default: '',
            fill: true
        }
    }
}

const configModel = new ConfigModel();

class ItemSchemaModel extends Model {
    props = {
        id: {
            writable: false,
            api: 'id',
            type: Number
        },
        name: {
            writable: true,
            api: 'name',
            type: String,
            default: 'Nuevo Esquema'
        },
        category: {
            writable: true,
            api: 'category',
            type: Number
        },
        itemsCount: {
            writable: false,
            api: 'items_count',
            type: Number
        },
        image: {
            writable: true,
            api: 'image',
            type: Number
        },
        config: {
            writable: true,
            api: 'config',
            type: Object,
            default: {},
            model: configModel
        },
        booleanFields: {
            writable: false,
            api: 'boolean_fields',
            many: true,
            type: Number
        },
        choicesFields: {
            writable: false,
            api: 'choices_fields',
            many: true,
            type: Number
        },
        dateTimeFields: {
            writable: false,
            api: 'datetime_fields',
            many: true,
            type: Number
        },
        fileFields: {
            writable: false,
            api: 'file_fields',
            many: true,
            type: Number
        },
        imagesFields: {
            writable: false,
            api: 'images_fields',
            many: true,
            type: Number
        },
        itemFields: {
            writable: false,
            api: 'item_fields',
            many: true,
            type: Number
        },
        numberFields: {
            writable: false,
            api: 'number_fields',
            many: true,
            type: Number
        },
        textFields: {
            writable: false,
            api: 'text_fields',
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

const itemSchemaModel = new ItemSchemaModel();

const reverse = arr => {
    const arr_ = [];
    arr.forEach(val => {
        arr_.push(val);
        arr_.push('-' + val);
    });
    return arr_;
};

class SchemasFilter extends Model {
    ORDER_CHOICES = {
        'name': 'Nombre',
        'category': 'Categoría',
        'created_at': 'Fecha de creación',
        'updated_at': 'Fecha de actualización'
    }

    props = {
        orderBy: {
            writable: true,
            api: 'order_by',
            type: String,
            choices: reverse(Object.keys(this.ORDER_CHOICES)),
            default: 'created_at'
        },
        name: {
            writable: true,
            api: 'name__icontains',
            type: String
        },
        category: {
            writable: true,
            api: 'category_id__in',
            type: Number,
            many: true
        },
        minCreatedAt: {
            writable: true,
            api: 'created_at__gte',
            type: Date
        },
        maxCreatedAt: {
            writable: true,
            api: 'max_created_lte',
            type: Date
        }
    }
}

const schemasFilter = new SchemasFilter();

export {
    itemSchemaModel,
    ItemSchemaModel,
    SchemasFilter,
    schemasFilter,
    configModel
};
