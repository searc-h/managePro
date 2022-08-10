import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name:'/',
      redirect:'/login'
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
      path:'/login',
      name:'login',
      component : () => import('../pages/Login/index.vue')
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
export default router


