## Init the vue3 + Ts + vite
```
    npm init vue@lates
```

### 更新：
    - element-plus使用

    - transition + Animate.css动画使用

    - Tag标签逻辑

    - 后端菜单 + 动态路由逻辑

    - 随机深度的菜单生成----高阶组件使用

    - 本地mock + 线上mock的使用（axios的二次封装）

### git
    - 删除本地分支 切换到其他的分支  git branch -d 分支名
    - 修改分支名称 切换到要修改名称的分支  git branch -M main （把默认的master分支修改为main分支，避免提交到远程仓库新建分支）


### 后端返回路由
```bash
    # vite提供的批量导入
    const layouModules: any = import.meta.glob("../layout/routerView/*.{vue,tsx}");
    const viewsModules: any = import.meta.glob("../views/**/*.{vue,tsx}");

    layouModules:{

        'url':()=>import , 

        '../layout/...':()=>import('../layout/..'),
        '../views/...' :()=>import('../views/..')
        ......
    }

    const dynamicViewsModules: Record<string, Function> = Object.assign({}, { ...layouModules }, { ...viewsModules });

   
    routes:
    // 后端返回菜单格式
    {
        path: '/menu',
        component: 'layout/routerView/parent', 
        redirect: '/menu/menu1',
        children: [
            {
            path: '/menu/menu1',
            component: 'layout/routerView/parent',
            redirect: '/menu/menu1/menu11',
            children: [
                {
                    path: '/menu/menu1/menu11',
                    name: 'menu11',
                    component: 'menu/menu1/menu11/index',
                },
                ]
            }
        ]
    }

    /**
    * 后端路由 component 转换
    * @param routes 后端返回的路由表数组
    * @returns 返回处理成函数后的 component
    */
    export function backEndComponent(routes: any) {
        if (!routes) return;
        return routes.map((item: any) => {
            if (item.component)
            item.component = dynamicImport(
                dynamicViewsModules,  
                item.component as string   '/menu' 或者 'menu/menu1'...
            );
            item.children && backEndComponent(item.children); # 递归调用
            return item;
        });
    }



    /**
    * 后端路由 component 转换函数
    * @param dynamicViewsModules 获取目录下的 .vue、.tsx 全部文件
    * @param component 当前要处理项 component
    * @returns 返回处理成函数后的 component
    */
    export function dynamicImport(
        dynamicViewsModules: Record<string, Function>,  # { "../views/...":()=>import() }
        component: string   #后端返回的文件位置 'menu/menu1/menu11/index', '/menu' 或者 'menu/menu1'...
    ) {
        const keys = Object.keys(dynamicViewsModules);    #  ['../views/menu/menu1','../views/menu/menu1/menu11']
        const matchKeys = keys.filter((key) => {          # key :'../views/menu' 
            const k = key.replace(/..\/views|../, "");    // 将url中 '../views'或者'../' 替换成 ""
            return k.startsWith(`${component}`) || k.startsWith(`/${component}`);  //得到以
        });

        // matchKey : '../views/menu/menu1'
        if (matchKeys?.length === 1) {
            const matchKey = matchKeys[0];
            return dynamicViewsModules[matchKey];
        }
        if (matchKeys?.length > 1) {
            return false;
        }
    }
```