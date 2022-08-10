import { createRouter, createWebHistory } from 'vue-router'
import { dynamicAdminRoutes, dynamicUserRoutes } from './route'
import { useRouteStore  } from '@/stores'
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '/',
      redirect: '/login'
    },

    // // user路由
    // {
    //   path:'/user',
    //   redirect:'/user/allactivity',
    //   component:()=>import('@/pages/User/index.vue'),
    //   children:[
    //     {
    //       path:'allactivity',
    //       name:'allactivity',
    //       component:()=>import('@/views/users/MyHome.vue')
    //     },
    //     {
    //       path:'other',
    //       name:'other',
    //       component:()=>import('@/views/users/Other.vue')
    //     },
    //     {
    //       path:'willactivity',
    //       name:'willactivity',
    //       component:()=>import('@/views/users/WillActive.vue')
    //     },
    //     {
    //       path:'havedone',
    //       name:'havedone',
    //       component:()=>import('@/views/users/HaveDone.vue')
    //     },
    //     {
    //       path:'mymes',
    //       name:'mymes',
    //       component:()=>import('@/views/users/MyMes.vue')
    //     }
    //   ]
    // },


    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/Login/index.vue')
    },


    // // admin路由
    // {
    //   path:'/admin',
    //   redirect:'/admin/home',
    //   component:()=>import('@/pages/Main/index.vue'),
    //   children:[
    //     {
    //       path:'home',
    //       name:'home',
    //       component:()=>import('@/views/admin/MyHome.vue')
    //     },
    //     {
    //       path:'allactivity',
    //       name:'allactivity',
    //       component:()=>import('@/views/admin/ActivityManage/AllActivity.vue')
    //     },

    //     {
    //       path:'myactivity',
    //       name:'myactivity',
    //       component:()=>import('@/views/admin/ActivityManage/MyActivity.vue')
    //     },

    //     {
    //       path:'allstudent',
    //       name:'allstudent',
    //       component:()=>import('@/views/admin/StudentManage/AllStudent.vue')
    //     },


    //     {
    //       path:'importstudent',
    //       name:'mymes',
    //       component:()=>import('@/views/admin/StudentManage/ImportStudent.vue')
    //     },

    //     {
    //       path:'other',
    //       name:'other',
    //       component:()=>import('@/views/admin/Other.vue')
    //     },
    //   ]
    // },
  ]
})

export const initRouteByAddroute = () => {
  let routeStore = useRouteStore()

  return new Promise((resolve  , reject)=>{
    // router.removeRoute('/')
    if (sessionStorage.getItem('role')=='admin') {
      router.addRoute(dynamicAdminRoutes[0])
      router.addRoute(dynamicAdminRoutes[1])
      routeStore.setRouteList(dynamicAdminRoutes[1].children)
      resolve(200)
    } else if(sessionStorage.getItem('role')=='user'){
      router.addRoute(dynamicUserRoutes[0])
      router.addRoute(dynamicUserRoutes[1])
      routeStore.setRouteList(dynamicUserRoutes[1].children)
      resolve(200)
    }
    else{
      resolve(201)
    }
  })
}

router.beforeEach(async (to ,from ,next)=>{
  // 未登陆状态 去 登陆页面---放行
  if(to.path=='/login'&& !sessionStorage.getItem('role')){
    next()
  }else{
    // 未登陆 去 别的页面 --- 重定向
    if(!sessionStorage.getItem('role')){
      next(`/login?redirect=${to.path}&params=${JSON.stringify(to.query ? to.query : to.params)}`);

    } 
    // 登陆了 去 登录页 --- 阻止
    else if(sessionStorage.getItem('role') && to.path=='/login'){
      next('/');
    }
    // 登陆了  去 别的页面---放行
    else{
      let routeStore =  useRouteStore()
      let {routeList} = storeToRefs(routeStore)
      if(routeList.value.length === 1){
        initRouteByAddroute()
        next({ ...to, replace: true }); //此时就要使用next({ ...to, replace: true })来确保addRoute()时动态添加的路由已经被完全加载上去。
        // 如果守卫中没有正确的放行出口的话，会一直next({ ...to})进入死循环 !!!
      }else{
        next();
      }
    }
  }
})


export default router


