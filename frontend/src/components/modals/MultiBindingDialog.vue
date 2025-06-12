<script setup lang="ts">
import { useActionCategories } from '@/composables/useActionCategories';
import { useMultiBindingDialogStore } from '@/stores/multiBindingDialogStore';
import type { multiBindingAction } from '@/types/buttonBindHome';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue'
import ActionsDisplay from '@/components/modals/ActionsDisplay.vue';
import ActionsSelection from '@/components/modals/ActionsSelection.vue';

const emit = defineEmits<{
    save: [buttonId: number, actions: any[]]
}>()

const multiBindingDialogStore = useMultiBindingDialogStore()
const { categories } = useActionCategories()

const {isVisible, activeButtonId, dialogTitle, hasActions, actionsBinded} = storeToRefs(multiBindingDialogStore)
const {closeDialog, addAction, removeAction} = multiBindingDialogStore

const handleActionClick = (actionType: string) => {
    // Find the action definition
    const action = categories.value
        .flatMap(cat => cat.actions)
        .find(act => act.actionType === actionType)
    
    if (!action) return

    // Create action data - fix the typo
    const actionData: multiBindingAction = {
        id: `${action.actionType}-${Date.now()}`,
        name: action.label,
        value: action.requiresInput ? 'Not configured' : action.label,
        position: 0  // Fixed typo from "postion" to "position"
    }

    addAction(actionData)
}

const handleActionsUpdated = (newActions: multiBindingAction[]) => {
    multiBindingDialogStore.actionsBinded = newActions
}

const handleSave = () => {
    emit('save', activeButtonId.value!, actionsBinded.value)
    closeDialog()
}

</script>


<template>
    <Dialog 
        v-model:visible="isVisible"
        modal
        class="multi-binding-dialog"
        @hide="closeDialog"
        :style="{ width: '70%', height: '80%' }"
        :header="dialogTitle"
    >
        <!-- Main content container -->
        <div class="dialog-container">
            <!-- Left side - Actions display (Drop zone) -->
            <ActionsDisplay
                :actions="actionsBinded"
                @remove-action="removeAction"
                @actions-updated="handleActionsUpdated"
            />

            <!-- Right side - Actions selection (Drag source) -->
            <ActionsSelection
                @action-click="handleActionClick"
            />
        </div>

        <!-- Footer buttons -->
        <template #footer>
            <Button 
                :class="['control-button-dialog', 'dialog-save-button']" 
                outlined
                icon="pi pi-file-check"
                label="Save"
                @click="handleSave"
            />
            <Button 
                :class="['control-button-dialog', 'dialog-cancel-button']" 
                outlined
                label="Cancel"
                icon="pi pi-times-circle"
                @click="closeDialog"
            />
        </template>


        <!-- <div class="actions-select-cont">

        </div>

        <div class="control-buttons-dialog">
            <Button 
                :class="['control-button-dialog', 'dialog-save-button']" 
                outlined
                icon="pi pi-file-check"
                label="Save"

            />
            <Button 
                :class="['control-button-dialog', 'dialog-cancel-button']" 
                outlined
                label="Cancel"
                icon="pi pi-times-circle"
                @click="closeDialog"
            />
        </div> -->
        

    </Dialog>

</template>


<style scoped>

.actions-select-cont{
    display: flex;
    flex-direction: column;
    align-items: center;

    position: relative;


    width: 35%;
    max-width: 350px;
    height: 90%;
    
    /* Change these properties */
    overflow-y: auto;  /* Change to auto for better behavior */
    overflow-x: hidden;  /* Prevent horizontal scroll */

    background-color: var(--primary-800);
    margin: 0;
    margin-left: 15px;
    border-radius: var(--border-rad-smaller);

    padding: 10px 10px;
}

.control-buttons-dialog{
    position: absolute;
    right: 0;
    bottom: 30px;
}

.control-button-dialog{
    margin-right: 20px;
}

.dialog-save-button{
    color: var(--green-dark);
}


</style>