<script setup lang="ts">
//images
import logo from '@/assets/images/icons/main-logo.svg'
import soonImagePoster from '@/assets/images/landing_page/soon-poster.png'
import productImage1 from '@/assets/images/landing_page/product_1.jpg'
import productImage2 from '@/assets/images/landing_page/product_2.jpg'
import productImage3 from '@/assets/images/landing_page/product_3.jpg'
import productImage4 from '@/assets/images/landing_page/product_4.jpg'
import productImage5 from '@/assets/images/landing_page/product_5.jpg'
import productImage6 from '@/assets/images/landing_page/product_6.jpg'
import productImage7 from '@/assets/images/landing_page/product_7.jpg'
//components
import BlockInfo from '@/components/about/BlockInfo.vue'

const imagesCarousel = [
  soonImagePoster, 
  productImage1,
  productImage2,
  productImage3,
  productImage4,
  productImage5,
  productImage6,
  productImage7,
]

const featuresBlocks = [
  {
    "icon": "material-symbols:layers-rounded",
    "header": "Multi-key",
    "text": "Bind multiple actions on one button click, automatize your actions"
  },
  {
    "icon": "streamline-plump:web",
    "header": "Application",
    "text": "Web aplication for binding simple and multi actions."
  },

]

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

    <!-- first content block -->
    <div class="block-content-cont" v-animateonscroll="{ enterClass: 'animate-fadein', leaveClass: 'animate-fadeout' }">
      <div class="block-text-cont">
        <p class="block-paragraph">
          <span class="text-highlighted">Keys that makes you work efficiently.</span>
          Every Quickey is fully programmable to do what you need — whether it’s a single command or a complex macro. One small device, many small time-savers.
        </p>
      </div>
      <Image class="image-block" :src="soonImagePoster" />
    </div>


    <!-- second content block -->
    <div class="block-content-cont" v-animateonscroll="{ enterClass: 'animate-fadein', leaveClass: 'animate-fadeout' }">
      <Image class="image-block" :src="productImage1" />
      <div class="block-text-cont">
        <p class="block-paragraph">
          <span class="text-highlighted">A knob with range</span>
          Scroll through timelines, switch tabs, or control volume with smooth, precise input. Push the knob to trigger a radial menu, or assign it to do something completely custom.
        </p>
      </div>
    </div>

    <!-- self made quote -->
    <div class="quote-cont" v-animateonscroll="{ enterClass: 'animate-fadein', leaveClass: 'animate-fadeout' }">
      <span class="text-bigger">Not corporate. Just crafted.</span>
      <p class="text-quote">
        I didn’t set out to build a product — just something that made my own setup better. Crafted by only me.
      </p>
    </div>
    
    <!-- image carusel -->
    <Carousel 
      :value="imagesCarousel" 
      circular 
      :autoplay-interval="2500"
      :num-visible="3"
      :num-scroll="1"
      class="image-carousel"
      v-animateonscroll="{ enterClass: 'animate-fadein', leaveClass: 'animate-fadeout' }"
    >
      <template #item="{data}">
        <div class="carousel-item">
          <Image :src="data" class="carousel-image"/>
        </div>
      </template>
    </Carousel>

    <div class="block-features-cont">
      <!-- <div v-for="item in featuresBlocks"> -->
        <BlockInfo v-for="item in featuresBlocks" :key="item.header" :icon="item.icon" :header="item.header" :text="item.text"/>

      <!-- </div> -->
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
  margin-top: 80px;
  margin-bottom: 100px;
  
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

.text-highlighted{
  color: var(--primary-0);
  display: block;
  font-weight: bold;
}

.block-content-cont{
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1500px;
  margin-top: 70px;
  padding: 0 40px;
}

.block-text-cont{
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
}


.block-paragraph{
  width: 300px;
  font-size: var(--bigger-text);
  color: var(--gray-bright);
}

:deep(.image-block img){
  border-radius: var(--border-rad-main) !important;
  border: 1px solid var(--gray-main);
  max-width: 600px;
  aspect-ratio: 1;
  margin-left: auto;
}

.quote-cont{
  width: 100%;
  max-width: 1500px;
  margin-top: 70px;
  padding: 0 40px;
}

.text-bigger{
  font-size: var(--big-title-text);
  color: var(--primary-0);
  text-align: left;
  font-weight: bold;
}

.text-quote{
  /* font-size: var(--bigger-text); */
  width: 70%;
}

/* carousel styles */
.image-carousel{
  width: 100%;
  max-width: 1500px;
  margin-top: 30px;
}

:deep(.carousel-image img) {
  width: 100%;
  max-width: 400px;
  height: 500px;
  object-fit: cover;
  border-radius: var(--border-rad-main);
  border: 1px solid var(--gray-main);
  transition: transform 0.3s ease;
}

/* .carousel-item{
  width: 25%;
} */

.block-features-cont{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1500px;
  padding: 0 40px;
  margin-top: 50px;
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
