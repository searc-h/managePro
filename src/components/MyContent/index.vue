<template >
    <div class="content">

        <router-view v-slot="{ Component}">
           <template v-if="Component">
                <transition name="fade" mode="out-in">
                    <keep-alive>
                        <component :is="Component"></component>
                    </keep-alive>
                </transition>
            </template>
        </router-view>

    </div>
</template>
<script setup lang="ts">

</script>
<style lang="less">
.content {
    width: 100%;
    height: 95%;
    background-color: rgb(240, 240, 240);
    overflow: hidden;
}

// 淡出淡入
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform:translateX(30px)
}
</style>