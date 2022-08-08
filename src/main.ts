import { createApp } from 'vue'
import { createPinia } from 'pinia' 

// 使用mock拦截对应请求
import '@/api/mockApi/mock.js'

// base.css
import '@/assets/main.css'

// 完整引入---不考虑打包后的大小
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'   
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


import App from './App.vue'
import router from './router'

import 'animate.css';


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.mount('#app')
