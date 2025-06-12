<script setup lang="ts">
import { useMutliBindingDialog } from '@/composables/useMultiBindingDialog';
import { ref, watch } from 'vue'

const emit = defineEmits<{
    save: [buttonId: number, actions: any[]]
}>()

const {
    isVisible,
    activeButtonId,
    actionsBinded,
    dialogTitle,
    hasActions,
    openDialog,
    closeDialog
} = useMutliBindingDialog()







</script>


<template>
    <Transition name="modal">
        <Dialog 
            v-model:visible="isVisible"
            modal
            class="multi-binding-dialog"
            @close="closeDialog"
        >
            <p>{{ activeButtonId }}</p>
        </Dialog>
    </Transition>

</template>


<style scoped>
</style>