import { defineStore } from "pinia";

export const useRouteStore = defineStore('routeStore', {
    state : ():any=>({
        routeList: Array<any>
    }),

    actions: {
        setRouteList(list:Array<any>){
            this.routeList = list
        }
    }
})