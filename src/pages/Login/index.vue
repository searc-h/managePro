<script setup lang="ts">
import { useRouter  } from 'vue-router';
import router from '@/router'
import {dynamicUserRoutes , dynamicAdminRoutes} from '@/router/route'
import {NextLoading} from '@/utils/loading'
import { ref } from 'vue';

let userouter = useRouter()
let loading = ref<boolean>(false)

let login = (role:boolean)=>{
    loading.value = true
    NextLoading.start()
    router.removeRoute('/')
    console.log(router.getRoutes())
    if(role){
        router.addRoute(dynamicAdminRoutes[0])
        
        sessionStorage.setItem('role','admin')
    }else{
        router.addRoute(dynamicUserRoutes[0])
        
        sessionStorage.setItem('role','user')
    }

    
    setTimeout(() => {
        loading.value = false
        NextLoading.done()
        if(role){
            userouter.push('/admin')
        }else{
            userouter.push('/user')
        }
    }, 5000);
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