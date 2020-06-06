import { Model } from 'vrudex';

class CategoryModel extends Model {
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
        description: {
            writable: true,
            api: 'description',
            type: String
        },
        parent: {
            writable: true,
            api: 'parent',
            type: Number
        }
    }
}

const categoryModel = new CategoryModel();

Object.freeze(categoryModel);

export {
    CategoryModel,
    categoryModel
};
