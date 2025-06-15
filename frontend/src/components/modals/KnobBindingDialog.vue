<script setup lang="ts">
import { useKnobDialogStore } from '@/stores/knobDialogStore';
import { storeToRefs } from 'pinia';
import { Icon } from '@iconify/vue';

const store = useKnobDialogStore()
const {isVisible} = storeToRefs(store)

</script>

<template>
    <Dialog
        v-model:visible="isVisible"
        modal
        header="Knob binding"
        :style="{width: '60%', height: '300px'}"
        @hide="store.closeDialog"
    >
        <div class='knob-dialog-content'>
            <div class="dialog-content-section">
                <p class="section-header"><Icon icon="material-symbols:rotate-left" class="section-icon"/>Rotate left</p>
                <Select class="knob-select">

                </Select>
            </div>

            <div class="dialog-content-section">
                <p class="section-header"><Icon icon="material-symbols:rotate-right" class="section-icon"/>Rotate right</p>
                <Select class="knob-select">

                </Select>
            </div>

            <div class="dialog-content-section">
                <p class="section-header"><Icon icon="tdesign:gesture-click-filled" class="section-icon"/> Knob button</p>
                <Select class="knob-select">

                </Select>
            </div>
        </div>
    </Dialog>

</template>

<style scoped>


.knob-dialog-content{
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 10px 30px;
}

.dialog-content-section{
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 25%;
}

.section-icon{
    width: 25px;
    height: 25px;
    margin-right: 10px;
}

.section-header{
    display: flex;
    text-align: center;
    align-items: center;
    margin-bottom: 20px;
}

.knob-select{
    width: 100%;
}

</style>