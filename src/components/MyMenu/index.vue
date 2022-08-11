<script setup lang="ts">
import { computed, type ComputedRef ,onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router';
import { useMenuStore,useHeaderStore } from '../../stores'
import ChildMenu from './childMenu.vue'

let role = ref<string>('')
onMounted(() => {
    role.value = sessionStorage.getItem('role') as string
})
let menuStore = useMenuStore()
let {isCollapse} = storeToRefs(menuStore)

let userList = [
    {
        path: "/user/allactivity",
        name: 'allactivity',
        icon: 'DocumentCopy',
        label: '全部活动',
        key: '1'
    },
    {
        label: '我的',
        path:'/user/myactivity',
        icon: 'Document',
        key: '2',
        children: [
            {
                name: 'mymes',
                path: '/user/myactivity',
                label: '我报名的活动',
                icon: 'Location',
                key: '2-1',
                children:[
                    {
                        name: 'mymes',
                        path: '/user/willactivity',
                        label: '即将开始的活动',
                        icon: 'Location',
                        key: '2-1-1',
                    },
                    {
                        name: 'mymes',
                        path: '/user/havedone',
                        label: '已经完成活动',
                        icon: 'Location',
                        key: '2-1-2',
                    }
                ]
            },
            {
                name: 'mymes',
                path: '/user/mymes',
                label: '我的消息',
                icon: 'Setting',
                key: '2-2'
            }
        ]
    },
    {
        path: '/user/other',
        name: "other",
        icon: 'QuestionFilled',
        label: "其他",
        key: '3'
    },
]
let adminList = [
    {
        label: '首页',
        path:'/admin/home',
        icon: 'Document',
        key: '1',
    },
    {
        label: '活动管理',
        path:'/admin/activitymanage',
        icon: 'QuestionFilled',
        key: '2',
        children: [
            {
                name: 'allactivity',
                path: '/admin/allactivity',
                label: '所有活动',
                icon: 'Location',
                key: '2-1',
            },
            {
                name: 'myactivity',
                path: '/admin/myactivity',
                label: '我发布的活动',
                icon: 'QuestionFilled',
                key: '2-1-1',
            },
        ]
    },
    {
        label: '学生管理',
        path:'/admin/studentmanage',
        icon: 'Document',
        key: '2',
        children: [
            {
                name: 'allstudent',
                path: '/admin/allstudent',
                label: '所有学生信息',
                icon: 'Location',
                key: '2-1',
            },
            {
                name: 'myactimportstudentivity',
                path: '/admin/importstudent',
                label: '导入学生',
                icon: 'Location',
                key: '2-1-1',
            },
        ]
    },     
    
    {
        name: 'other',
        path: '/admin/other',
        label: '其他',
        icon: 'Setting',
        key: '2-2'
    }
]
// 根据role显示菜单
let menuList = computed(()=>{
    if(role.value=='admin')
    return adminList
    else return userList
})

let route =  useRoute()

// 默认选择菜单第一项
let defaultActive= computed<string>(()=>{
    return route.path
})

interface itemType {
    path?: string,
    name?: string,
    icon: string,
    label: string,
    key: string,
    children?:any,
}

let headerStore = useHeaderStore()

let toRouter = (item: itemType) => {
    if(item.path){
        headerStore.changeTitle(item.label)
        headerStore.addTag({
            label:item.label,
            path:item.path,
            close:true,
            type:'info'
        })
    }
}

let asideWidth:ComputedRef<string> = computed(()=>{
    return !isCollapse.value?"220":"80"
})
</script>
<template >
    <el-aside :width="asideWidth+ 'px'" class="aside">
        
        <div class="title animate__animated animate__backInLeft" v-if="!isCollapse" >
            志愿云服务系统
        </div>
        <div class="title animate__animated animate__backInRight" v-else="isCollapse">后台</div>

        <section>
            
            <el-menu 
                router
                :default-active="defaultActive"
                :collapse="isCollapse" 
                class="el-menu-vertical-demo menu"
                active-text-color="#ffd04b"
                :collapse-transition="false"
                background-color="#1d1e1f" text-color="#fff"
                >
                <template v-for="val in menuList">
                    <el-sub-menu :index="val.path" v-if="val.children && val.children.length > 0" :key="val.key">
                        <template #title>
                            <el-icon>
                                <component :is="val.icon"></component>
                            </el-icon>
                            <span>{{ val.label }}</span>
                        </template>
                        <ChildMenu :childs="val.children" @toRouter="toRouter" />
                    </el-sub-menu>
                    
                    <template v-else>
                        <el-menu-item :index="val.path" :key="val.key" @click="toRouter(val)">
                            <el-icon>
                                <component :is="val.icon"></component>
                            </el-icon>
                            <template #title>
                                <span>{{ val.label }}</span>
                            </template>
                        </el-menu-item>
                    </template>
                </template>
                <!-- <el-sub-menu v-for="item in hasChildList" :key=item.key :index="item.key">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span class="label">{{ item.label }}</span>
                    </template>
                    <el-menu-item-group class="menuGroup" title="子菜单">
                        <el-menu-item v-for="child in item.children" :key="child.key" :index="child.key"
                            @click="toRouter(child)">
                    
                            <template #title> 
                                <el-icon>
                                    <component :is="child.icon"></component>
                                </el-icon>
                                <span class="label">{{ child.label }}</span>
                            </template>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>


                <el-menu-item :title="item.name" v-for="item in noChildList" :key="item.key" :index="item.key" @click="toRouter(item)">
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <template #title> <span class="label">{{ item.label }}</span></template>
                </el-menu-item> -->
            </el-menu>
        </section>

    </el-aside>

</template>
<style lang="less">
.aside{
    transition: all 0.5s linear;
    overflow: hidden;
}
.title {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #fff;
    line-height: 60px;
}
.menu{
    border: 0px;
}
</style>