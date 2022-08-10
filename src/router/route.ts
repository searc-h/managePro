import type { RouteRecordRaw } from "vue-router";

export const dynamicUserRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: "/",
        redirect: '/user',
        children: [
            {
                path: '/user',
                redirect: '/user/allactivity',
                component: () => import('@/pages/User/index.vue'),
                children: [
                    {
                        path: 'allactivity',
                        name: 'allactivity',
                        component: () => import('@/views/users/MyHome.vue')
                    },
                    {
                        path: 'other',
                        name: 'other',
                        component: () => import('@/views/users/Other.vue')
                    },
                    {
                        path: 'willactivity',
                        name: 'willactivity',
                        component: () => import('@/views/users/WillActive.vue')
                    },
                    {
                        path: 'havedone',
                        name: 'havedone',
                        component: () => import('@/views/users/HaveDone.vue')
                    },
                    {
                        path: 'mymes',
                        name: 'mymes',
                        component: () => import('@/views/users/MyMes.vue')
                    }
                ]
            },
        ]
    }
]

export const dynamicAdminRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: "/",
        redirect: '/admin',
        children: [
            {
                path: '/admin',
                redirect: '/admin/home',
                component: () => import('@/pages/Main/index.vue'),
                children: [
                    {
                        path: 'home',
                        name: 'home',
                        component: () => import('@/views/admin/MyHome.vue')
                    },
                    {
                        path: 'allactivity',
                        name: 'allactivity',
                        component: () => import('@/views/admin/ActivityManage/AllActivity.vue')
                    },

                    {
                        path: 'myactivity',
                        name: 'myactivity',
                        component: () => import('@/views/admin/ActivityManage/MyActivity.vue')
                    },

                    {
                        path: 'allstudent',
                        name: 'allstudent',
                        component: () => import('@/views/admin/StudentManage/AllStudent.vue')
                    },


                    {
                        path: 'importstudent',
                        name: 'mymes',
                        component: () => import('@/views/admin/StudentManage/ImportStudent.vue')
                    },

                    {
                        path: 'other',
                        name: 'other',
                        component: () => import('@/views/admin/Other.vue')
                    },
                ]
            },
        ]
    }
]