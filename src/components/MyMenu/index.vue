<script setup lang="ts">
import { useRouter  } from 'vue-router';
import { computed, type ComputedRef } from 'vue';
import { storeToRefs } from 'pinia'
import { useMenuStore,useHeaderStore } from '../../stores'

let menuStore = useMenuStore()
let {isCollapse} = storeToRefs(menuStore)

let menuList = [
    {
        path: "/user/allactivity",
        name: 'allactivity',
        icon: 'DocumentCopy',
        label: '全部活动',
        key: '1'
    },
    {
        label: '我的',
        icon: 'Document',
        key: '2',
        children: [
            {
                name: 'mymes',
                path: '/user/myactivity',
                label: '我报名的活动',
                icon: 'Location',
                key: '2-1'
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

let hasChildList = computed(() => {
    return menuList.filter(item => {
        return item.children ? true : false
    })
})
let noChildList = computed(() => {
    return menuList.filter(item => {
        return item.children ? false : true
    })
})

interface itemType {
    path?: string,
    name?: string,
    icon: string,
    label: string,
    key: string
}

let router = useRouter()
let headerStore = useHeaderStore()

let toRouter = (item: itemType) => {
    if(item.path){
        router.push(item.path)
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
            <el-menu default-active="1"
                :collapse="isCollapse" 
                class="el-menu-vertical-demo menu"
                active-text-color="#ffd04b"
                :collapse-transition="false"
                background-color="#1d1e1f" text-color="#fff"
                >
                <el-sub-menu v-for="item in hasChildList" :key=item.key :index="item.key">
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
                </el-menu-item>
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