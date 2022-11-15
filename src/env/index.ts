
const env:string = import.meta.env.MODE
console.log("当前的开发环境是：" ,env)
interface apiType {
    baseApi: string,
    mockApi: string
}

const EnvConfig:Record<string , apiType> = {
    development: {
        baseApi:'/api',
        mockApi:'https://www.fastmock.site/mock/bf81531e39f254bba7977b6c44976ff4/api'
    },
    test: {
        baseApi:'/test',
        mockApi:'https://www.fastmock.site/mock/bf81531e39f254bba7977b6c44976ff4/api'
    },
    production: {
        baseApi:'/api',
        mockApi:'https://www.fastmock.site/mock/bf81531e39f254bba7977b6c44976ff4/api'
    },
}

export default {

    env,

    mock:true, //mock是否使用的开关

    ...EnvConfig[env]
}