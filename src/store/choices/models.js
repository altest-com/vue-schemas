import { Model } from 'vrudex';

class ChoiceModel extends Model {
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
        field: {
            writable: true,
            api: 'field',
            type: Number
        }
    }
}

const choiceModel = new ChoiceModel();

export {
    ChoiceModel,
    choiceModel
};
