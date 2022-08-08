import { defineStore } from 'pinia';

interface tagType {
	path:string,
	label:string,
	type:string,
	close:boolean
}
export const useHeaderStore = defineStore('headerStore', {
	state: (): any=> ({
		title:"全部活动",
		currentTagLabel:"全部活动",
		tagList:[
			{
				path:'/user/allactivity',
				label:'全部活动',
				close:false, //这里确保第一个永远不会被删除，简化删除tag时，如何选择下一个tag的难题
				type:''
			},
			// {
			// 	path:'/user/myactivity',
			// 	label:'我报名的活动',
			// 	close:true,
			// 	type:'info'
			// },
			// {
			// 	path:'/user/mymes',
			// 	label:'我的消息',
			// 	close:true,
			// 	type:'info'
			// },
			// {
			// 	path:'/user/other',
			// 	label:'其他',
			// 	close:true,
			// 	type:'info'
			// }
		]
	}),
	actions: {

        changeTitle(data:string){
			this.title = data
		},

		// 点击菜单 新增/选择 tag
		addTag(tagItem:tagType){
			if(this.tagList.find((item:tagType)=>{
				return item.label == tagItem.label
			})){

			}else{
				this.tagList.push(tagItem)
			}

			this.changeTagType(tagItem)
			this.changeTitle(tagItem.label)
		},

		// 改变选中
		changeTagType(tagItem:tagType){

			this.currentTagLabel = tagItem.label

			this.tagList = this.tagList.map((item:tagType)=>{
				if(item.label===tagItem.label)
				{
					item.type = ''
					return item
				}else{
					item.type = 'info'
					return item
				}
			})

			
			this.changeTitle(tagItem.label)
		},

		// 删除tag (删除当前tag / 删除不在当前的tag)
		deleteTagItem(tagItem:tagType , index:number){
			if(tagItem.label===this.currentTagLabel){
				this.tagList.splice(index,1)
				this.changeTagType(this.tagList[index-1])
				return this.tagList[index-1]
			}else{
				this.tagList.splice(index,1)
				return false
			}
		}
	},
});