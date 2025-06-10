import { defineStore } from "pinia";
import { ref } from "vue";
import type { ButtonState, ButtonBindHome, KnobBindHome } from "@/types/buttonBindHome";

export const useButtonBindStore = defineStore("buttonBind", () => {
    //states
    const allButtons = ref<ButtonBindHome[]>([])
    const currentPage = ref<number>(1)
    const totalPages = ref<number>(3)
    const buttonsPerPage = ref<number>(9)
    
    const showKnob = ref<number>(1)
    const knobElement = ref<KnobBindHome>()

    //function to determine the button text based on the state of the button
    const getButtonText = (state: ButtonState, customText?: string): string => {
        switch (state) {
            case 'notBinded':
                return 'Press to bind'
            case 'listening':
                return 'Capturing key press'
            case 'binded':
                return customText || 'Binded'
            case 'multiBinding':
                return 'multi'
            default:
                return 'unknown state'
        }
    }

    const resetAllButtons = () => {
        allButtons.value.forEach(button =>  {
            button.state = 'notBinded'
            button.text = getButtonText('notBinded')
            button.value = []
        })

        knobElement.value = {state: "notBinded", value: []}
    }

    const setCurrentPage = (page: number) => {
        currentPage.value = page
        console.log('page changed');
    }

    const incrementPage = () => {
        if (currentPage.value + 1 > totalPages.value) {
            currentPage.value = 1
        } else {
            currentPage.value++
        }

    }

    //used then importing data from device
    const setButtons = (buttons: ButtonBindHome[]) => {
        allButtons.value = buttons
    }

    const setKnob = (knob: KnobBindHome) => {
        knobElement.value = knob 
    }

    //update button when it is being binded
    const updateButton = (buttonId: number, updates: Partial<ButtonBindHome>) => {
        const button = allButtons.value.find(b => b.id === buttonId)
        if (button) {
            // If state is being updated but no text provided, use default
            if (updates.state && !updates.text) {
                updates.text = getButtonText(updates.state, updates.text)
            }
            Object.assign(button, updates)
        }
    }

    return {
        allButtons,
        currentPage,
        totalPages,
        buttonsPerPage,
        showKnob,
        knobElement,

        resetAllButtons,
        setCurrentPage,
        setButtons,
        updateButton,
        getButtonText,
        incrementPage,
        setKnob
    }
})