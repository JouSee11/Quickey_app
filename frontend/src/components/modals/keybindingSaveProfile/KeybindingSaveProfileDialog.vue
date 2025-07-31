<script setup lang="ts">
import { useEditSaveDialog } from '@/composables/useKeybindingProfileEditDialog';
import { onBeforeMount, onMounted, ref, watch } from 'vue';
import type { KeybindingDataSave } from '@/types/keybindingSaveTypes';

interface Props {
    keybidingData: KeybindingDataSave | null
}

const{isDialogVisible, hideDialog} = useEditSaveDialog()
const props = defineProps<Props>()

const currentPage = ref(1)
const currentPageButtons = ref()

const getCurrentPageButtons = () => {
    const firstIndex = ((currentPage.value - 1) * 9) + 1
    const lastIndex = ((currentPage.value) * 9)
    const pageButtons = props.keybidingData?.keyBinding.filter(button => {
        return Number(button.id) >= firstIndex && Number(button.id) <= lastIndex;
    })

    return pageButtons

}

watch(() => props.keybidingData, () => {
    currentPageButtons.value = getCurrentPageButtons()
})
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
        <div class="buttons-container">
            <ButtonBox
                v-for="button in currentPageButtons"
                :key="button.id"
                :text="button.id"
                :state="button.value.length > 0 ? 'binded' : ''"
                :active-context-menu="null"
            />
        </div>

    </Dialog>


</template>

<style>
.buttons-container{
    display: grid;
    min-height: 510px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
}

</style>