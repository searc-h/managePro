import { defineStore } from 'pinia';
import { reqGetTableData ,reqGetCardsData } from '@/api/api'


export const useAdminStore = defineStore('AdminStore', {
	state: (): any=> ({
		tableList:[],
		cardsList:[]
	}),
	actions: {
		async getTableData(){
			let result = <any>await reqGetTableData()
			if(result.code === 200){
				this.tableList = result.data.tableData
				return result.data
			}
		},

		async getCardsData(){
			let result = <any>await reqGetCardsData()
			if(result.code === 200){
				this.cardsList = result.data.cardsData
				return result.data
			}
		}
	},
});