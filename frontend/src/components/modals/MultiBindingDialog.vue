<script setup lang="ts">
import { useMultiBindingDialogStore } from '@/stores/multiBindingDialogStore';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue'

const emit = defineEmits<{
    save: [buttonId: number, actions: any[]]
}>()

const multiBindingDialogStore = useMultiBindingDialogStore()

const {isVisible, activeButtonId, dialogTitle, hasActions} = storeToRefs(multiBindingDialogStore)
const {closeDialog} = multiBindingDialogStore

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
        
        <div class="actions-display-cont">
        </div>

        <div class="actions-select-cont">

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
        </div>
        

    </Dialog>

</template>


<style scoped>


.actions-display-cont{
    display: flex;
    flex-direction: column;
    align-items: start;
    position: relative;

    /* Change these properties */
    overflow-y: auto;  /* Change to auto for better behavior */
    overflow-x: hidden;  /* Prevent horizontal scroll */

    /* width: 60%; */
    flex-grow: 1;
    margin: 0;
    margin-right: 15px;
    height: 90%;
    background-color: var(--blue-dark);
    border-radius: var(--border-rad-smaller);

    padding: 10px 10px;
}

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