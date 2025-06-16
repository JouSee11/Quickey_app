<script setup lang="ts">
import type { ActionNodeProps, ActionNodeEmits } from '@/types/buttonBindHome';
import { Icon } from '@iconify/vue';

const props = defineProps<ActionNodeProps>()
const emit = defineEmits<ActionNodeEmits>()

const handleRemoveAction = () => {
    emit('remove', props.actionElement.id)
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
            <i class="pi pi-bars icon-drag"></i>
        </div>
        <!-- index show -->
        <p class="node-index">{{ props.index + 1}}:</p>
        
        <!-- Action icon -->
        <Icon :icon="props.actionElement.icon" class="action-icon"/>
        
        <!-- Action content -->
        <div class="node-content">
            <p class="node-key">{{ props.actionElement.value }}</p>
            <p class="node-content-label">{{ props.actionElement.label }}</p>
        </div>
        
        <!-- Remove button -->
        <Button class="delete-btn" @click="handleRemoveAction" icon="pi pi-times" outlined size="small"/>
    </div>
</template>

<style>
/* Action nodes in sequence */
.action-node {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    width: 100%;
    height: 70px;
    position: relative;
    background-color: var(--primary-1000);
    color: var(--primary-0);
    border-radius: var(--border-rad-smaller);
    user-select: none;
    margin-bottom: 0;
    padding: 10px 20px;
    border: 1px solid transparent;
}

.action-node:hover {
    filter: brightness(1.1);
    border-color: var(--green-bright);
    transition: border 0.1s ease-in-out;
}

.action-node:hover .action-icon{
    color: var(--green-bright);
}

.drag-handle {
    display: flex;
    align-items: center;
    /* margin-right: 10px; */
    width: 30px;
    height: 100%;
    color: var(--gray-main);
    cursor: grab;
    text-align: center;
}


.drag-handle:active {
    cursor: grabbing;
}

.node-index{
    color: var(--gray-main);
    margin-right: 10px;
}

.action-icon {
    font-size: var(--bigger-text);
    margin-right: 15px;
    color: var(--primary-0);
    transition: color 0.1s ease-in-out;
}

.node-content {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.node-key {
    font-size: var(--small-text);
    margin: 0;
    margin-bottom: 5px;
    color: var(--gray-main);
}

.node-content-label {
    color: var(--primary-0);
    font-size: var(--normal-text);
    margin-bottom: 10px;
}

.delete-btn {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-70%);
    padding: 5px;
    border-radius: var(--border-rad-smaller);
    color: var(--red-dark) !important;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
}

.delete-btn:hover {
    filter: brightness(1.2);
    box-shadow: 0 0 15px rgba(255, 0, 0, 0.342);
    color: var(--primary-1000);
}



/* === DRAGABLE ANIMATIONS ==== */
.ghost-action {
    opacity: 0.3 !important;
    background-color: var(--green-dark) !important;
    border: 2px dashed var(--green-bright) !important;
}

.chosen-action {
    transform: scale(1.01) !important;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4) !important;
    z-index: 1000 !important;
}

.drag-action {
    opacity: 0.9 !important;
    z-index: 1000 !important;
} 
</style>