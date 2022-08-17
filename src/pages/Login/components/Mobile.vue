<template>
    <div class="mobile">
        <el-form class="login-content-form" size="large">
            <el-form-item class="login-animation1">
                <el-input placeholder="请输入你的手机号" v-model="loginData.phone">
                    <template #prefix>
                        <el-icon>
                            <el-icon><Iphone /></el-icon>
                        </el-icon>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item class="login-animation2">
                <el-col :span="15">
                    <el-input placeholder="输入验证码" v-model="loginData.code">
                        <template #prefix>
                            <el-icon>
                                <el-icon><Position /></el-icon>
                            </el-icon>
                        </template>
                    </el-input>
                </el-col>
                <el-col :span="1"></el-col>

                <el-col :span="8">
                    <el-button class="getcode">
                        获取验证码
                    </el-button>
                </el-col>
            </el-form-item>

            <el-form-item class="login-animation3">
                <el-button class="submit" type="primary" @click="()=>{login(true)}" :loading="loading">管理员登陆</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup lang="ts">
import {Iphone , Position} from '@element-plus/icons-vue'
// 导入自定义hook
import {useLogin} from '@/hooks/useLogin'
import { reactive } from 'vue';

// 使用自定义hook
let {loading  , login} = useLogin()

interface loginType{
    code:string,
    phone:string
}
let loginData = reactive<loginType>({
    code:"1234",
    phone:""
})

</script>
<style lang="less" scoped>
@count : 3;
@delay : 0.1s ,0.2s , 0.3s; //数组使用
.loop(@index) when (@index <= @count ){  //loop循环定义
    
    .login-animation@{index}{
        opacity: 0;
        animation-name: error-num;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
        // extract(数组，下标)
        animation-delay: extract(@delay, @index);
    }

    .loop(@index + 1)  //递归实现循环
}

.login-content-form{
    margin-top: 20px;
    letter-spacing: 2px;

    .loop(0);

    .getcode{
        width: 100%;
    }
    .submit{
        width: 100%;
        
    }
}
</style>