<template>
	<view >
		<u-swiper :list="slides" name="img_url" height="320rpx"></u-swiper>
		<view class="u-text-center u-m-t-25" >
			<u-tabs class="u-skeleton-fillet" :list="sortList" :current="currentSort" bar-width="120" item-width="120" @change="changeSort"></u-tabs>
		</view>
		<u-row gutter="16" class="u-skeleton">
			<u-col span="6" v-for="good in (goods.length!==0?goods:[{},{},{},{},{},{}])">
				<goods-card :good="good"></goods-card>
			</u-col>
		</u-row>
		<u-skeleton :loading="loading" :animation="loading" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				currentSort:0,
				categories:[],
				goods:[],
				slides:[],
				page:1,
				loading:false,
				goodId:null,
				sortList:[
					{name:'默认'},
					{name:'销量'},
					{name:'推荐'},
					{name:'最新'}
				]
			}
		},
		async onLoad(option) {
			
			let res=await this.$u.api.index();
			this.goods=res.goods.data;
			this.slides=res.slides;
			this.categories=res.categories;
		},
		methods: {
			changeSort(index){
				this.currentSort=index;
				// 判断 筛选条件
				this.goods=[];
				this.page=1;
				this.getData();
			},
			// 获取数据
			async getData(){
				this.loading=true;
				const params={
					page:this.page
				}
				if(this.currentSort==1){
					params.sales=1;
				}else if(this.currentSort==2){
					params.recommend=1;
				}else if(this.currentSort==3){
					params.new=1;
				}
				let res=await this.$u.api.index(params);
				this.loading=false;
				this.goods=[...this.goods,...res.goods.data];
			}
		},
		onReachBottom() {
			this.page=this.page+1;
			this.getData()
		}
	}
</script>

<style lang="less" scoped >
	
</style>
