import { useRouter  } from 'vue-router';
import {initRouteByAddroute} from '@/router/index'
import {NextLoading} from '@/utils/loading'
import { useHeaderStore } from '@/stores';
import { ref, type Ref } from 'vue';

interface returnType{
    login:(role:boolean)=> void,
    loading: Ref<boolean>
}

export function useLogin():returnType{

    let userouter = useRouter()
    let loading = ref<boolean>(false)
    let headerStore = useHeaderStore()

    let login = (role:boolean)=>{
        loading.value = true
        NextLoading.start()
        // 缓存role
        sessionStorage.setItem('role',role?"admin":'user')
        headerStore.setTagList(role)
        // 初始化路由
        initRouteByAddroute()

        setTimeout(() => {
            loading.value = false
            NextLoading.done()
            if(role){
                userouter.push('/admin')
            }else{
                userouter.push('/user')
            }
        }, 2000);
    }

    return {
        loading,
        login
    }
}

