import {ref, computed } from 'vue'
import type { multiBindingAction } from '@/types/buttonBindHome'


export const useMutliBindingDialog = () => {
    //states
    const isVisible = ref(false)
    const activeButtonId = ref<any>(null)
    const actionsBinded = ref<multiBindingAction[]>([])

    //computed values
    const dialogTitle = computed(() => 
        activeButtonId.value ? `Multi-key binding - Key ${activeButtonId}` : 'Brotha ufffff' 
    )
    const hasActions = computed(() => actionsBinded.value.length > 0)

    const openDialog = (buttonId: number) => {
        activeButtonId.value = buttonId
        actionsBinded.value = [] //reset actions on open
        isVisible.value = true
    }

    const closeDialog = () => {
        isVisible.value = false
        activeButtonId.value = null
        actionsBinded.value = []
    }


    //TODO add other functions


    return {
        isVisible,
        activeButtonId,
        actionsBinded,
        dialogTitle,
        hasActions,

        openDialog,
        closeDialog
    }


}