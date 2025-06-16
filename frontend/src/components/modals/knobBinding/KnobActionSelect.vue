<script setup lang="ts">
import type { KnobActionCategory, KnobBindHome } from '@/types/buttonBindHome';
import { Icon } from '@iconify/vue';
import {ref, watch, computed, onMounted} from 'vue'

interface Props{
    actionCategories: KnobActionCategory[],
    type: 'left' | 'right' | 'button',
    defaultValue?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
    actionSelected: [type: 'left' | 'right' | 'button', value: string]
    actionDelete: [type: 'left' | 'right' | 'button']
}>()

const selectedAcion = ref()

watch(selectedAcion, (newValue) => {
    if (newValue && newValue.value) {
        emit('actionSelected', props.type, newValue.value)
    }
})

const deleteAction = () => {
    selectedAcion.value = ''
    emit('actionDelete', props.type)
}

//default value
const allOptions = computed(() => {
    return props.actionCategories.flatMap(category => category.items)
})

const findOptionByValue = (value: string) => {
    return allOptions.value.find(option => option.value === value)
}

onMounted(() => {
    if (props.defaultValue) {
        selectedAcion.value = findOptionByValue(props.defaultValue)
    }
})


// watch(selectedAcion, () => {
    
//     switch (props.type){
//         case 'left':
//             props.knobElement.values.left = selectedAcion.value.value
//             break
//         case 'right':
//             props.knobElement.values.right = selectedAcion.value.value
//             break
//         case 'button':
//             props.knobElement.values.button = selectedAcion.value.value
//             break
//     }
// })

</script>

<template>
    <div class="select-cont">
        <Select 
            v-model="selectedAcion" 
            :options="props.actionCategories" 
            option-label="label"
            option-group-label="label"
            option-group-children="items"
            placeholder="Select action"
            class="knob-select"
            filter
        >
            <template #optiongroup="actionCategory">
                <div class="action-header">
                    <Icon :icon="actionCategory.option.iconSection" class="category-icon"/>
                    <p>{{ actionCategory.option.label }}</p>
                </div>
            </template>

            <template #option="actionItem">
                <Icon :icon="actionItem.option.icon" class="item-icon"></Icon>
                <p>{{ actionItem.option.label }}</p>
            </template>

        </Select>
        <Button outlined  class="select-delete-button" size="small" @click="deleteAction">
            <Icon icon="material-symbols:close" class="select-delete-icon"/>
        </Button>
    </div>
</template>

<style scoped>
.select-cont{
    display: flex;
    align-items: center;
}


.knob-select{
    width: 100%;
}

.action-header {
    display: flex;
    align-items: center;
}

.category-icon{
    margin-right: 10px;
}

.item-icon{
    margin-right: 10px;
    width: 20px;
    height: 20px;
}

.select-delete-button{
    color: var(--red-dark);
    width: 30px;
    height: 30px;
    margin-left: 10px;
    padding: 0;
}

.select-delete-icon{
    width: 20px;
    height: 20px;
}

</style>