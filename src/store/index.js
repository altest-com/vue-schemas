import booleanFields from './boolean-fields';
import booleanValues from './boolean-values';
import categories from './categories';
import choices from './choices';
import choicesFields from './choices-fields';
import choicesValues from './choices-values';
import dateTimeFields from './datetime-fields';
import dateTimeValues from './datetime-values';
import fileFields from './file-fields';
import fileValues from './file-values';
import files from './files';
import imagesFields from './images-fields';
import imagesValues from './images-values';
import images from './images';
import itemFields from './item-fields';
import itemSchemas from './item-schemas';
import itemValues from './item-values';
import items from './items';
import navigation from './navigation';
import numberFields from './number-fields';
import numberValues from './number-values';
import textFields from './text-fields';
import textValues from './text-values';
import exports from './exports';

const store = {
    namespaced: true,
    modules: {
        booleanFields,
        booleanValues,
        categories,
        choices,
        choicesFields,
        choicesValues,
        dateTimeFields,
        dateTimeValues,
        fileFields,
        fileValues,
        files,
        imagesFields,
        imagesValues,
        images,
        numberFields,
        numberValues,
        itemFields,
        itemSchemas,
        itemValues,
        items,
        navigation,
        textFields,
        textValues,
        exports
    }
};

export default store;
