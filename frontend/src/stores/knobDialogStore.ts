import { defineStore } from "pinia";
import { ref } from "vue";

export const useKnobDialogStore = defineStore('knobDialog', () => {
    const isVisible = ref(false)

    const openDialog = () => {
        isVisible.value = true
    }

    const closeDialog = () => {
        isVisible.value = false
    }

    return {
        isVisible,
        openDialog,
        closeDialog
    }
})