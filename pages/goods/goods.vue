<template>
	<view class="u-wrap">
		<view class="u-search-box">
			<u-search placeholder="输入搜索" v-model="keyword" @custom="searchGood" @clear="clear"></u-search>
		</view>
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" >
				<block v-for="(item,index) in categories" :key="index">
					<view class="u-tab-item u-tab-item-level1-active" >
						<text class="u-line-1">{{item.name}}</text>
					</view>
					<view v-for="(c,ci) in item.children" :key="c.id" class="u-tab-item" :class="[current==c.id ? 'u-tab-item-active' : '']"
					 :data-current="ci" @tap="swichMenu(c.id)">
						<text class="u-line-1">{{c.name}}</text>
					</view>
				</block>
			</scroll-view>
			
			<scroll-view scroll-y @scrolltolower="scrollEvent" >
				<view  class="page-view">
					<view class="class-item">
						<view class="item-container">
							<navigator class="thumb-box u-p-10" v-for="(good, index) in goods"
								:key="index"
								:url="'/pages/goods/goodInfo?id='+good.id">
								<image class="item-menu-image u-m-t-15 " :src="good.cover_url" mode=""></image>
								<view class="item-menu-name u-line-1 u-m-t-20 ">{{good.title}}</view>
							</navigator>
							<u-empty v-if="goods.length==0"  text="暂时没有数据哦" mode="list" class="u-text-center u-p-t-40 u-flex-1"></u-empty>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	// import classifyData from "@/common/classify.data.js";
	export default {
		data() {
			return {
				categories:[],
				goods:[],
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
				keyword:'',
				page:1,
				isLast:false
			}
		},
		computed: {
			
		},
		methods: {
			async getData(){
				const params={
					page:this.page,
					title:this.keyword
				}
				if(this.current){
					params.category_id=this.current;
				}
				const res=await this.$u.api.goodsList(params);
				console.log(res);
				this.categories=res.categories;
				this.goods=[...this.goods,...res.goods.data];
				this.isLast=res.goods.next_page_url==null?true:false;
			},
			// 点击左边的栏目切换
			async swichMenu(index) {
				if(index == this.current) return ;
				this.current = index;
				this.page=1;
				this.goods=[];
				this.getData();
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({size: true},res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if(!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return ;
						}
						this[dataVal] = res.height;
					}).exec();
				})
			},
			searchGood(){
				this.page=1;
				this.goods=[];
				this.getData();
			},
			clear(){
				this.page=1;
				this.keyword=''
				this.goods=[];
			},
			// 滚动到底部加载下一页
			scrollEvent(e){
				if(this.isLast) return;
				this.page=this.page+1;
				this.getData();
			}
		},
		async onLoad() {
			this.getData();
		}
	}
</script>

<style lang="scss" scoped>
	.u-wrap {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
	}

	.u-search-box {
		padding: 18rpx 30rpx;
	}

	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.u-search-inner {
		background-color: rgb(234, 234, 234);
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 16rpx;
	}

	.u-search-text {
		font-size: 26rpx;
		color: $u-tips-color;
		margin-left: 10rpx;
	}

	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}
	
	.u-tab-item-active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 600;
		background: #fff;
	}
	.u-tab-item-level1-active {
		position: relative;
		color: #fdfcfb;
		font-size: 30rpx;
		font-weight: 600;
		background: #9ebbff;
	}
	
	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid $u-type-primary;
		height: 32rpx;
		left: 0;
		top: 39rpx;
	}

	.u-tab-view {
		height: 100%;
	}
	
	.right-box {
		display: flex;
		flex-wrap: wrap;
		background-color: rgb(250, 250, 250);
	}
	
	.page-view {
		padding: 16rpx;
	}
	
	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}
	
	.item-title {
		font-size: 26rpx;
		color: $u-main-color;
		font-weight: bold;
	}
	
	.item-menu-name {
		font-weight: normal;
		font-size: 30rpx;
		color: $u-main-color;
	}
	
	.item-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	
	.thumb-box {
		width: 45%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 20rpx;
		box-shadow: 2rpx 2rpx 5rpx rgba(0,0,0,0.2);
	}
	
	.item-menu-image {
		width: 120rpx;
		height: 120rpx;
	}
</style>

