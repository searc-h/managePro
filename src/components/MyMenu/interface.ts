
// 子菜单item类型接口
export interface childItem {
    name: string,
    path: string,
    label: string,
    icon: string,
    key: string
    children?: childItem[]
}


// 点击菜单传递参数的类型接口
export interface itemType {
    path?: string,
    name?: string,
    icon: string,
    label: string,
    key: string,
    children?:any,
}
