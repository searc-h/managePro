<script setup lang="ts">

import { useHeaderStore } from '@/stores'
import {storeToRefs} from 'pinia'
import {useRouter} from 'vue-router'

let router = useRouter()
let headerStore = useHeaderStore()
let {tagList ,currentTagLabel} = storeToRefs(headerStore)
interface tagType {
    path:string,
    label:string
}

const handleClose = (tag: tagType , index:number) => {
    let res = headerStore.deleteTagItem(tag,index)
    if(res){
        router.replace(res.path)
    }
}
const clickTag = (tag:tagType)=>{
    if(tag.label===currentTagLabel.value) return
    else{
        headerStore.changeTagType(tag)
        router.push(tag.path)
    }
}

</script>

<template>
    <el-tag
            v-for="(tag,index) in tagList"
            :key="tag"
            class="mx-1 tag"
            :closable="tag.close"
            :type="tag.type"
            :disable-transitions="false"
            @close="handleClose(tag,index)"
            @click="clickTag(tag)"
        >
            {{ tag.label }}
    </el-tag>
</template>