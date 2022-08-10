<script setup lang="ts">
import { useRouter  } from 'vue-router';
import {initRouteByAddroute} from '@/router/index'
import {NextLoading} from '@/utils/loading'
import { useHeaderStore } from '@/stores';
import { ref } from 'vue';

let userouter = useRouter()
let loading = ref<boolean>(false)
let headerStore = useHeaderStore()

let login = (role:boolean)=>{
    loading.value = true
    NextLoading.start()
    // 缓存role
    sessionStorage.setItem('role',role?"admin":'user')
    headerStore.clearTagList()
    // 初始化路由
    initRouteByAddroute()

    setTimeout(() => {
        loading.value = false
        NextLoading.done()
        if(role){
            userouter.push('/admin')
        }else{
            userouter.push('/user')
        }
    }, 2000);
}


</script>

<template>
    <div>
        <el-button type="primary" @click="()=>{login(true)}" :loading="loading">管理员登陆</el-button>
        <el-button type="primary" @click="()=>{login(false)}" :loading="loading">普通用户登陆</el-button>
    </div>
</template>

<style lang="">
    
</style>