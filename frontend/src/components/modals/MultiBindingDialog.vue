<script setup lang="ts">
import { useActionCategories } from '@/composables/useActionCategories';
import { useMultiBindingDialogStore } from '@/stores/multiBindingDialogStore';
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
        <div class="multi-dialog-container">
            <!-- Left side - Actions display (Drop zone) -->
            <ActionsDisplay
            />

            <!-- Right side - Actions selection (Drag source) -->
            <ActionsSelection
                class="actions-select-cont"
            />

            <!-- controls buttons -->
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
            </div>
        </div>

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

.multi-dialog-container{
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
}


.control-buttons-dialog{
    position: absolute;
    right: 0;
    bottom: 0;
}

.control-button-dialog{
    margin-right: 20px;
}

.dialog-save-button{
    color: var(--green-dark);
}




</style>