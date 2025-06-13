<script setup lang="ts">
import type { ActionNodeProps, ActionNodeEmits } from '@/types/buttonBindHome';

const props = defineProps<ActionNodeProps>()
const emit = defineEmits<ActionNodeEmits>()

const handleRemoveAction = () => {
    emit('remove', props.index)
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
        
        <!-- Action icon -->
        <i :class="props.actionElement.icon" class="action-icon"></i>
        
        <!-- Action content -->
        <div class="node-content">
            <p class="node-name">{{ props.actionElement.label }}</p>
            <p class="node-content-key">{{ props.actionElement.value }}</p>
            <p class="node-content-key">{{ props.index }}</p>

            <input :value="props.actionElement.value"/>
        </div>
        
        <!-- Remove button -->
        <div class="delete-btn" @click="handleRemoveAction">
            <i class="pi pi-trash"></i>
        </div>
    </div>
</template>

<style scoped>
/* Action nodes in sequence */
/* .action-node {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    width: 100%;
    height: 70px;
    position: relative;
    background-color: var(--primary-1000);
    color: var(--primary-0);
    border-radius: var(--border-rad-smaller);
    cursor: move;
    user-select: none;
    margin-bottom: 0;
    padding: 10px 20px;
    transition: all 0.2s ease;
    border: 2px solid transparent;
}

.action-node:hover {
    filter: brightness(1.1);
    border-color: var(--green-bright);
}

.drag-handle {
    margin-right: 15px;
    color: var(--gray-main);
    cursor: grab;
}

.drag-handle:active {
    cursor: grabbing;
}

.action-icon {
    font-size: var(--bigger-text);
    margin-right: 20px;
    color: var(--green-bright);
}

.node-content {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.node-name {
    font-size: var(--small-text);
    margin: 0;
    margin-bottom: 5px;
    color: var(--gray-main);
}

.node-content-key {
    color: var(--green-bright);
    margin: 0;
    font-family: monospace;
}

.delete-btn {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    padding: 8px;
    background-color: var(--red-dark);
    border-radius: var(--border-rad-smaller);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
}

.delete-btn:hover {
    filter: brightness(1.2);
    box-shadow: 0 0 15px rgba(255, 0, 0, 0.342);
}

/* Drag states */
/* .ghost-action {
    opacity: 0.5;
    background-color: var(--green-dark) !important;
    border: 2px dashed var(--green-bright) !important;
}

.chosen-action {
    transform: rotate(3deg);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.drag-action {
    transform: rotate(3deg);
    opacity: 0.8;
}   */
</style>