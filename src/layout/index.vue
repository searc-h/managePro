<script setup lang="ts">

import MyMenu from '../components/MyMenu/index.vue'
import MyHeader from '../components/MyHeader/index.vue'
import MyTag from '../components/MyTag/index.vue'


import {defineAsyncComponent} from 'vue'
const MyContent = defineAsyncComponent(()=>import('../components/MyContent/index.vue'))

</script>

<template>
  <div class="common-layout">
    <el-container class="container">

      <MyMenu />

      <el-container>

        <el-header class="header">
          <MyHeader />
        </el-header>

        <el-main class="main-content">

          <MyTag />

          <Suspense>
              <template v-slot:default>
                  <MyContent/>
              </template>
              <template v-slot:fallback>
                  <h1>加载中.....</h1>
              </template>
          </Suspense>


        </el-main>

      </el-container>

    </el-container>
  </div>
</template>
<style lang="less">
@bgColor: #1d1e1f;

@color: #fff;

.common-layout {
  height: 100vh;

  .container {
    height: 100%;
    display: flex;
    flex-wrap: nowrap;


    .header {
      height: 80px;
      padding: 0px;
    }

    .aside {
      height: 100%;
      background-color: @bgColor;
    }

    .main-content {
      width: 100%;
      height: 100%;

      .tag {
        margin-bottom: 10px;
        margin-right: 10px;
        font-size: 17px;
        cursor: pointer;
      }
    }
  }
}
</style>