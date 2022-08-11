import { useMenuStore } from './menu.Store'
import { useHeaderStore } from './header.Store'
import { useRouteStore } from './route.Store'
import { useAdminStore } from './admin.Store'
import { createPinia } from 'pinia' 

let pinia = createPinia()
export {
    pinia,
    useMenuStore,
    useHeaderStore,
    useAdminStore,
    useRouteStore
}