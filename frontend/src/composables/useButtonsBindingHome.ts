import { ref, computed, onMounted } from 'vue'
import type { ButtonState, ButtonBindHome, KnobBindHome } from '@/types/buttonBindHome'
import { useButtonBindStore } from '@/stores/buttonBindStore'
import { button } from '@primeuix/themes/aura/inputnumber'
import { useKeyCapture } from '@/composables/useKeyCapture'

export const useButtons = () => {
    const store = useButtonBindStore()
    const { startCapturing, stopCapturing, capturing, capturingButton } = useKeyCapture()

    // Computed values (derived state)
    const currentPageButtons = computed(() => {
        const startIndex = (store.currentPage - 1) * store.buttonsPerPage
        const endIndex = startIndex + store.buttonsPerPage
        return store.allButtons.slice(startIndex, endIndex)
    })

    //initialize buttons on startup
    const initButtons = () => {
        const buttons: ButtonBindHome[] = []
        // Fix: Start from 1, not 0
        for (let i = 1; i <= store.totalPages * store.buttonsPerPage; i++) {
            buttons.push({
                id: i,
                text: store.getButtonText('notBinded'),
                state: "notBinded" as ButtonState,
                value: []
            })
        }
        store.setButtons(buttons)
    }

    const initKnob = () => {
        if (store.showKnob) {
            const knob: KnobBindHome = {state: "notBinded", value: []}
            store.setKnob(knob)
        }
    }




    //page navigation
    const changePage = (pageNumber: number) => {        
        store.setCurrentPage(pageNumber)
    }

    
    const bindButtonValue = (buttonId: number, text: string, value: string[]) => {
        store.updateButton(buttonId, {
            state: 'binded',
            text: text,
            value: value
        })
    }

    const listeningButton = (buttonId: number) => {
        //diable listening on all other buttons
        stopListeningAll()
        store.updateButton(buttonId, {
            state: 'listening',
        })

        startCapturing(buttonId)
    }

    const stopListeningAll = () => {
        //stop key capturing
        stopCapturing()

        store.allButtons.forEach(btn => {
            if (btn.state === 'listening') {
                store.updateButton(btn.id, {state: 'notBinded'})
            }
        })
    }

    //reset one button
    const resetButton = (buttonId: number) => {


        store.updateButton(buttonId, {
            state: 'notBinded',
            value: []
        })
    }

    const changePageTabClick = (e: KeyboardEvent) => {
        // console.log(e.code);

        
        if (e.code === "Tab") {
            e.stopPropagation()
            
            store.incrementPage()
        }
    }

    onMounted(() => {
        document.addEventListener('keydown', changePageTabClick)
    })

    return {
        allButtons: computed(() => store.allButtons),
        currentPage: computed(() => store.currentPage),
        totalPages: computed(() => store.totalPages),
        showKnob: computed(() => store.showKnob),
        knobElement: computed(() => store.knobElement),
        currentPageButtons,

        
        initButtons,
        changePage,
        bindButtonValue,
        listeningButton,
        initKnob,
        resetButton
        // resetButton
    }
}