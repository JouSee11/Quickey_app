<template>
  <div class="cont">
    <VueDraggable
      v-model="list1"
      :animation="800"
      ghostClass="ghost"
      :group="{ name: 'people', pull: 'clone', put: false }"
      :clone="clone"
      :sort="false"
      class="flex flex-col gap-2 p-4 w-300px bg-gray-500/5 rounded"
    >
      <div
        v-for="item in list1"
        :key="item.id"
        class="item-from"
      >
        {{ item.name }}
      </div>
    </VueDraggable>
    <VueDraggable
      v-model="list2"
      :animation="900"
      group="people"
      ghostClass="ghost"
      class="flex flex-col gap-2 p-4 w-300px max-h-350px m-auto bg-gray-500/5 rounded overflow-auto"
    >
      <div
        v-for="item in list2"
        :key="item.id"
        class="item-to"
      >
        {{ item.name }}
      </div>
    </VueDraggable>
  </div>
  <div class="flex justify-between">
    <preview-list :list="list1" />
    <preview-list :list="list2" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'

const list1 = ref([
  {
    name: 'Joao',
    id: '1'
  },
  {
    name: 'Jean',
    id: '2'
  },
  {
    name: 'Johanna',
    id: '3'
  },
  {
    name: 'Juan',
    id: '4'
  }
])
const list2 = ref(
  list1.value.map(item => ({
    name: `${item.name}-2`,
    id: `${item.id}-2`
  }))
)

function clone(element: Record<'name' | 'id', string>) {
  const len = list2.value.length
  return {
    name: `${element.name}-clone-${len}`,
    id: `${element.id}-clone-${len}`
  }
}
</script>

<style scoped>
.cont{
    display: flex;
    height: 500px;
}

.item-to{
    height: 50px;
    background-color: green;
    width: 50px;
}

.item-from{
    height: 50px;
    background-color: blue;
    width: 50px;

}
</style>