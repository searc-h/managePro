import request  from "./request";
// 获取admin首页列表数据
export const reqGetTableData = ()=>{
    return request({
        url:'/admin/getTableData',
        method:'get',
        mock:true 
    })
}
export const reqGetCardsData = ()=>{
    return request({
        url:"/admin/getCardsData",
        method:'GET',
        mock:true
    })
}