<script setup lang="ts">
import ButtonBox from "@/components/homePage/ButtonBox.vue"
import RoundPageButton from "@/components/homePage/RoundPageButton.vue"
import {onMounted, toRaw, watch} from "vue"
import {useButtons} from "@/composables/useButtonsBindingHome"
import type { ButtonState } from "@/types/buttonBindHome"
import { Button } from "primevue"
import { Icon } from '@iconify/vue'
import {ref} from 'vue'
import { list } from "@primeuix/themes/aura/autocomplete"
import { button } from "@primeuix/themes/aura/inputnumber"
import HomeKnob from "@/components/homePage/HomeKnob.vue"
import { useDeviceStore } from "@/stores/deviceStore"
import { storeToRefs } from "pinia"
import type { ButtonBindHome } from "@/types/buttonBindHome"
import MultiBindingDialog from "@/components/modals/multiBinding/MultiBindingDialog.vue"
import { useMultiBindingDialogStore } from "@/stores/multiBindingDialogStore"
import KnobBindingDialog from "@/components/modals/knobBinding/KnobBindingDialog.vue"
import { useKnobDialogStore } from "@/stores/knobDialogStore"

//use the composable functoins
const {
    allButtons,
    currentPage,
    currentPageButtons,
    initButtons,
    resetKnob,
    changePage,
    bindButtonValue,
    listeningButton,
    totalPages,
    showKnob,
    knobElement,
    resetButton,
    getButtonValue
    
} = useButtons()

const deviceStore = useDeviceStore()
const {
    isConnected,
    connectionStatus,
} = storeToRefs(deviceStore)
const {
    connect,
    disconnect,
    sendToDevice
} = deviceStore

const multiBindingDialogStore = useMultiBindingDialogStore()

// init buttons when componets are visible
onMounted(() => {
    initButtons()
    // initKnob()
})



const handleBindButton = (buttonId: number) => {
    //start listening on the button
    listeningButton(buttonId)
}

const handleResetButton = (buttonId: number) => {
    resetButton(buttonId)
}

const toggleConnect = async () => {
    console.log(isConnected.value);
    
    
    if (!isConnected.value) {
        await connect()
    } else {
        await disconnect()
    }

}


const saveDataToDevice = async () => {
    if (!isConnected.value) return //dont send if the device is not connected

    //convert data form the buttons to specified structure
    const dataToSend: Record<string, string[]> = {}

    //add buttons
    allButtons.value.forEach((btn: ButtonBindHome) => {
        // Convert reactive array to plain array using toRaw or spread operator
        dataToSend[String(btn.id)] = toRaw(btn.value)
    })

    //add knob data
    dataToSend['knob'] = [knobElement.value.values.left, knobElement.value.values.right, knobElement.value.values.button] 

    await sendToDevice(dataToSend)
}

//context menu actions
const contextMenu = ref()
const activeButtonContext = ref<any>(null)
const showMultiBindingDialog = ref<boolean>(false)
const buttonForMultibinding = ref<any>(null)

const menuItems = ref([
    {
        label: 'Multi-key',
        icon: 'pi pi-pencil',
        command: () => {
            multiBindingDialogStore.openDialog(activeButtonContext.value)
        }
    },
    { 
        label: 'Delete',
        icon: 'pi pi-times',
        command: () => {
            handleResetButton(activeButtonContext.value)
        }
    }
])

const handleContextMenu = (buttonId: number, event: MouseEvent) => {
    activeButtonContext.value = buttonId
    contextMenu.value.show(event)
}

// === KNOB ===
const knobDialogStore = useKnobDialogStore()


</script>

<template>
    <div id="center-section">

         <MultiBindingDialog/>
         <KnobBindingDialog />

        <div id="connection-cont">
            <div 
                id="connection-icon"
                :class="{
                    'connected': connectionStatus === 'connected',
                    'disconnected': connectionStatus === 'disconnected',
                    'connecting': connectionStatus === 'connecting',
                    'error': connectionStatus === 'error'
                }"
            />
            <p id="connection-msg">
                {{
                    connectionStatus === 'connected' ? 'Connected'
                    : connectionStatus === 'disconnected' ? 'Disconnected'
                    : connectionStatus === 'connecting' ? 'Connecting...'
                    : connectionStatus === 'error' ? 'Error'
                    : ''
                }}
            </p>
            <Button 
                type="submit" 
                id="connect-button"
                rounded
                variant="outlined"
                :class="{
                    'connected': connectionStatus === 'connected',
                    'disconnected': connectionStatus === 'disconnected',
                    'connecting': connectionStatus === 'connecting',
                    'error': connectionStatus === 'error'
                }"
                @click="toggleConnect"
            >
                {{isConnected ? 'Disconnect' : 'Connect'}}
            </Button>
        </div>
        
        <!-- main buttons display -->
        <div id="buttons-container" :data-page="currentPage">
            <ButtonBox 
                v-for="button in currentPageButtons"
                :key="button.id"
                :button-id="button.id"
                :text="button.text"
                :state="button.state"
                :active-context-menu="activeButtonContext"
                @bind-button="handleBindButton"
                @context-menu="handleContextMenu"
            />

            <HomeKnob 
                v-if="showKnob && knobElement && currentPage === totalPages + 1"
                :state="knobElement.state"
                @open-dialog="knobDialogStore.openDialog"
            />

             <ContextMenu ref="contextMenu" :model="menuItems" @hide="activeButtonContext = null"/>
        </div>

                    
        <!-- page numbers display -->
        <div id="pages-switch-cont">
            <div class="main-page-buttons">
                <RoundPageButton
                    v-for="page in totalPages"
                    :key="page"
                    :number-display="page"
                    :enabled="true"
                    :class="{ active: currentPage === page }"
                    @click="changePage(page)"
    
                />
            </div>
            <!-- <Icon icon="mdi:knob" class="icon-knob" />  -->
            <RoundPageButton
                v-if="showKnob"
                :key="'knob'"
                :number-display="'K'"
                :enabled="true"
                :icon="'pi pi-circle-fill'"
                :class="[{ active: currentPage === (totalPages+1)}, 'knob-page-btn']"
                @click="changePage(totalPages+1)"
            />
        
        </div>

        <!-- save button -->
        <Button 
            type="submit" 
            id="submit-button" 
            severity="secondary" 
            :disabled="!isConnected"
            @click="saveDataToDevice"
            >
            <Icon icon="material-symbols:upload" class='icon'/>
            Save to device
        </Button>   

    </div>
</template>

<style scoped>


#buttons-container{
    display: grid;
    min-height: 510px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
}

/* pages switch */
#pages-switch-cont{
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    justify-content: center; /* Center the page buttons */
    align-items: center;
    width: 400px;
    position: relative; /* Allow absolute positioning for knob */
}

.main-page-buttons {
    display: flex;
    flex-direction: row;
}

.knob-page-btn{
    position: absolute !important;
    right: 0;
}

#submit-button{
    margin-top: 20px;
    color: var(--green-bright);
}
#submit-button .icon{
    color: inherit;
}

#connection-cont{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

#connection-icon {
    width: 20px;
    height: 20px;
    background-color: var(--gray-main);
    border-radius: 50%;
    margin-right: 5px;
    animation: blink 1s infinite alternate;
}
#connection-icon.connected{
    background-color: var(--green-vivid);
    box-shadow: 0 0 15px rgba(16, 223, 16, 0.153);
}
#connection-icon.disconnected{
    background-color: var(--red-vivid);
    box-shadow: 0 0 15px rgba(224, 79, 7, 0.742);
}
#connection-icon.connecting{
    background-color: var(--primary-50);
    box-shadow: 0 0 15px rgba(12, 118, 218, 0.742);
}


#connection-msg{
    color: var(--primary-0);
    margin-right: 15px;
    text-transform: uppercase;
    font-size: var(--small-text);
}

.context-menu-active{
    background-color: blue;
}

/* Blinking Animation */
@keyframes blink {
    0% { opacity: 1; }   /* Fully visible */
    100% { opacity: 0.5; } /* Fades out */
}

#connect-button{
    width: 120px;
    height: 25px;
    line-height: 10px;
    padding: 5px 10px;
    font-size: var(--smaller-text);
    outline: none;
    /* border: none;
    background-color: var(--green-dark);
    color: var(--primary-0); */
}

#connect-button.connected{
    color: var(--green-dark);
}
#connect-button.disconnected{
    color: var(--red-dark);
}
#connect-button.connecting{
    color: var(--primary-50);
}
#connect-button.error{
    color: var(--gray-main);
}

/* Make context menu items look more like your buttons */




</style>