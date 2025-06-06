<script setup lang="ts">
import ButtonBox from "@/components/homePage/ButtonBox.vue"
import RoundPageButton from "@/components/homePage/RoundPageButton.vue"
import {onMounted} from "vue"
import {useButtons} from "@/composables/useButtonsBindingHome"
import type { ButtonState } from "@/types/buttonBindHome"
import { Button } from "primevue"
import { Icon } from '@iconify/vue'
import {ref} from 'vue'


const connected = ref<boolean>(false);

//use the composable functoins
const {
    allButtons,
    currentPage,
    currentPageButtons,
    initButtons,
    changePage,
    bindButton,
    resetButton
} = useButtons(3, 9)

// init buttons when componets are visible
onMounted(() => {
    initButtons()
})


const handleBindButton = () => {
    console.log("TODO");
    
}

const handleResetButton = () => {
    console.log("TODO");
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
            <p id="connection-msg">unknown</p>
            <Button 
                type="submit" 
                id="connect-button"
                rounded
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
                @reset-button="handleResetButton"
            />
        </div>
        
        <!-- page numbers display -->
        <div id="pages-switch-cont">
            <RoundPageButton
                v-for="page in 3"
                :key="page"
                :number-display="page"
                :enabled="true"
                :class="{ active: currentPage === page }"
                @click="changePage(page)"

            />
        
        </div>

        <!-- save button -->
        <Button type="submit" id="submit-button" severity="secondary" variant="outlined" >
            <Icon icon="material-symbols:check-circle-rounded" class='icon'/>
            Save to device
        </Button>   

    </div>
</template>

<style scoped>

#center-section{
    grid-column: 2;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
}


#buttons-container{
   display: grid;
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
    border: none;
    background-color: var(--green-dark);
    padding: 5px 10px;
    color: var(--primary-0);
    font-size: var(--smaller-text);
    line-height: 10px;
}

#connect-button:hover{
    filter: brightness(1.5);
    cursor: pointer;
}
#connect-button.connected{
    background-color: var(--green-dark);
}
#connect-button.not-connected{
    background-color: var(--red-dark);
}

/*

/* #status-message{
    position: absolute;
    bottom: 50px;
    color: var(--primary-0);
    font-size: var(--bigger-text);
    margin-bottom: 15px;
}

#status-message.successfull{
    color: var(--green-bright);
}
#status-message.error{
    color: var(--red-vivid)
} */


</style>