<template>
    <el-card shadow="hover" class="card-box">
        <div class="left" >{{cardItem.num}}</div>
        <div class="right">
            <div class="count">{{cardItem.count}}</div>
            <div class="des">{{cardItem.des}}</div>
        </div>
    </el-card>
</template>
<script setup lang="ts">


interface cardType{
    num:number | string
    count:number | number,
    des:string 
}

interface Props{
    cardItem:cardType
}
defineProps<Props>()

</script>
<style lang="less">
    .card-box{
        width: 31%;
        margin: 5px 0px;
    }
    .el-card >.el-card__body{
        padding:  0px;
        display: flex ;
        justify-content: space-around;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .left{
            line-height: 100px;
            font-size: 30px;
            font-size: 766;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgb(147, 214, 229);
            width: 100px;
        }
        .right{
            height: 100px;
            min-width: 100px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .count{
                font-size: 25px;
                font-weight: 888;
            }
            .des{
                font-size: 14px;
                color: rgb(134, 137, 140);
            }
        }   
        
    }
</style>