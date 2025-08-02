<script setup lang="ts">
import { useEditSaveDialog } from '@/composables/useKeybindingProfileEditDialog';
import { onBeforeMount, onMounted, ref, watch, computed } from 'vue';
import type { KeybindingDataSave } from '@/types/keybindingSaveTypes';
import RoundPageButton from '@/components/home_page/RoundPageButton.vue';
import HomeKnob from '@/components/home_page/HomeKnob.vue';
import { useMulitBindingImport } from '@/composables/useMultiBindingImport';
import { useKnobActionCategories } from '@/composables/useKnobActionCategories';

interface Props {
    keybidingData: KeybindingDataSave | null
}

const {findActionDefinition} = useMulitBindingImport()

const{isDialogVisible, hideDialog} = useEditSaveDialog()
const props = defineProps<Props>()

const totalPages = 3
const currentPage = ref(1)
const currentPageButtons = ref()

const getCurrentPageButtons = () => {
    //handle knob
    if (currentPage.value === (totalPages + 1)) {
        currentPageButtons.value = props.keybidingData?.keyBinding[27].value
        console.log(currentPageButtons.value)
    } else {
        const firstIndex = ((currentPage.value - 1) * 9) + 1
        const lastIndex = ((currentPage.value) * 9)
        const pageButtons = props.keybidingData?.keyBinding.filter(button => {
            return Number(button.id) >= firstIndex && Number(button.id) <= lastIndex;
        })
        currentPageButtons.value = pageButtons
    }
}

const getTextFromValue = (values: string[]) => {
    if (values.length === 0) return ''
    else if (values[0] === 'multi') {
        return 'multi'
    } else {
        return values.join(" + ")
    }
}

const getButtonState = (values: string[]) => {
    if (values.length === 0) return 'notBinded'
    else if (values[0] === 'multi') return 'multiBinding'
    return 'binded' 
}

const getKnobState = (values: string[]) => {
    if (values.every(value => value === '')) {
        return ''
    }
    return 'binded'
}

const changeBindingPage = (pageNum: number) => {
    currentPage.value = pageNum
    getCurrentPageButtons()
}

// const converValueForTooltip = (values: string[]) => {
//     const filteredValues = values.slice(1);
//     console.log("here:")
//     console.log(values)

//     // Map remaining values to their action definitions
//     filteredValues.forEach(value => {
//         value = value.split("_")[1]
//         console.log(value)
//         return findActionDefinition(value)?.label
//     });

//     console.log(filteredValues)
//     return filteredValues.join("\n");
// }
const convertValueForTooltip = (values: string[]): string => {
    if (!values || values.length <= 1) return ''
    
    const filteredValues = values.slice(1) // Remove 'multi' identifier
    
    if (filteredValues.length === 0) return 'Multi-binding (no actions)'
    
    const actionDescriptions = filteredValues.map((value, index) => {
        const parts = value.split("_")
        console.log(parts)
        if (parts.length >= 3) {
            const actionCode = parts[1]
            const actionValue = parts.slice(2).join('_') // In case value contains underscores
            const actionDef = findActionDefinition(actionCode)
            
            if (actionDef) {
                return `${index + 1}. ${actionDef.label}: ${actionValue}`
            }
            return `${index + 1}. ${actionCode}: ${actionValue}`
        }

        return `${index + 1}. ${value}`
    })
    
    return `Multi-binding:\n${actionDescriptions.join('\n')}`
}

const { rotateCategories, buttonCategories } = useKnobActionCategories()
// Simple knob tooltip function
const getKnobTooltip = (knobValues: string[]): string => {
    if (!knobValues || knobValues.length !== 3) return ''
    
    const [left, right, button] = knobValues
    const actions = []
    
    if (left) actions.push(`↪ Left: ${getActionLabel(left)}`)
    if (right) actions.push(`↩ Right: ${getActionLabel(right)}`)
    if (button) actions.push(`● Press: ${getActionLabel(button)}`)
    
    return actions.length ? actions.join('\n') : ''
}

// Find action label from categories
const getActionLabel = (value: string): string => {
    const allCategories = [...rotateCategories.value, ...buttonCategories.value]
    
    for (const category of allCategories) {
        const action = category.items.find(item => item.value === value)
        if (action) return action.label
    }
    
    return value // Return raw value if not found
}


watch(() => props.keybidingData, () => {
    //actions on the dialog
    currentPage.value = 1
    getCurrentPageButtons()
})


// ===== menu items ===========
//items in the menu
const leftMenuItems = computed(() => [
    {
        label: 'Actions',
        items: [
            {
                label: 'Use binding',
                icon: 'pi pi-times',
                command: () => {console.log("sdfsdf")}
            },
            {
                label: 'Send to device',
                icon: 'pi pi-file-import',
                command: () => {console.log("sdfsdf")}

            }
        ]
    }
])

</script>

<template>
    <Dialog
        v-model:visible="isDialogVisible"
        modal
        maximizable
        :header="`Edit - ${props.keybidingData?.name}`"
        :style="{width: '90%', height: '90%'}"
        @hide="hideDialog"
    >   
        <div class="dialog-content">
            <Menu
                :model="leftMenuItems"
            />

            <div class="keybindig-section">
                <Transition name="page-slide" mode="out-in">
                    <div class="buttons-container" :data-page="currentPage" :key="currentPage">
                        <ButtonBox
                            v-if="currentPage <= totalPages"
                            v-for="button in currentPageButtons"
                            :key="button.id"
                            :text="getTextFromValue(button.value)"
                            :state="getButtonState(button.value)"
                            :active-context-menu="null"
                            mode="read"
                            v-tooltip.right="{
                                value: convertValueForTooltip(button.value),
                                disabled: getButtonState(button.value) !== 'multiBinding',
                                pt: {
                                    text: { class: 'multi-binding-tooltip' }
                                }
                            }"
                        />

                        <HomeKnob
                            v-if="currentPage === (totalPages + 1)"
                            :state="getKnobState(currentPageButtons)"
                            class="knob-display"
                            :mode="'read'"
                            v-tooltip.right="{
                                value: getKnobTooltip(currentPageButtons),
                                disabled: getKnobState(currentPageButtons) !== 'binded',
                                pt: {
                                    text: {class: 'multi-binding-tooltip'}
                                }
                            }"
                        />

                    </div>
                </Transition>


                    
                    <div class="page-buttons">
                        <RoundPageButton
                            v-for="page in totalPages"
                            :key="page"
                            :number-display="page"
                            :enabled="true"
                            :data-page="page"
                            :class="{ active: currentPage === page }"
                            @click="changeBindingPage(page)"
                            :mode="'read'"
                        />
                        <!-- knob button -->
                        <RoundPageButton
                            :key="'knob'"
                            :number-display="'K'"
                            :enabled="true"
                            :icon="'pi pi-circle-fill'"
                            :class="[{ active: currentPage === (totalPages + 1)}, 'knob-page-btn']"
                            @click="changeBindingPage(totalPages+1)"
                            :mode="'read'"
                        />
                </div>
            </div>

        </div>

    </Dialog>


</template>

<style>

.dialog-content{
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 100%;
}

.keybinding-section{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.buttons-container{
    display: grid;
    height: 510px;
    width: 510px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
}

.page-buttons {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: row;
}

.knob-display {
    grid-column: 2;
    grid-row: 2;
}

/* Multi-binding tooltip styling */
.multi-binding-tooltip{
    width: 300px;
    border: var(--gray-main) 1px solid;
    
}

/* ============ transition animation between pages ========= */
.page-slide-enter-active,
.page-slide-leave-active {
    transition: all 0.2s ease-in-out;
}

.page-slide-enter-from {
    /* opacity: 0; */
    filter: brightness(1.3);
    /* transform: translateX(50px); */
    /* transform: scale(0.95); */
    
}

.page-slide-leave-to {
    /* opacity: 0; */
    /* transform: translateX(-50px); */
    filter: brightness(1.5);
    /* transform: scale(0.95); */
}

.page-slide-enter-to,
.page-slide-leave-from {
    opacity: 1;
    filter: brightness(1.0);
    /* transform: translateX(0); */
    transform: scale(1.0);
}
</style>