<script setup lang="ts">
import ButtonBox from "@/components/ButtonBox.vue"
import {onMounted} from "vue"
import {useButtons} from "@/composables/useButtonsBindingHome"

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
    <div id="content-container">

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

    </div>
</template>

<style scoped>

/* #content-container{
    display: flex;
    justify-content: center;
    align-items: center;

} */

#buttons-container{
   display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
}
</style>