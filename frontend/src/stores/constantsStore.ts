import {ref} from 'vue'
import {defineStore } from 'pinia'
import { userKeybindingApi } from '@/api/keybinding/keybinding_user'

export const useConstantsStore = defineStore('constants', () => {
    const keybindingCategories = ref<string[]>([])

    const getFilterCategories = async () => {
        keybindingCategories.value = await userKeybindingApi.getCategories()
    }

    return {keybindingCategories, getFilterCategories}
})