import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      redirect:'/user'
    },
    {
      path:'/user',
      redirect:'/user/allactivity',
      component:()=>import('@/pages/User/index.vue'),
      children:[
        {
          path:'allactivity',
          name:'allactivity',
          component:()=>import('@/views/users/MyHome.vue')
        },
        {
          path:'other',
          name:'other',
          component:()=>import('@/views/users/Other.vue')
        },
        {
          path:'myactivity',
          name:'myactivity',
          component:()=>import('@/views/users/MyActive.vue')
        },
        {
          path:'mymes',
          name:'mymes',
          component:()=>import('@/views/users/MyMes.vue')
        }
      ]
    },
    {
      path:'/login',
      name:'login',
      component : () => import('../pages/Login/index.vue')
    }
  ]
})

export default router
