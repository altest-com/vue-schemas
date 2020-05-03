<template>

<el-form
    ref="form"
    size="small"
    label-position="top"
    class="items-value-editors"
>
    <div
        v-for="value in values" 
        :key="value.type + value.id"
        class="field-wrapper"
        :style="{width: value.width}"
    >
        <boolean-value-editor
            v-if="value.type === 'boolean'"
            :value-id="value.id"
        ></boolean-value-editor>
        <choices-value-editor 
            v-else-if="value.type === 'choices'"
            :value-id="value.id"
        ></choices-value-editor>
        <date-value-editor 
            v-else-if="value.type === 'datetime'"
            :value-id="value.id"
        ></date-value-editor>
        <file-value-editor
            v-else-if="value.type === 'file'"
            :value-id="value.id"
        ></file-value-editor>
        <images-value-editor
            v-else-if="value.type === 'image'"
            :value-id="value.id"
        ></images-value-editor>
        <item-value-editor
            v-else-if="value.type === 'item'"
            :value-id="value.id"
        ></item-value-editor>
        <number-value-editor 
            v-else-if="value.type === 'number'"
            :value-id="value.id"
        ></number-value-editor>
        <text-value-editor 
            v-else-if="value.type === 'text'"
            :value-id="value.id"
        ></text-value-editor>                
    </div>
</el-form>

</template>

<script>

import BooleanValueEditor from '../fields-booleans/BooleanValueEditor';
import ChoicesValueEditor from '../fields-choices/ChoicesValueEditor';
import DateValueEditor from '../fields-dates/DateValueEditor';
import FileValueEditor from '../fields-files/FileValueEditor';
import ImagesValueEditor from '../fields-images/ImagesValueEditor';
import ItemValueEditor from '../fields-items/ItemValueEditor';
import NumberValueEditor from '../fields-numbers/NumberValueEditor';
import TextValueEditor from '../fields-texts/TextValueEditor';

export default {
    name: 'ItemsValueEditors',

    components: {
        BooleanValueEditor,
        ChoicesValueEditor,
        DateValueEditor,
        FileValueEditor,
        ImagesValueEditor,
        NumberValueEditor,
        ItemValueEditor,
        TextValueEditor
    },

    props: {
        values: {
            type: Array,
            default: () => []
        }
    },

    data() {
        return {
        };
    },

    computed: {
    },

    methods: {
    }    
};
</script>

<style lang="scss">

.items-value-editors {
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: space-between;
}

</style>
