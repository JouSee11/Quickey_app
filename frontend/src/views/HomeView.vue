<script setup lang="ts">
import ButtonBindingsMain from "@/components/homePage/HomeCenterSection.vue"
import LeftButtonSection from "@/components/homePage/HomeLeftButtonSection.vue"

</script>

<template>
  <main>
    <div id="content-container">
      <LeftButtonSection />

      <!-- center container with button binding -->
      <ButtonBindingsMain id="center-section"/>
    </div>
  </main>
</template>

<style scoped>

#content-container{
    display: grid;
    grid-template-columns: 1fr 1.5fr 1fr;
    grid-template-rows: 1fr;
    width: 100vw;
}

#left-section{
    grid-column: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

}

#center-section{
    grid-column: 2;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
}
</style>
