import { booleanFieldModel } from './store/boolean-fields/models';
import { choicesFieldModel } from './store/choices-fields/models';
import { dateTimeFieldModel } from './store/datetime-fields/models';
import { fileFieldModel } from './store/file-fields/models';
import { imagesFieldModel } from './store/images-fields/models';
import { itemFieldModel } from './store/item-fields/models';
import { numberFieldModel } from './store/number-fields/models';
import { textFieldModel } from './store/text-fields/models';
import { booleanValueModel } from './store/boolean-values/models';
import { choicesValueModel } from './store/choices-values/models';
import { dateTimeValueModel } from './store/datetime-values/models';
import { fileValueModel } from './store/file-values/models';
import { imagesValueModel } from './store/images-values/models';
import { itemValueModel } from './store/item-values/models';
import { numberValueModel } from './store/number-values/models';
import { textValueModel } from './store/text-values/models';

export default {
    boolean: {
        name: 'Binario',
        type: 'boolean',
        icon: require('./assets/field-boolean.png'),
        fieldStore: 'booleanFields',
        fieldModel: booleanFieldModel,
        valueStore: 'booleanValues',
        valueModel: booleanValueModel
    }, 
    choices: {
        name: 'Selección',
        type: 'choices',
        icon: require('./assets/field-choices.png'),
        fieldStore: 'choicesFields',
        fieldModel: choicesFieldModel,
        valueStore: 'choicesValues',
        valueModel: choicesValueModel
    },
    datetime: {
        name: 'Tiempo',
        type: 'datetime',
        icon: require('./assets/field-date.png'),
        fieldStore: 'dateTimeFields',
        fieldModel: dateTimeFieldModel,
        valueStore: 'dateTimeValues',
        valueModel: dateTimeValueModel
    },
    file: {
        name: 'Archivo',
        type: 'file',
        icon: require('./assets/field-file.png'),
        fieldStore: 'fileFields',
        fieldModel: fileFieldModel,
        valueStore: 'fileValues',
        valueModel: fileValueModel
    }, 
    image: {
        name: 'Imagen',
        type: 'image',
        icon: require('./assets/field-image.png'),
        fieldStore: 'imagesFields',
        fieldModel: imagesFieldModel,
        valueStore: 'imagesValues',
        valueModel: imagesValueModel
    },
    item: {
        name: 'Objeto',
        type: 'item',
        icon: require('./assets/field-item.png'),
        fieldStore: 'itemFields',
        fieldModel: itemFieldModel,
        valueStore: 'itemValues',
        valueModel: itemValueModel
    },
    number: {
        name: 'Número',
        type: 'number',
        icon: require('./assets/field-number.png'),
        fieldStore: 'numberFields',
        fieldModel: numberFieldModel,
        valueStore: 'numberValues',
        valueModel: numberValueModel
    },
    text: {
        name: 'Texto',
        type: 'text',
        icon: require('./assets/field-text.png'),
        fieldStore: 'textFields',
        fieldModel: textFieldModel,
        valueStore: 'textValues',
        valueModel: textValueModel
    }
};
