import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menuStore', {
        state: (): any => ({
                isCollapse: false
        }),
        actions: {
                changeIsCollapse(data: boolean) {
                        console.log('the pinia store get the data:',data)
                        this.isCollapse = !data
                }
        },
});