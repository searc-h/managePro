<template >
    <template v-for="val in childs">
        <el-sub-menu :index="val.key" :key="val.key" v-if="val.children && val.children.length > 0">
            <template #title>
                <el-icon>
                    <component :is="val.icon"></component>
                </el-icon>
                <span>{{ val.label }}</span>
            </template>
            <!-- 自己使用自己 -->
            <childMenu :childs="val.children"  @toRouter="changeRoute"/>
        </el-sub-menu>

        <template v-else>
            <el-menu-item :index="val.path" :key="val.path"  @click="changeRoute(val)">
                <el-icon>
                    <component :is="val.icon"></component>
                </el-icon>
                <template  #title>
                    <span>{{ val.label }}</span>
                </template>
            </el-menu-item>
        </template>
    </template>
</template>
<script setup lang="ts">

interface childItem {
    name: string,
    path: string,
    label: string,
    icon: string,
    key: string
    children?: childItem[]
}

type Props = {
    childs: childItem[]
}
// Ts + setup 接收Props写法：
defineProps<Props>()

// Ts + setup 接收自定义事件写法：
const emit = defineEmits<{
  (e: 'toRouter', child: childItem): void
}>()

const changeRoute = (child:childItem)=>{
    
    emit('toRouter' , child)
}
</script>
<style lang="less">
</style>