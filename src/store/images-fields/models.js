import { 
    FieldModel, 
    fieldModel, 
    configModel, 
    ConfigModel 
} from '../fields/models';

class ImageConfigModel extends ConfigModel {
    BUTTON_BLOCK = 'block'
    BUTTON_DRAG = 'drag'

    DISPLAY_CAROUSEL = 'carousel'
    DISPLAY_LABELS = 'labels'

    BUTTON_CHOICES = {
        [this.BUTTON_BLOCK]: 'Botón',
        [this.BUTTON_DRAG]: 'Arrastrar'
    }

    DISPLAY_CHOICES = {
        [this.DISPLAY_CAROUSEL]: 'Carrusel',
        [this.DISPLAY_LABELS]: 'Estiquetas'
    }

    props = Object.assign({}, configModel.props, {
        height: {
            writable: true,
            api: 'height',
            type: String,
            fill: true,
            default: '300px'
        },
        buttonType: {
            writable: true,
            api: 'button_type',
            type: String,
            fill: true,
            default: this.BUTTON_BLOCK,
            choices: Object.keys(this.BUTTON_CHOICES)
        },
        displayAs: {
            writable: true,
            api: 'display_as',
            type: String,
            fill: true,
            default: this.DISPLAY_CAROUSEL,
            choices: Object.keys(this.DISPLAY_CHOICES)
        }
    })
}

const imageConfigModel = new ImageConfigModel();

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
        },
        config: {
            writable: true,
            api: 'config',
            type: Object,
            default: {},
            model: imageConfigModel
        }
    })
}

const imagesFieldModel = new ImagesFieldModel();

export {
    ImagesFieldModel,
    imagesFieldModel,
    ImageConfigModel,
    imageConfigModel
};
