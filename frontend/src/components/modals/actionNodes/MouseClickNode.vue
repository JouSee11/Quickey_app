<script setup lang="ts">
import type { ActionNodeProps, ActionNodeEmits } from '@/types/buttonBindHome';
import { Icon } from '@iconify/vue';
import { ref, watch, onMounted } from 'vue';

const props = defineProps<ActionNodeProps>()
const emit = defineEmits<ActionNodeEmits>()

const handleRemoveAction = () => {
    emit('remove', props.index)
}

onMounted(() => {
    if (props.actionElement.value === '') props.actionElement.value = 'left'
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
                <Select v-model="props.actionElement.value" :options="['left', 'right', 'middle']" size="small" class="node-content-select"/>
                <p>click</p>
            </div>
        </div>
        
        <!-- Remove button -->
        <Button class="delete-btn" @click="handleRemoveAction" icon="pi pi-times" outlined size="small"/>
    </div>
</template>

<style scoped>
.node-content-controls{
    display: flex;
}

.node-content-controls p {
    color: var(--gray-main);
}


:deep(.node-content-select) {
    height: 30px;
    width: 150px;
    margin-right: 20px;
}

</style>