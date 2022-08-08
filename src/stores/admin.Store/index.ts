import { defineStore } from 'pinia';
import { reqGetTableData } from '@/api/api'
export const useAdminStore = defineStore('AdminStore', {
	state: (): any=> ({
		tableList:[]
	}),
	actions: {
		async getTableData(){
			let result = <any>await reqGetTableData()
			if(result.code === 200){
				return result.data
			}
		}
	},
});