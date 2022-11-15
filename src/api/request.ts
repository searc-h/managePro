import axios from 'axios'
import { ElMessage } from 'element-plus';
import config from '@/env/index.js'

// 配置新建一个 axios 实例
const service = axios.create({
	baseURL: config.baseApi,
	timeout: 50000,
	headers: { 'Content-Type': 'application/json' },
});

// 添加请求拦截器
service.interceptors.request.use(
	(config) => {
		// 在发送请求之前做些什么 token
		// if (Session.get('token')) {
		// 	(config.headers).common['Authorization'] = `${Session.get('token')}`;
		// }
		return config;
	},
	(error) => {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

interface resType{
	code : string | number,
	message ?: string | number
	data:any
}
// 添加响应拦截器
service.interceptors.response.use(
	(response) => {
		// 对响应数据做点什么
		const res = response.data

        if(res.code === 200)
            return response.data
        else {
            ElMessage.error('网络返回不是200');
        }
	},


	(error) => {
		// 对响应错误做点什么
		if (error.message.indexOf('timeout') != -1) {
			ElMessage.error('网络超时');
		} else if (error.message == 'Network Error') {
			ElMessage.error('网络连接错误');
		} else {
			if (error.response.data) ElMessage.error(error.response.statusText);
			else ElMessage.error('接口路径找不到');
		}
		return Promise.reject(error);
	}
);

interface optionType{
	method : string,
	url : string,
	mock? :boolean,
	data?:any,
	params?:any
}
function request(options:optionType){

    // 默认get请求
    options.method = options.method || 'get'
    
    // 配置环境中的mock开关---服从于单个请求的mock开关
    let isMock = config.mock
    if(typeof options.mock!== 'undefined')
    {
        // 单个请求的mock开关
        isMock = options.mock
    }

    // 线上环境不使用mock
    if(config.env === 'prod'){
        // service.defaults.baseURL = config.baseApi
		service.defaults.baseURL = config.mockApi //这里指定了线上也用mockApi，只是在vercel上测试一下而已，没有搭建后台服务
		console.log("不适用线上Mock接口 baseURL is :",service.defaults.baseURL)
    } else {
        // 根据isMock开关来决定baseURL
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
		console.log("用线上Mock接口 baseURL is :",service.defaults.baseURL)
    }

	return service(options)
}

// 导出 axios 实例
export default request;