import Mock from 'mockjs'

import {getTableData} from './home.js'

// 拦截请求
Mock.mock('/admin/getTableData' , getTableData)