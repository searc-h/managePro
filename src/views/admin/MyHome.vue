<template>
    <div class="myhome">
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card class="box-card" shadow="hover">
                    <template #header>
                        <div class="card-header">
                            <span>
                                <el-avatar :size="150" src="https://empty">
                                    <img src="https://source.unsplash.com/random/150x150" alt="头像">
                                </el-avatar>
                            </span>
                            <div class="btn">
                                <el-button class="button">修改头像</el-button>
                                <el-button class="button">修改昵称</el-button>
                            </div>
                        </div>
                    </template>

                    <div class="time">上次登陆时间：2022-10-10</div>

                </el-card>

                <el-card class="box-card" shadow="hover"  >
                     <el-table :data="tableList" height="400" stripe style="width: 100%">
                        <el-table-column prop="name" label="Name" />
                        <el-table-column prop="todayBuy" label="TodayBuy" />
                        <el-table-column prop="monthBuy" label="MonthBuy"/>
                        <el-table-column prop="totalBuy" label="TotalBuy" />
                    </el-table>
                </el-card>

                <el-card class="box-card" shadow="hover">
                    <el-scrollbar>
                        <div class="scrollbar-flex-content">
                        <p v-for="item in 50" :key="item" class="scrollbar-demo-item">
                            {{ item }}
                        </p>
                        </div>
                    </el-scrollbar>
                </el-card>

            </el-col>

            <el-col :span="16">
                <el-row>
                    <div class="cards">
                        <template v-for="(item,index) in cardsList" :key="index" >
                            <MyCard :cardItem="{...item , num:index+1}"/>
                        </template>
                    </div>
                </el-row>
                <el-row>
                    <el-card class="discount-chart chart">
                        <div id="discount">
                            
                        </div>
                    </el-card>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12" >
                        <el-card class="bar-chart chart">
                            柱状图
                        </el-card>
                    </el-col>
                    
                    <el-col :span="12">
                        <el-card class="pie-chart chart">
                            饼状图
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import MyCard from '@/components/MyCard/index.vue'
import {pinia , useAdminStore} from '@/stores'
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

let adminStore = useAdminStore(pinia)
let {tableList , cardsList} = storeToRefs(adminStore)

let getTableList =  ()=>{
    adminStore.getTableData()
}
let getCardsList = ()=>{
    adminStore.getCardsData()
}
onMounted(()=>{
    getTableList()
    getCardsList()
})

</script>
<style lang="less">
.myhome {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .box-card:nth-child(1) {
        margin-bottom: 20px;

        .card-header {
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 100%;

            .btn {
                display: flex;
                flex-direction: column;
                height: 100px;
                justify-content: space-between;

                .el-button {
                    margin: 0px;
                }
            }
        }

        .time {
            line-height: 60px;
            width: 100%;
            text-align: center;
        }
    }

    .cards{
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
    }

    .box-card:nth-child(3){
        margin-top: 10px;
        .scrollbar-flex-content {
            display: flex;
            }
            .scrollbar-demo-item {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100px;
            height: 50px;
            margin: 10px;
            text-align: center;
            border-radius: 4px;
            background: var(--el-color-danger-light-9);
            color: var(--el-color-danger);
        }
    }
    
    .chart{
        width: 100%;
        height: 260px;
        margin-top: 10px;
    }
}

</style>