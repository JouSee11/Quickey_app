<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus';
import type { multiBindingAction } from '@/types/buttonBindHome';
import { Icon } from '@iconify/vue';
import { ref, watch } from 'vue';
import { useMultiBindingDialogStore } from '@/stores/multiBindingDialogStore';
import { storeToRefs } from 'pinia';

const multiBindingDialogStore = useMultiBindingDialogStore()
const { actionsBinded } = storeToRefs(multiBindingDialogStore)

//pass the actions to display
// interface Props{
//     actions: multiBindingAction[]
// }

// const props = defineProps<Props>()

// const emit = defineEmits<{
//     removeAction: [index: number]
//     actionsUpdated: [actions: multiBindingAction[]]
// }>()

const handleActionsChange = (newActions: multiBindingAction[]) => {
    console.log("actions change" + newActions);    
}

const handleRemoveAction = (index: number) => {
    // emit('removeAction', index)
    multiBindingDialogStore.removeAction(index)
}


</script>

<template>
    <div class="actions-display-cont">
        <!-- if there are no stats binded currentl -->
        <div v-if="actionsBinded.length === 0" class="action-drop-zone-empty">
            <Icon icon="material-symbols:no-sim-outline-rounded" width="24" height="24" />
            <p>Start draging actions to build an action sequence</p>
        </div>

        <VueDraggable
            v-model="actionsBinded"
            :group="{name: 'actions', pull: false, put: true}"
            class="action-sequence"
            :animation="200"
            @update:model-value="handleActionsChange"
        >
            <template #item="{ element, index }">
                <div class="action-node" :key="element.id">
                    <!-- Drag handle -->
                    <div class="drag-handle">
                        <i class="pi pi-bars"></i>
                    </div>
                    
                    <!-- Action icon -->
                    <i :class="element.icon" class="action-icon"></i>
                    
                    <!-- Action content -->
                    <div class="node-content">
                        <p class="node-name">{{ element.label }}</p>
                        <p class="node-content-key">{{ element.value }}</p>
                    </div>
                    
                    <!-- Remove button -->
                    <div class="delete-btn" @click="handleRemoveAction(index)">
                        <i class="pi pi-trash"></i>
                    </div>
                </div>
            </template>

        </VueDraggable>
    </div>

    <Button 
        label="log"
        @click="console.log(actionsBinded)"
    />
</template>

<style scoped>
.actions-display-cont {
    display: flex;
    flex-direction: column;
    align-items: start;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    flex-grow: 1;
    margin: 0;
    margin-right: 15px;
    height: 90%;
    background-color: var(--blue-dark);
    border-radius: var(--border-rad-smaller);
    padding: 10px 10px;
}

.drop-zone-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--gray-main);
    text-align: center;
    border: 2px dashed var(--primary-600);
    border-radius: var(--border-rad-main);
    opacity: 0.7;
    padding: 40px;
}

.drop-zone-icon {
    font-size: 3rem;
    margin-bottom: 10px;
}

.action-sequence {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 100px;
    width: 100%;
}

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
.ghost-action {
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
}

</style>