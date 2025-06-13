<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus';
import type { MultiBindingAction } from '@/types/buttonBindHome';
import { Icon } from '@iconify/vue';
import { ref, watch} from 'vue';
import { useMultiBindingDialogStore } from '@/stores/multiBindingDialogStore';
import { storeToRefs } from 'pinia';
import type { DefineComponent } from 'vue';

//import all possible action node components
import DefaultActionNode from '@/components/modals/actionNodes/DefaultActionNode.vue';
import WriteActionNode from '@/components/modals/actionNodes/WriteActionNode.vue';

//map special action actionCode to special components (dont need to specify those that dont reqire any input)
const mapActionComponents: Record<string, any> = {
    write: WriteActionNode
}  
const getActionComponent = (actionCode: string) => {
    return mapActionComponents[actionCode] || DefaultActionNode
}

const multiBindingDialogStore = useMultiBindingDialogStore()
const { actionsBinded } = storeToRefs(multiBindingDialogStore)

const handleActionsChange = (newActions: MultiBindingAction[]) => {
    console.log(newActions);    
}

const handleRemoveAction = (index: number) => {
    // emit('removeAction', index)
    multiBindingDialogStore.removeAction(index)
}


</script>

<template>
    <div class="actions-display-cont">

         <!-- if there are no stats binded currentl -->
        <div v-if="actionsBinded.length === 0" class="action-drop-zone-empty-text">
            <Icon icon="material-symbols:no-sim-outline-rounded" width="40" height="40" />
            <p>Start draging actions to build an action sequence</p>
        </div>

        <VueDraggable
            v-model="actionsBinded"
            :group="{name: 'actions', pull: false, put: true}"
            class="action-sequence"
            :scroll="true"

            @update:model-value="handleActionsChange"
            
            :animation="300"
            :delay="0"
            :delay-on-touch-start="50"
            ghost-class="ghost-action"
            chosen-class="chosen-action"
            drag-class="drag-action"
            move-class="draggable-move"
            handle=".drag-handle"
        >

            <!-- <DefaultActionNode
                v-for="(element, index) in actionsBinded"
                :index="index"
                :action-element="element"
                @remove="handleRemoveAction"
            /> -->
  
            <component 
                v-for="(element, index) in actionsBinded"
                :is="getActionComponent(element.actionCode)"
                :action-element="element"
                :index="index"
                :key="element.id"
                @remove="handleRemoveAction"
            />


            <!-- main template for displaying the actions -->
            <!-- <div
                v-for="(element, index) in actionsBinded"
                class="action-node"
                :key="element.id"
            >
                <div class="drag-handle">
                    <i class="pi pi-bars"></i>
                </div>
                
                <i :class="element.icon" class="action-icon"></i>
                
                <div class="node-content">
                    <p class="node-name">{{ element.label }}</p>
                    <p class="node-content-key">{{ element.value }}</p>
                </div>
                
                <div class="delete-btn" @click="handleRemoveAction(index)">
                    <i class="pi pi-trash"></i>
                </div>
            </div> -->

        </VueDraggable>
    </div>
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
    height: 100%;
}

.action-drop-zone-empty-text{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: var(--gray-main);
    font-size: var(--bigger-text);
}



/* ===== for animation =====  */

.ghost-action {
    opacity: 0.3 !important;
    background-color: var(--green-dark) !important;
    border: 2px dashed var(--green-bright) !important;
    /* transform: scale(1.) !important; */
}

.chosen-action {
    transform: scale(1.01) !important;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4) !important;
    z-index: 1000 !important;
}

.drag-action {
    /* transform: rotate(5deg) scale(1.02) !important; */
    opacity: 0.9 !important;
    z-index: 1000 !important;
}

/* ✅ Smooth reordering animation */
.action-node:not(.chosen-action):not(.drag-action) {
    transition: transform 0.3s ease !important;
}

.action-sequence .action-move {
  transition: transform 0.3s ease;
}

</style>