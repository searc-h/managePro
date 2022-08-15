<script setup lang="ts">
import { Suspense ,onMounted} from 'vue';
import { RouterView  } from 'vue-router'
import {useAdminStore} from '@/stores/admin.Store'

let adminStore = useAdminStore()

const getTableList = async ()=>{
    let res = await adminStore.getTableData()
}
onMounted(()=>{
    getTableList()
})
</script>

<template>
<!-- 一级路由出现 -->
        <div class="app-container">
            <Suspense>
                <template #default>
                    <router-view></router-view>
                </template>
                <template #fallback>
                    <h1>加载中.....</h1>
                </template>
            </Suspense>
        </div>
</template>

<style scoped>
.app-container{
    width: 100%;
    height: 100vh;
}
</style>
