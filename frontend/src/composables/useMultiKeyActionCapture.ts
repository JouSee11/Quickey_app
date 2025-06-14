import {ref, onMounted, onUnmounted, computed} from 'vue'
import { useMultiBindingDialogStore } from '@/stores/multiBindingDialogStore'

export const useActionKeyCapture = () => {
    const store = useMultiBindingDialogStore()

    const handleKeyDown = (event: KeyboardEvent) => {
        if (!store.capturingKeyPress || !store.capturingActionId) return // dont handle keydown when not listening

        event.preventDefault()
        event.stopPropagation()

        const capturedCode = event.code
        store.handleKeyCapture(capturedCode)

        // store.capturingCurrentKey = capturedCode
    }

    const handleClickOut = (event: MouseEvent) => {
        if (!store.capturingKeyPress) return

        const target = event.target as HTMLElement
        if (!target.closest('.action-node') && !target.closest('.capture-button')) {
            store.stopCapturing()
        }
    }

    onMounted(() => {
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('click', handleClickOut)
    })

    onUnmounted(() => {
        document.removeEventListener('keydown', handleKeyDown)
        document.removeEventListener('click', handleClickOut)
    })

    return {
        startActionCapture: store.startCapturing,
        stopActionCapture: store.stopCapturing,
        isCapturing: computed(() => store.capturingKeyPress),
        capturingActionId: computed(() => store.capturingActionId),
    }
}