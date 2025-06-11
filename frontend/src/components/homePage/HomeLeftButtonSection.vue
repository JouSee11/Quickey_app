<script setup lang="ts">
import {ref, computed} from "vue"
import { useButtonBindStore } from '@/stores/buttonBindStore'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from "primevue/usetoast";
import { useDeviceStore } from "@/stores/deviceStore";
import { storeToRefs } from "pinia";
import type { ButtonBindHome } from "@/types/buttonBindHome";

const deviceStore = useDeviceStore()
const {isConnected} = storeToRefs(deviceStore)
const { importFromDevice } = deviceStore


const buttonStore = useButtonBindStore()
const confirm = useConfirm()
const toast = useToast()

//show the dialog to reset binding
const resetButtons = () => {
    confirm.require({
        message: "Do you want to delete all current bindings?",
        header: "Reset all button binding",
        icon: "pi pi-times",
        rejectProps: {
            label: "Cancel",
            outlined: true,
        },
        acceptProps: {
            label: "Yes",
            outlined: true,
            severity: 'warn'
        },
        accept: () => {
            buttonStore.resetAllButtons()
            toast.add({ severity: 'info', summary: 'Reseted', detail: 'All binding reseted', life: 2000 });
        },
        reject: () => {
            console.log("Reset canceled")
            // toast.add({ severity: 'info', summary: 'Canceled', detail: 'Reset canceled', life: 1000 });
        }
    })
}

const importData = async () => {
    //import data from the device    
    // const importedData = await importFromDevice()
    await importFromDevice()
    //format imported data
    // const formatedData: ButtonBindHome[] = []

    // importedData.array.forEach((buttonId: string) => {
    //     const id = Number(buttonId)
    //     const keyValues = importedData[buttonId]
    //     const state = keyValues ? 'binded' : 'notBinded';
    //     const buttonText = buttonStore.getButtonText(state)

    //     formatedData.push({
    //         id: id,
    //         text: buttonText,
    //         state: state,
    //         value: keyValues
    //     })
    // })

    // buttonStore.setButtons(formatedData)


}

//items in the menu
const items = computed(() => [
    {
        label: 'Controls',
        items: [
            {
                label: 'Reset',
                icon: 'pi pi-refresh',
                command: resetButtons
            },
            {
                label: 'Import from device',
                icon: 'pi pi-file-import',
                disabled: !isConnected.value,
                command: importData
            },
            {
                label: 'Save preset',
                icon: 'pi pi-save',
                disabled: true
            }
        ]
    }
])

</script>

<template>
    <div id="left-section">
        <div class="card flex justify-center">
            <Toast />
            <ConfirmDialog/>
            <Menu :model="items" id="binding-controlls-menu" class="box-shadow-normal"/>
        </div>

    </div>
</template>

<style scoped>

:deep(#binding-controlls-menu .pi){
    color: var(--primary-50);    
}



</style>