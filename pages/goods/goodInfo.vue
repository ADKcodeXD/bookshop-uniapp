<template>
	<view>
		<u-image width="100%" height="500rpx" :src="goods.cover_url"></u-image>
		<view class="info">
			<text class="title">{{goods.title}}</text>
			<view class="priceAndSales">
				<text class="price">￥{{goods.price}}</text>
				<text > 销量：{{goods.sales}}</text>
			</view>
		</view>
		
		<u-tabs  :is-scroll="false" bar-width="100" @change="change" class="u-m-t-15" ref="tabs" :list="list" :current="current"></u-tabs>
		<transition mode="out-in"  appear name="bottomcontent">
			<view class="des"  v-if="current==0">
				<u-parse :html="goods.details"></u-parse>
			</view>
		</transition>
		
		<!-- 评论列表 -->
		<transition-group mode="out-in" appear name="bottomcontent" >
			<view  v-show="current==1" class="comment" v-for="(res, index) in goods.commentList" :key="res.id">
				<view class="left"><image :src="res.user.avatar_url" mode="aspectFill"></image></view>
				<view class="right">
					<view class="top">
						<view class="name">{{ res.user.name }}</view>
						<view class="like" :class="{ highlight: res.isLike }">
							<view class="num">{{ res.likeNum }}</view>
							<u-icon v-if="!res.isLike" name="thumb-up" :size="30" color="#9a9a9a" @click="getLike(index)"></u-icon>
							<u-icon v-if="res.isLike" name="thumb-up-fill" :size="30" @click="getLike(index)"></u-icon>
						</view>
					</view>
					<view class="content">{{ res.content }}</view>
					<view class="bottom">
						{{ res.date }}
						<view class="reply">回复</view>
					</view>
				</view>
			</view>
		</transition-group>
		
		
		<!-- 推荐商品 存在bug -->
		<view v-show="current==2">
			<u-row gutter="16">
				<u-col span="6" v-for="good in like_goods" :key="good.id">
					<goods-card :good="good"></goods-card>
				</u-col>
			</u-row>
		</view>
		
		<view class="navigation">
			<view class="left">
				<view class="item" @click="collect">
					<block v-if="iscollect==0">
						<u-icon name="star" :size="40" color="black"></u-icon>
						<view class="text u-line-1" >收藏</view>
					</block>
					<block v-else>
						<u-icon name="star" :size="40" color="red"></u-icon>
						<view class="text u-line-1" style="color:red;text-align: center;">已收藏</view>
					</block>
				</view>
				<view class="item car" @click="toCart">
					<u-badge class="car-num" :count="cartCount" type="error" :offset="[-3, -6]"></u-badge>
					<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
					<navigator class="text u-line-1"  >购物车</navigator>
				</view>
			</view>
			<view class="right">
				<view class="cart btn u-line-1" @click="addToCart">加入购物车</view>
				<!-- <view class="buy btn u-line-1">立即购买</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimgservice.suning.cn%2Fuimg1%2Fb2c%2Fimage%2F6ObcztZVtm1ZVjKLzsy7NQ.jpg_800w_800h_4e&refer=http%3A%2F%2Fimgservice.suning.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1644657505&t=b7fba1dd8f56cc1a81e98c92cb10f69d',
				list: [{
					name: '详情'
				}, {
					name: '评论',
					count:99
				}, {
					name: '推荐商品',
				}],
				current: 0,
				goodId:null,
				goods:{},
				like_goods:[],
				iscollect:0,
				cartCount:0
			}
		},
		onLoad(option){
			console.log(option)
			this.goodId=option.id;
			this.getData();
			this.getCartCount();
		},
		methods: {
			change(index){
				this.current=index;
			},
			// 获取data
			async getData(){
				const res=await this.$u.api.getGoodInfo(this.goodId);
				console.log(res);
				this.iscollect=res.goods.is_collect;
				this.goods=res.goods;
				this.like_goods=res.link_goods
				this.list[1].count=res.goods.comments.length
			},
			// 评论相关的方法
			// 跳转到全部回复
			toAllReply() {
				uni.navigateTo({
					url: '/pages/template/comment/reply'
				});
			},
			// 点赞
			getLike(index) {
				this.commentList[index].isLike = !this.commentList[index].isLike;
				if (this.commentList[index].isLike == true) {
					this.commentList[index].likeNum++;
				} else {
					this.commentList[index].likeNum--;
				}
			},
			// 收藏商品
			async collect(){
				const res=await this.$u.api.collectGoods(this.goodId)
				if(this.iscollect===0){
					this.$u.toast('收藏成功');
					this.iscollect=1;
				}else{
					this.$u.toast('取消收藏');
					this.iscollect=0
				}
			},
			// 加入购物车
			async addToCart(){
				const params={
					goods_id:this.goodId
				}
				await this.$u.api.addToCart(params);
				this.$u.toast('添加成功');
				// 获取购物车数据
				this.getCartCount()
			},
			// 获取购物车
			async getCartCount(){
				const token=this.vuex_token;
				if(token){
					const res=await this.$u.api.cartList();
					this.cartCount=res.data.length
				}
			},
			// 跳转购物车
			toCart(){
				this.$u.route({
					type:'switchTab',
					url:'pages/cart/cart'
				})
			}
		}
	}
</script>

<style scoped lang="less">
.bottomcontent-enter,
.bottomcontent-leave-to{
	transform: translateX(-100%);
}
.bottomcontent-enter-active,
.bottomcontent-leave-active{
    transition: 0.5s ease;
}
.bottomcontent-leave,
.bottomcontent-enter-to{
	transform: translateX(0);
}

.info{
	padding: 20rpx;
	.title{
		font-size: 46rpx;
		font-weight: 800;
	}
	.priceAndSales{
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		.price{
			font-size: 36rpx;
			color: red;
			font-weight: 700;
		}
	}
}
.utab{
	
}
.des{
	padding: 20rpx;
	font-size: 36rpx;
	line-height: 50rpx;
	overflow: hidden;
}

// 评论区样式
.comment {
	display: flex;
	padding: 30rpx;
	.left {
		image {
			width: 64rpx;
			height: 64rpx;
			border-radius: 50%;
			background-color: #f2f2f2;
		}
	}
	.right {
		flex: 1;
		padding-left: 20rpx;
		font-size: 30rpx;
		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 10rpx;
			.name {
				color: #5677fc;
			}
			.like {
				display: flex;
				align-items: center;
				color: #9a9a9a;
				font-size: 26rpx;
				.num {
					margin-right: 4rpx;
					color: #9a9a9a;
				}
			}
			.highlight {
				color: #5677fc;
				.num {
					color: #5677fc;
				}
			}
		}
		.content {
			margin-bottom: 10rpx;
		}
		.reply-box {
			background-color: rgb(242, 242, 242);
			border-radius: 12rpx;
			.item {
				padding: 20rpx;
				border-bottom: solid 2rpx red;
				.username {
					font-size: 24rpx;
					color: #999999;
				}
			}
			.all-reply {
				padding: 20rpx;
				display: flex;
				color: #5677fc;
				align-items: center;
				.more {
					margin-left: 6rpx;
				}
			}
		}
		.bottom {
			margin-top: 20rpx;
			display: flex;
			font-size: 24rpx;
			color: #9a9a9a;
			.reply {
				color: #5677fc;
				margin-left: 10rpx;
			}
		}
	}
}

// 订单列表样式
.navigation {
	position: fixed;
	bottom: 0;
	display: flex;
	justify-content: space-between;
	
	width: 100%;
	margin-top: 100rpx;
	border: solid 2rpx #f2f2f2;
	background-color: #ffffff;
	padding: 16rpx 14rpx;
	.left {
		display: flex;
		font-size: 20rpx;
		.item {
			margin: 0 30rpx;
			&.car {
				text-align: center;
				position: relative;
				.car-num {
					position: absolute;
					top: -10rpx;
					right: -10rpx;
				}
			}
		}
	}
	.right {
		display: flex;
		font-size: 28rpx;
		align-items: center;
		.btn {
			line-height: 66rpx;
			padding: 0 30rpx;
			border-radius: 36rpx;
			color: #ffffff;
		}
		.cart {
			background-color: #ed3f14;
			margin-right: 30rpx;
		}
		.buy {
			background-color: #ff7900;
		}
	}
}
</style>
