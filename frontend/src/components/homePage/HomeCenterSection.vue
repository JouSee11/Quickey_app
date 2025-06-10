<script setup lang="ts">
import ButtonBox from "@/components/homePage/ButtonBox.vue"
import RoundPageButton from "@/components/homePage/RoundPageButton.vue"
import {onMounted} from "vue"
import {useButtons} from "@/composables/useButtonsBindingHome"
import type { ButtonState } from "@/types/buttonBindHome"
import { Button } from "primevue"
import { Icon } from '@iconify/vue'
import {ref} from 'vue'
import { list } from "@primeuix/themes/aura/autocomplete"
import { button } from "@primeuix/themes/aura/inputnumber"


const connected = ref<boolean>(false);

//use the composable functoins
const {
    allButtons,
    currentPage,
    currentPageButtons,
    initButtons,
    changePage,
    bindButtonValue,
    listeningButton,
    totalPages,
    showKnob
} = useButtons()

// init buttons when componets are visible
onMounted(() => {
    initButtons()
})


const handleBindButton = (buttonId: number) => {
    //start listening on the button
    listeningButton(buttonId)
}

const handleResetButton = (buttonId: number) => {
    console.log("TODO");
}

const handleMultiBindButton = (buttonId: number) => {
    //open the dialog for multi binding
    console.log("TODO")
}

</script>

<template>
    <div id="center-section">

        <!-- <p id="status-message"></p> -->

        <div id="connection-cont">
            <div 
                id="connection-icon"
                :class="connected ? 'connected' : 'not-connected'"
            />
            <p id="connection-msg">
                {{ connected ? "connected" : "disconnected" }}
            </p>
            <Button 
                type="submit" 
                id="connect-button"
                rounded
                variant="outlined"
                :class="connected ? 'connected' : 'not-connected' "
            >
                {{connected ? 'Disconnect' : 'Connect'}}
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
                @bind-button="handleBindButton"
                @multi-bind-button="handleMultiBindButton"
                @reset-button="handleResetButton"
            />

            <!-- show knob if on the right page -->
            <Button 
                v-if="showKnob && currentPage === totalPages + 1"
                :outlined="true"
            >
                This is the knob nigga
            </Button>
            
        </div>

                    
        <!-- page numbers display -->
        <div id="pages-switch-cont">
            <RoundPageButton
                v-for="page in totalPages"
                :key="page"
                :number-display="page"
                :enabled="true"
                :class="{ active: currentPage === page }"
                @click="changePage(page)"

            />
            <!-- <Icon icon="mdi:knob" class="icon-knob" />  -->
            <RoundPageButton
                v-if="showKnob"
                :key="'knob'"
                :number-display="'K'"
                :enabled="true"
                :icon="'pi pi-circle-fill'"
                :class="{ active: currentPage === (totalPages+1)}"
                @click="changePage(totalPages+1)"
            />
        
        </div>

        <!-- save button -->
        <Button 
            type="submit" 
            id="submit-button" 
            severity="secondary" 
            variant="outlined"
            :disabled="!connected"
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
#connection-icon.not-connected{
    background-color: var(--red-vivid);
    box-shadow: 0 0 15px rgba(224, 79, 7, 0.742);
}


#connection-msg{
    color: var(--primary-0);
    margin-right: 15px;
    text-transform: uppercase;
    font-size: var(--small-text);
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
    /* border: none;
    background-color: var(--green-dark);
    color: var(--primary-0); */
}

#connect-button.connected{
    color: var(--green-dark);
    /* background-color: var(--green-dark); */
}
#connect-button.not-connected{
    color: var(--red-dark);
    /* background-color: var(--red-dark); */
}

/* knob icon */
/* .icon-knob{
    40px,
} */

</style>