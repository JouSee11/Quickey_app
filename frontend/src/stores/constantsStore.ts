import {ref} from 'vue'
import {defineStore } from 'pinia'
import { saveKeybindingApi } from '@/api/keybinding/save_keybinding'

export const useConstantsStore = defineStore('constants', () => {
    const keybindingCategories = ref<string[]>([])

    const getFilterCategories = async () => {
        keybindingCategories.value = await saveKeybindingApi.getCategories()
    }

    return {keybindingCategories, getFilterCategories}
})