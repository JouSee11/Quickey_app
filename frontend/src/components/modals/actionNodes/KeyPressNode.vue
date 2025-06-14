<script setup lang="ts">
import { useActionKeyCapture } from '@/composables/useMultiKeyActionCapture';
import { useMultiBindingDialogStore } from '@/stores/multiBindingDialogStore';
import type { ActionNodeProps, ActionNodeEmits } from '@/types/buttonBindHome';
import { computed } from 'vue';

const props = defineProps<ActionNodeProps>()
const emit = defineEmits<ActionNodeEmits>()

const { startActionCapture, isCapturing, capturingActionId} = useActionKeyCapture()
const store = useMultiBindingDialogStore()

const isThisActionCapturing = computed(() => {
    isCapturing.value && capturingActionId.value === props.actionElement.id
})

const handleRemoveAction = () => {
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
    >
        <!-- Drag handle -->
        <div class="drag-handle">
            <i class="pi pi-bars"></i>
        </div>
        <!-- index show -->
        <p class="node-index">{{ props.index + 1}}:</p>
        
        <!-- Action icon -->
        <i :class="props.actionElement.icon" class="action-icon"></i>
        
        <!-- Action content -->
        <div class="node-content" @click="handleStartCapture">
            <p class="node-key">{{ props.actionElement.label }}</p>
            
            <p v-if="isCapturing">Capturing key press</p>
            <p v-if="props.actionElement.value === ''">Press to bind</p>
            <p v-else>{{ props.actionElement.value }}</p>

        </div>
        
        <!-- Remove button -->
        <Button class="delete-btn" @click="handleRemoveAction" icon="pi pi-times" outlined size="small"/>
    </div>
</template>

<style scoped>

</style>