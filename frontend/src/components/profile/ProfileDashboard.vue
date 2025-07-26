<script setup lang="ts">
import { AuthService } from '@/api/auth/auth_service';

const user = AuthService.getUser()

</script>

<template>
    <div class="dashboard-container">
        <!-- seach bar  -->
         <div class="dashboard-header">
            <span class="header-title"><i class="pi pi-save"/>My saves</span>
            <span class="header-name"><i class="pi pi-user"/>{{ user?.username }}</span>
         </div>
        <div class="search-wrapper">
            <i class="pi pi-search search-icon"></i>
            <InputText
                class="search-input"
                placeholder="Search binding saves..."    
            />
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

</style>