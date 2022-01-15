<template>
	<view>
		<navigator class="goods-item" :url="'/pages/goods/goodInfo?id='+good.id" >
			<u-image class="u-skeleton-fillet" width="100%" height="200rpx" :src="good.cover_url"></u-image>
			<view class="title u-line-1 u-skeleton-rect">{{good.title}}</view>
			<view class="u-flex u-row-between u-skeleton-rect">
				<view class="price u-skeleton-rect">${{good.price}}</view>
				<view>销量:{{good.sales}}</view>
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		name:"goods-card",
		data() {
			return {
				
			};
		},
		props:{
			good:{
				type:Object,
				default(){
					return{}
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.goods-item{
		padding: 30rpx;
		margin-top: 30rpx;
		box-shadow: 2rpx 2rpx 15rpx rgba(0,0,0,0.2);
		.title{
			margin: 20rpx 0;
			font-weight: 500;
			font-size: 32rpx;
		}
		.price{
			color: red;
			font-weight: 600;
		}
	}
</style>
