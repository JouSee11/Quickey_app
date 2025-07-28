<script setup lang="ts">
import { AuthService } from '@/api/auth/auth_service';
import { userKeybindingApi } from '@/api/keybinding/keybinding_user';
import { useConstantsStore } from '@/stores/constantsStore';
import { storeToRefs } from 'pinia';
import { onBeforeMount, ref } from 'vue';
import KeybindingSave from '@/components/profile/KeybindingSave.vue';

//search and filter values
const searchValues = ref('')
const filterLiked = ref(false)
const selectedCategories = ref([])
const sortBy = ref('date_desc')
const filterPublic = ref('all')

const user = AuthService.getUser()

const constantsStore = useConstantsStore()
const {keybindingCategories} = storeToRefs(constantsStore)

const sortOptions = ref([
    {label: 'Newest', value: 'date_desc'},
    {label: 'Oldest', value: 'date_asc'},
    {label: 'Most liked', value: 'most_liked'},
    {label: 'Name (A-Z)', value: 'name_asc'},
    {label: 'Name (Z-A)', value: 'name_desc'}
])

const publicOptions = ref(['all', 'public', 'private'])

const resetFilters = () => {
    filterLiked.value = false
    selectedCategories.value = []
    sortBy.value = 'date_desc'
    filterPublic.value = 'all'
}


// ========= displaying binding data =====================
const displayData = ref([])
const dataLoading = ref(true)

const updateDisplayData = async () => {
    displayData.value = await userKeybindingApi.getKeybindingUser(
        searchValues.value,
        selectedCategories.value,
        sortBy.value,
        filterPublic.value,
        filterLiked.value
    )
}

const filterValueChanged = async () => {
    dataLoading.value = true
    await updateDisplayData()
    dataLoading.value = false
}


</script>

<template>
    <div class="dashboard-container">
        <!-- title -->
        <div class="dashboard-header">
            <span class="header-title"><i class="pi pi-save"/>My saves</span>
            <span class="header-name"><i class="pi pi-user"/>{{ user?.username }}</span>
        </div>
        
        <!-- seach bar  -->
        <div class="search-wrapper">
            <i class="pi pi-search search-icon"></i>
            <InputText
                v-model="searchValues"
                class="search-input"
                placeholder="Search binding saves..."    
            />
        </div>

        <!-- search filters -->
        <Toolbar class="filter-toolbar">
            <template #end>
                <Button 
                    label="Reset filters"
                    variant="text"
                    size="small"
                    @click="resetFilters"
                />                 
    
            </template>

            <template #start>
                <MultiSelect
                    v-model="selectedCategories"
                    :options="keybindingCategories"
                    :max-selected-labels="2"
                    size="small"
                    placeholder="Filter categories"
                    class="category-select"
                    @change="filterValueChanged"
                />

                <Dropdown
                    v-model="sortBy"
                    :options="sortOptions"
                    option-label="label"
                    option-value="value"
                    size="small"
                    placeholder="Sort by"
                    class="sort-select"
                />

                <SelectButton 
                    v-model="filterPublic"
                    :options="publicOptions"
                    size="small"
                    class="public-select"
                />

                <Button 
                    :label="filterLiked ? 'Liked' : 'All'"
                    @click="filterLiked = !filterLiked" 
                    :class="['filter-liked-button', { 'active-button': filterLiked }]"
                    size="small"
                    :icon="filterLiked ? 'pi pi-heart-fill' : 'pi pi-heart'"
                    variant="text"
                />

            </template>


        </Toolbar>

        <!-- disaply binding data -->
        <div class="keybinding-display-cont">
            <KeybindingSave/>
        </div>


    </div>
</template>

<style scoped>
.dashboard-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 10px 30px;
}

/* header contents */
.dashboard-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px;
}

.header-title{
    font-size: var(--bigger-text);
    font-weight: bold;
    color: var(--gray-bright);
}

.header-title i{
    margin-right: 10px;
}

.header-name{
    font-size: var(--smaller-text);
    color: var(--gray-bright);
}
.header-name i{
    margin-right: 10px;
}


/* search icon */
.search-wrapper {
    position: relative;
    width: 100%;
}

.search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--primary-600);
    z-index: 1;
}

.search-input{
    width: 100%;
    padding-left: 2.5rem;
}

/* filter values */
.filter-toolbar{
    width: 100%;
    background-color: transparent;
    padding: 5px 0px;
    margin-top: 10px;
    border: none;
}

.filter-liked-button{
    color: var(--primary-0);
    width: 80px;
    height: 31px;
}

.filter-liked-button.active-button{
    color: var(--red-vivid);
}

.category-select{
    width: 200px;
    margin-right: 10px;
}

.sort-select{
    width: 150px;
    margin-right: 10px;
}

.public-select{
    height: 31px;
    margin-right: 10px;
}

</style>