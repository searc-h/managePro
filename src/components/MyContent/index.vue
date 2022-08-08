<template >
    <div class="content">

        <Suspense>
            <template v-slot:default>
                <router-view></router-view>
            </template>
            <template v-slot:fallback>
                <h1>加载中.....</h1>
            </template>
        </Suspense>

    </div>
</template>
<script setup lang="ts">
import { Suspense } from 'vue';
</script>
<style lang="less">
.content {
    width: 100%;
    height: 95%;
    background-color: rgb(240, 240, 240);
}
</style>