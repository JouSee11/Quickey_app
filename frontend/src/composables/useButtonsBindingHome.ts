import { ref, computed } from 'vue'
import type { ButtonState, ButtonBindHome } from '@/types/buttonBindHome'

export const useButtons = (totalPages: number, buttonsPerPage: number) => {
    //state
    const allButtons = ref<ButtonBindHome[]>([])
    const currentPage = ref<number>(1)

    //initialize buttons
    const initButtons = () => {
        allButtons.value = []

        for (let i = 0; i <= totalPages * buttonsPerPage; i++) {
            allButtons.value.push({
                id: i;
                text: "Press to bind",
                state: "notBinded" as ButtonState
            })
        }
    }

    //get buttons for current page (computed is used to more havier operations that we dont want to do in the template)
    const currentPageButtons = computed(() => {
        const startIndex = (currentPage.value - 1) * buttonsPerPage
        const endIndex = startIndex + buttonsPerPage
        return allButtons.value.slice(startIndex, endIndex)
    })

    //page navigation
    const changePage = (pageNumber: number) => {
        currentPage.value = pageNumber % totalPages
    }

    const bindButton = () => {
        console.log("TODO");
        
    }

    const resetButton = () => {
        console.log("TODO");
        
    }

    return {
        allButtons,
        currentPage,
        currentPageButtons,
        
        changePage,
        bindButton,
        resetButton
    }
}