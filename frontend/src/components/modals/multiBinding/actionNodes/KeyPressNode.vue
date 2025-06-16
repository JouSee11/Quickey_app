<script setup lang="ts">
import { useActionKeyCapture } from '@/composables/useMultiKeyActionCapture';
import { useMultiBindingDialogStore } from '@/stores/multiBindingDialogStore';
import type { ActionNodeProps, ActionNodeEmits } from '@/types/buttonBindHome';
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';

const props = defineProps<ActionNodeProps>()
const emit = defineEmits<ActionNodeEmits>()

const { startActionCapture, isCapturing, capturingActionId} = useActionKeyCapture()
const store = useMultiBindingDialogStore()

const isThisActionCapturing = computed(() => {
    return isCapturing.value && capturingActionId.value === props.actionElement.id
})

const displayText = computed(() => {
    if (isThisActionCapturing.value) {
        return 'Press any key...'
    }
    if (props.actionElement.value === '' ) {
        return 'Click to bind key'
    }
    return props.actionElement.value
})

const handleRemoveAction = (event: MouseEvent) => {
    event.stopPropagation()

    emit('remove', props.index)
}

const handleStartCapture = () => {
    startActionCapture(props.actionElement.id)
    console.log(props.actionElement.value)
}

</script>

<template>
     <!-- main template for displaying the actions -->
    <div
        class="action-node"
        :key="props.actionElement.id"
        @click="handleStartCapture"
    >
        <!-- Drag handle -->
        <div class="drag-handle">
            <i class="pi pi-bars"></i>
        </div>
        <!-- index show -->
        <p class="node-index">{{ props.index + 1}}:</p>
        
        <!-- Action icon -->
        <Icon :icon="props.actionElement.icon" class="action-icon"/>
        
        <!-- Action content -->
        <div class="node-content">
            <p class="node-key">{{ props.actionElement.label }}</p>
            
            <!-- <p v-if="isCapturing">Capturing key press</p>
            <p v-if="props.actionElement.value === ''">Press to bind</p>
            <p v-else>{{ props.actionElement.value }}</p> -->
            <p
                :class="[{
                    'capturing-content': isThisActionCapturing,
                    'empty-value': props.actionElement.value === '' && !isThisActionCapturing,
                    'content-binded': props.actionElement.value !== '' && !isThisActionCapturing,
                    // 'content-binded-press': props.actionElement.value !== '' && !isThisActionCapturing && props.actionElement.actionCode === 'press-release',
                }, 'node-content-label']"
            >
                {{ displayText }}
            </p>

        </div>
        
        <!-- Remove button -->
        <Button class="delete-btn" @click="handleRemoveAction" icon="pi pi-times" outlined size="small"/>
    </div>
</template>

<style scoped>
.action-node{
    cursor: pointer;
}

.capturing-content{
    color: var(--green-dark);
}

.empty-value{
    color: var(--gray-main);
}

.content-binded{
    color: var(--primary-50);
}
/* 
.content-binded-press{
    color: var(--primary-100);
} */

</style>