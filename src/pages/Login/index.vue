<script setup lang="ts">
import Mobile from './components/Mobile.vue';
import Account from './components/Account.vue'
import { ref } from 'vue';

let tabsActiveName = ref<string>("account")

</script>

<template>
    <div class="login-container">
        <el-tabs v-model="tabsActiveName" class="demo-tabs">
            <el-tab-pane label="账户登录" name="account">
                <Account />
            </el-tab-pane>
            <el-tab-pane label="手机登录" name="mobile">
                <Mobile />
            </el-tab-pane>
        </el-tabs>
        
    </div>
</template>

<style lang="less">
.login-container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .demo-tabs{
        width: 500px;
        height: 400px;
        padding: 10px 40px;
        border: 4px rgba(148, 193, 232,0.7) solid;

        .tab1{
            width: 100%;
            padding: 20px;
            background-color: red;
        }
    }
}
</style>