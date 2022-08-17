<template>
    <div class="account">
        <el-form size="large" class="login-content-form">
            <el-form-item class="login-animation1">
                <el-input v-model="loginForm.username" clearable autocomplete="off">
                    <template #prefix>
                        <el-icon class="el-input__icon"><User /></el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item class="login-animation2">
                <el-input class="login-password" v-model="loginForm.password" :type="isShowPassword?'text':'password'" autocomplete="off">
                    <!-- 前缀 -->
                    <template #prefix>
                        <el-icon class="el-input__icon"><Unlock/></el-icon>
                    </template>

                    <!-- 后缀 -->
                    <template #suffix>
                        <el-icon class="login-content-password" @click="isShowPassword = !isShowPassword"><Hide v-if="isShowPassword"/> <View v-else/></el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item class="login-animation3">
                <el-col :span="15">
                    <el-input v-model="loginForm.code">
                        <template #prefix>
                            <el-icon class="el-input__icon"><Position /></el-icon>
                        </template>
                    </el-input>
                </el-col>
                <el-col :span="1">

                </el-col>
                <el-col :span="8">
                    <el-button class="login-content-code">1234</el-button>
                </el-col>
            </el-form-item>
            <el-form-item class="login-animation4">
                <el-button class="submit" type="primary" @click="()=>{login(false)}" :loading="loading">普通用户登陆</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>
<script setup lang="ts">
import { User, Unlock,Position ,Hide ,View} from '@element-plus/icons-vue';
import {useLogin} from '@/hooks/useLogin'
import { reactive, ref } from 'vue';
let {loading  , login} = useLogin()

interface loginType{
    password:string,
    username:string,
    code:string
}
let isShowPassword = ref<boolean>(false)

let loginForm = reactive<loginType>({
    username:'admin',
    password:'admin',
    code:'1234'
})
</script>
<style lang="less" scoped>
@count : 4;
@delay : 0.1s ,0.2s , 0.3s , 0.4s; //数组使用
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

.login-content-form {
	margin-top: 20px;
    letter-spacing: 2px;
    
    .loop(0);  //循环调用

	.login-content-password {
		display: inline-block;
		width: 20px;
		cursor: pointer;
		&:hover {
			color: #909399;
		}
	}
	.login-content-code {
		width: 100%;
		padding: 0;
		font-weight: bold;
		letter-spacing: 5px;
	}
	.submit {
		width: 100%;
		font-weight: 300;
		margin-top: 15px;
        letter-spacing: 5px;
        font-weight: 555;
        border-radius: 15px;
	}
}
</style>