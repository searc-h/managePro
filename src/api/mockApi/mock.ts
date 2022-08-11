import Mock from 'mockjs'

import {getTableData ,getCardsData} from './home.js'

// 拦截请求 -- 本地mock
Mock.mock('/admin/getTableData' , getTableData)
Mock.mock('/admin/getCardData',getCardsData)