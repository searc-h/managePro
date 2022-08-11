import { defineStore } from 'pinia';

interface tagType {
	path: string,
	label: string,
	type: string,
	close: boolean
}
export const useHeaderStore = defineStore('headerStore', {
	state: (): any => ({
		title: "全部活动",
		currentTagLabel: "全部活动",
		tagList: []
	}),
	actions: {

		changeTitle(data: string) {
			this.title = data
		},

		// 点击菜单 新增/选择 tag
		addTag(tagItem: tagType) {
			if (this.tagList.find((item: tagType) => {
				return item.label == tagItem.label
			})) {

			} else {
				this.tagList.push(tagItem)
			}

			this.changeTagType(tagItem)
			this.changeTitle(tagItem.label)
			// 新增时缓存
			sessionStorage.setItem('tagList', JSON.stringify(this.tagList))
		},

		// 改变选中
		changeTagType(tagItem: tagType) {

			this.currentTagLabel = tagItem.label

			this.tagList = this.tagList.map((item: tagType) => {
				if (item.label === tagItem.label) {
					item.type = ''
					return item
				} else {
					item.type = 'info'
					return item
				}
			})


			this.changeTitle(tagItem.label)
		},

		// 删除tag (删除当前tag / 删除不在当前的tag)
		deleteTagItem(tagItem: tagType, index: number) {
			if (tagItem.label === this.currentTagLabel) {
				this.tagList.splice(index, 1)
				this.changeTagType(this.tagList[index - 1])
				
				// 删除时缓存
				sessionStorage.setItem('tagList', JSON.stringify(this.tagList))
				return this.tagList[index - 1]
			} else {
				this.tagList.splice(index, 1)
				
				// 删除时缓存
				sessionStorage.setItem('tagList', JSON.stringify(this.tagList))
				return false
			}
		},

		// 清除tagList
		clearTagList() {
			sessionStorage.clear()
		},

		// 修改tagList(页面刷新tagList丢失问题---缓存)
		setTagList(role?:boolean){
			if(role && typeof role == 'boolean') {
				let initTagList = [
					{
						path: '/admin/home',
						label: '首页',
						close: false, //这里确保第一个永远不会被删除，简化删除tag时，如何选择下一个tag的难题
						type: ''
					},
				]
				this.tagList = initTagList
				this.title = '首页'
				this.currentTagLabel = '首页'
				sessionStorage.setItem('tagList',JSON.stringify(initTagList))
				return
			}
			if(!role && typeof role == 'boolean'){
				let initTagList = [
					{
						path: '/user/allactivity',
						label: '全部活动',
						close: false, //这里确保第一个永远不会被删除，简化删除tag时，如何选择下一个tag的难题
						type: ''
					},
				]
				this.tagList = initTagList
				this.title = '全部活动'
				this.currentTagLabel = '全部活动'
				sessionStorage.setItem('tagList',JSON.stringify(initTagList))
				return
			}
			
			this.tagList = JSON.parse(sessionStorage.getItem('tagList') || '[]') // 刷新页面
		}
	},
});