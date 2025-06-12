import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { multiBindingAction } from '@/types/buttonBindHome'

export const useMultiBindingDialogStore = defineStore('dialog', () => {
    // State
    const isVisible = ref(false)
    const activeButtonId = ref<number | null>(null)
    const actionsBinded = ref<multiBindingAction[]>([])

    // Getters
    const dialogTitle = computed(() => 
        activeButtonId.value ? `Multi-key binding - Key ${activeButtonId.value}` : 'Multi-key binding'
    )
    
    const hasActions = computed(() => actionsBinded.value.length > 0)

    // Actions
    const openDialog = (buttonId: number) => {
        console.log("Opening dialog for button:", buttonId)
        activeButtonId.value = buttonId
        actionsBinded.value = [] // reset actions on open
        isVisible.value = true
    }

    const closeDialog = () => {
        console.log("Closing dialog")
        isVisible.value = false
        activeButtonId.value = null
        actionsBinded.value = []
    }

    const addAction = (action: multiBindingAction) => {
        actionsBinded.value.push(action)
    }

    const removeAction = (index: number) => {
        actionsBinded.value.splice(index, 1)
    }

    return {
        // State
        isVisible,
        activeButtonId,
        actionsBinded,
        // Getters
        dialogTitle,
        hasActions,
        // Actions
        openDialog,
        closeDialog,
        addAction,
        removeAction
    }
})