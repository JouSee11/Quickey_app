<script setup lang="ts">
import type { ActionNodeProps, ActionNodeEmits } from '@/types/buttonBindHome';
import { Icon } from '@iconify/vue';
import { ref, watch, onMounted } from 'vue';

const props = defineProps<ActionNodeProps>()
const emit = defineEmits<ActionNodeEmits>()

// const pixelsMove = ref<number[]>([0, 0])
// const selectedDirections = ref<string[]>(['left', 'up'])

const xPixels = ref(0)
const yPixels = ref(0)
const xDirection = ref('left')
const yDirection = ref('up')

//update the element value
const updateValue = () => {
    props.actionElement.value = `${xDirection.value}&${yDirection.value}&${xPixels.value}&${yPixels.value}`
}

watch([xPixels, yPixels, xDirection, yDirection], updateValue)

const handleRemoveAction = () => {
    emit('remove', props.index)
}

onMounted(() => {
    if (props.actionElement.value !== '') {
        const valuesParts = props.actionElement.value.split('&')
        xDirection.value = valuesParts[0]
        yDirection.value = valuesParts[1]
        xPixels.value = parseInt(valuesParts[2])
        yPixels.value = parseInt(valuesParts[3])
    }
})



</script>

<template>
     <!-- main template for displaying the actions -->
    <div
        class="action-node"
        :key="props.actionElement.id"
        @click="() => {console.log(props.actionElement.value)}"
    >
        <!-- Drag handle -->
        <div class="drag-handle">
            <i class="pi pi-bars icon-drag"></i>
        </div>
        <!-- index show -->
        <p class="node-index">{{ props.index + 1}}:</p>
        
        <!-- Action icon -->
        <Icon :icon="props.actionElement.icon" class="action-icon"/>
        
        <!-- Action content -->
        <div class="node-content">
            <p class="node-key">{{ props.actionElement.label }}</p>

            <div class="node-content-controls">
                <InputNumber v-model="xPixels" class="node-content-input" type="number" placeholder="pixels" :use-grouping="false" :min="0" :max="9999"/>
                <Select v-model="xDirection" :options="['left', 'right']" size="small" class="node-content-select"/>
              
                <InputNumber v-model="yPixels" class="node-content-input" type="number" placeholder="pixels" :use-grouping="false" :min="0" :max="9999"/>
                <Select v-model="yDirection" :options="['up', 'down']" size="small" class="node-content-select"/>
            </div>

            <!-- <p class="node-content-label">{{ props.actionElement.label }}</p> -->
        </div>
        
        <!-- Remove button -->
        <Button class="delete-btn" @click="handleRemoveAction" icon="pi pi-times" outlined size="small"/>
    </div>
</template>

<style scoped>
.node-content-controls{
    display: flex;
}

:deep(input){
    width: 90px;
    height: 30px;
    text-align: end;   
    margin-right: 10px;
}

:deep(.node-content-select) {
    height: 30px;
    margin-right: 20px;
}


/* .node-content-input{
    height: 30px;
    width: 10px;
    margin-right: 50px;
} */

</style>