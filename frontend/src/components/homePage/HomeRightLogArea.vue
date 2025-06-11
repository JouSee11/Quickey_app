<script setup lang="ts">
import {ref} from "vue"
import { useDeviceStore } from "@/stores/deviceStore"
import { storeToRefs } from "pinia"
import {Icon} from '@iconify/vue'

const deviceStore = useDeviceStore()
const {logs} = storeToRefs(deviceStore)

const showLogs = ref<boolean>(false)

const toggleLogArea = () => {
    showLogs.value = !showLogs.value
}

const eraseLogs = () => {
    logs.value = ["--LOG-- --FOR DEBUG--"]
}


//logs elements
// const logs = ref<string[]>([
//     "---LOG--- ---FOR DEBUG---"
// ])

// for (let index = 0; index < 200; index++) {
//     logs.value.push("testing logs, line-" + index.toString())
    
// }
</script>

<template>
    <div id="right-section">
        <Transition name="expand">
            <div
                v-show="showLogs"
                id="log-area"
                class="box-shadow-normal"
            >
                <pre v-for="(log, index) in logs" :key="index" class="log-line"><span class="log-line-number">{{ index }}:</span>{{ log }}</pre> 
            </div>            
        </Transition>

        <div class="buttons-log-cont">
            <Button
                id="show-logs-button"
                variant="outlined"
                :icon="showLogs ? 'pi pi-eye-slash' : 'pi pi-eye'"
                :label="showLogs ? 'Hide logs' : 'Show logs'"
                @click="toggleLogArea"
            />
    
            <Button
                v-if="showLogs"
                outlined
                icon="pi pi-eraser"
                class="clear-logs-button"
                @click="eraseLogs"
            >
                <!-- <Icon icon="icon-park-outline:clear-format" class="icon-log-clear"/> -->
    
            </Button>
            

        </div>
    

    </div>

</template>

<style scoped>
#show-logs-button{
    color: var(--gray-main);
}

#log-area{
    width: 400px;
    height: 400px;
    max-width: 90%;
    position: relative;
    border-radius: var(--border-rad-smaller);
    background-color: var(--p-menu-background);
    margin-top: 10px;
    color: var(--primary-0);
    padding: 15px 10px;
    margin-bottom: 15px;
    cursor: default;
    resize: none;
    overflow-y: scroll;
    border: 1px var(--p-menu-border-color) solid;    
}

.log-line-number{
    color: var(--gray-main);
    margin-right: 20px;
}

.log-line{
    font-size: small;
    margin-bottom: 5px;
    white-space: pre-wrap;
    overflow-wrap: break-word;
}

/* Pure CSS expand/collapse */
.expand-enter-active, .expand-leave-active {
  transition: all 0.5s ease;
}
.expand-enter-from, .expand-leave-to {
  max-height: 0;
  opacity: 0;
}
.expand-enter-to, .expand-leave-from {
  max-height: 1000px; 
  opacity: 1;
}

.icon-log-clear{
    position: absolute;
    
    top: 10px;
    right: 10px;

    width: 30px;
    height: 30px;
    color: var(--primary-50);
}

.clear-logs-button{
    margin-left: 20px;
    color: var(--red-dark);
}



</style>