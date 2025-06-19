<script setup lang="ts">
import logo from '@/assets/images/icons/main-logo.svg'
import soonImagePoster from '@/assets/images/landing_page/soon-poster.png'
import productImage1 from '@/assets/images/landing_page/product_1.jpg'

</script>

<template>
  <div class="about">

    <Image :src="logo" class="logo-top" width="80"/>
    <h1 class="main-header">Quickey macropad</h1>

    <p class="catch-phrase">Designed to simplify your workflow and keep your focus where it matters most.</p>
    
    <div class="main-button-cont">
      <Button 
        label="I am interested"
        icon="pi pi-info-circle"
        outlined
        rounded
        class="notify-button"
      />
    </div>

    <div class="first-image-cont">
      <div class="first-text-cont">
        <p class="first-paragraph">Customizable macropad, binding multiple acitons at one click. Automatization for your everyday actions</p>
      </div>
      <Image class="image-first" :src="soonImagePoster" v-animateonscroll="{ enterClass: 'animate-fadein', leaveClass: 'animate-fadeout' }"/>
    </div>

    <div class="first-image-cont">
      <div class="first-text-cont">
        <p class="first-paragraph">Customizable macropad, binding multiple acitons at one click. Automatization for your everyday actions</p>
      </div>
      <Image class="image-first" :src="productImage1" v-animateonscroll="{ enterClass: 'animate-fadein', leaveClass: 'animate-fadeout' }"/>
    </div>

    <!-- <div class="item-big"></div> -->
    <div
      class="item-smaller"
      v-animateonscroll="{ enterClass: 'animate-fadein', leaveClass: 'animate-fadeout' }"
    >
      <p>YOYOYOYO</p>
    </div>
    

    <ScrollTop/>
  </div>
</template>

<style scoped>
.about{
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: start;
  width: 100vw;
  height: 100vh;
  margin-top: 80px;
}

.item-big{
  width: 250px;
  height: 2050px;
  background-color: red;
  flex-shrink: 0;
}


.item-smaller{
  width: 250px;
  height: 300px;
  background-color: green;
  flex-shrink: 0;
  margin-top: 200px;
}

/* override global styles for this page */
:global(#app:has(.about)) {
  overflow-y: auto !important;
  overflow-x: hidden !important;
  align-items: flex-start !important;
}

.main-header{
  font-size: 80px;
  width: 500px;
  text-align: center;
  line-height: 1em;
}

.catch-phrase{
  color: var(--gray-bright);
  font-size: var(--bigger-text);
  width: 500px;
  text-align: center;
  margin-top: 40px;

}

.main-button-cont{
  margin-top: 20px;
}

.notify-button{
  color: var(--green-bright);
  margin-right: 20px;
}

.app-button{
  color: var(--gray-bright);
}

.first-image-cont{
  display: flex;
  width: 90vw;
  margin-top: 70px;
}

.first-text-cont{
  width: 50%;
  display: flex;
  align-items: start;
  justify-content: center;
  padding-top: 50px;
}


.first-paragraph{
  width: 70%;
  font-size: var(--bigger-text);
}

:deep(.image-first img){
  border-radius: var(--border-rad-main) !important;
  border: 1px solid var(--gray-main);
  width: 500px;
  margin-left: auto;
}



/* =================== ANIMATIONS =========================== */
.animate-fadein {
  animation: customFadeIn 0.5s ease-in-out;
}

.animate-fadeout {
  animation: customFadeOut 1s ease-in-out;
}

@keyframes customFadeIn {
  from {
    opacity: 0;
    transform: translate(50px);
  }
  to {
    opacity: 1;
    transform: translate(0) scale(1);

  }
}

@keyframes customFadeOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.5);
  }
}

@media (max-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
