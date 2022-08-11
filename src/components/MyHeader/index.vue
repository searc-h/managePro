<template >
    <div class="myheader">
        <div class="left">
            <el-button @click="changeMenuCollapse">
                <el-icon size="20px"><Grid /></el-icon>
            </el-button>
            
            <div class="title">{{title}}</div>
        </div>
        <div class="right">
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                <el-button class="btn">
                        <el-icon size="20px"><Setting /></el-icon>
                </el-button>
            </span>
            <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item @click="toLogout">退出登陆</el-dropdown-item>
            </el-dropdown-menu>
            </template>
        </el-dropdown>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useMenuStore ,useHeaderStore } from '@/stores';
import {storeToRefs} from 'pinia'
import { useRouter } from 'vue-router';

let menuStore = useMenuStore()
let headerStore = useHeaderStore()
let {title} = storeToRefs(headerStore)
let {isCollapse} = storeToRefs(menuStore)

let changeMenuCollapse = ()=>{
    
    menuStore.changeIsCollapse(isCollapse.value)
}

let router = useRouter()

let toLogout = ()=>{
    headerStore.clearTagList()
    router.replace('/login')
}
</script>
<style lang="less">
.myheader{
    width: 100%;
    height: 100%;
    background-color: rgb(37, 36, 36);
    color: #fff;
    display: flex;
    align-items: center;
    padding: 0px 10px;
    justify-content: space-between;
    .left{
        padding: 0px 10px;
        height: 100%;
        align-items: center;
        display: flex;
        justify-content: space-between;
        .title{
            font-size: 20px;
            font-weight: 555;
            line-height: 50px;
            padding: 0px 20px;
        }
    }
}
</style>