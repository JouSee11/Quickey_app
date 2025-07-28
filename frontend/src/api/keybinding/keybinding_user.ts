import {api} from "@/api/api"

export const userKeybindingApi = {
    async verifyKeybindingName(name: string): Promise<boolean> {
        try {
            const response = await api.post('/keybinding/validate-name', {saveName: name})

            return response.data.valid
        } catch (error) {
            console.log(error);
            return false
        }
    },

    async saveKeybinding(keybidingData: any, name: string, description: string, category: string) {
        try {
            const response = await api.post('/keybinding/save', {bindingData: keybidingData, name: name, description: description, category: category})

            return response.data
        } catch (error) {
            console.log(error)
            return {status: 'error', msg: 'Error saving data'}
        }
    },

    async getKeybindingUser(searchText: string, filterCategories: string[], sortBy: string, publicFilter: string, likedFilter: boolean) {
        try {
            console.log(filterCategories)
            const response = await api.get('/keybinding/get-user-binding', {
                params: {
                    searchText,
                    filterCategories: filterCategories.join(','),
                    sortBy,
                    publicFilter,
                    likedFilter
                }
            })
            
            return response.data
        } catch (error) {
            console.log(error)
            return {status: 'error', msg: 'Failed to get saved data'}
        }
    },

    async getCategories(): Promise<string[]> {
        try {
            const response = await api.get('/keybinding/get-categories')

            return response.data.categories
        } catch (error) {
            return []
        }
    },

    
}