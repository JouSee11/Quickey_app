<script setup lang="ts">
import {ref} from 'vue'

interface KeybindingData {
    _id: string,
    name: string,
    category: string,
    bindingData: Array<{id: string, value: string[] | string}>,
    public: boolean,
    likeCount: number,
    isLiked: boolean,
    createdAt: string,
    user: {
        username: string
    }
}

interface Props {
    keybinding: KeybindingData
}

const props = defineProps<Props>()

const currentPage = ref(1)
const totalPages = 3


const getCurrentPageButtons = () => {

}

const handlePageChange = (pageNumber: number) => {
    return
}

</script>



<template>
    <div class="save-block-link">
        <div class="save-cont">
            <!-- hovering areas  -->
            <div v-for="sectionNumber in 3" class="hovering-section" @mouseenter="handlePageChange(sectionNumber)"></div>

            <!-- keys display-->
            <div class="save-keys-cont active">
                <!-- 9 buttons page  -->
                <div
                    v-for="button in getCurrentPageButtons"
                    :key="button"
                    class="save-key"
                    :class="{
                        // 'save-key-binded': !button.isEmpty,
                        'save-key-binded': false,
                    }"
                ></div>
            </div>

            <!-- page indicator -->
            <p class="page-num-display">Page: <span class="page-num-val">1</span></p>

            <!-- public/private state show -->
            <i
                class="save-public-state"
                :class="false ? 'pi pi-globe' : 'pi pi-lock'"
            ></i>

            <!-- likes section -->
            <div class="save-likes-const">
                <i
                    class="save-likes-ico pi pi-heart"
                    :class="true ? 'liked' : 'not-liked'"
                ></i>    
                <p class="save-likes-num">40</p>
            </div>

            <!-- bottom stats -->
            <div class="save-stats-bottom">
                <p class="save-name">Discord communication</p>
                <p class="save-date">21.2.2002</p>
                
                <div class="save-username-ico-cont">
                    <p class="save-username">Josef Talac</p>
                    <i class="pi pi-user"></i>
                </div>
            </div>



        </div>
    </div>

</template>

<style scoped>
.save-block-link {
    text-decoration: none;
    position: relative;
    cursor: pointer;
}

.save-cont {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
    height: 200px;
    background-color: var(--primary-800);
    padding: 20px;
    border-radius: var(--border-rad-main);
    margin: 0;
    color: var(--primary-0);
    transition: transform 0.2s ease-in-out, box-shadow 0.3s ease-in-out;
}

.save-keys-cont {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, auto);
    gap: 10px;
    transition: all 0.3s ease-in-out;
}

.save-key {
    width: 20px;
    height: 20px;
    border-radius: 5px;
    transition: all 0.2s ease;
}

.save-key-binded {
    background-color: var(--green-bright);
    box-shadow: 0 0 10px rgba(0, 128, 28, 0.37);
}

.save-key-empty {
    background-color: var(--blue-dark);
}

/* Knob section styles */
.knob-section {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.knob-container {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 5px;
}

.knob-element {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    transition: all 0.2s ease;
}

.knob-element.center {
    width: 20px;
    height: 20px;
}

.knob-label {
    font-size: var(--smaller-text);
    color: var(--gray-main);
    margin: 0;
}

.page-num-display {
    margin-top: 10px;
    margin-bottom: 0;
    font-size: var(--small-text);
    color: var(--gray-main);
}

.save-name {
    font-weight: bold;
    margin-bottom: 10px;
    margin-top: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 200px;
}

.save-stats-bottom {
    position: relative;
    margin-top: 10px;
    width: 100%;
}

.save-date {
    font-size: var(--smaller-text);
    margin: 0;
    color: var(--gray-main);
}

.save-username-ico-cont {
    display: flex;
    position: absolute;
    bottom: 0;
    right: 0;
    color: var(--gray-main);
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease-in-out;
}

.save-username {
    margin: 0;
    margin-right: 10px;
    font-size: var(--smaller-text);
}

.save-public-state {
    position: absolute;
    left: 20px;
    top: 20px;
    color: var(--gray-main);
}

.save-likes-cont {
    display: flex;
    align-items: center;
    position: absolute;
    right: 20px;
    top: 20px;
    color: var(--gray-main);
    cursor: pointer;
    transition: color 0.2s ease;
}

.save-likes-cont:hover {
    color: var(--red-vivid);
}

.save-likes-num {
    margin: 0;
    margin-left: 5px;
}

.hovering-section {
    display: block;
    position: absolute;
    width: 33.3%;
    height: 200px;
}

.hover-page-one {
    top: 0;
    left: 0;
}

.hover-page-two {
    top: 0;
    left: 33.3%;
}

.hover-page-three {
    top: 0;
    left: 66.6%;
}

.save-cont:hover {
    box-shadow: 5px 5px 0 var(--green-dark);
    transform: scale(1.02);
}

.save-cont:hover .save-username-ico-cont {
    color: var(--primary-0);
}

.save-cont:hover .save-likes-ico {
    color: var(--red-dark);
}

</style>