
const env:string = import.meta.env.MODE || "prod"

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
    prod: {
        baseApi:'/prod',
        mockApi:'https://www.fastmock.site/mock/bf81531e39f254bba7977b6c44976ff4/api'
    },
}

export default {

    env,

    mock:true, //mock是否使用的开关

    ...EnvConfig[env]
}