<template>
	<view>
		<view @click="choice_new(item.id)" class="address" v-for="item in address" :key="item.id" >
			<view class="main-info">
				<text class="name">{{item.name}}</text>
				<text class="phone">{{item.phone}}</text>
			</view>
			<view class="address-info" @click="changeAddress">
				<u-tag v-if="item.is_default==1" text="默认" mode="light" shape="circle"  type="warning"/>
				<text class="address-detail">{{item.province+item.city+item.county+item.address}}</text>
			</view>
			<u-icon v-if="choice_id==item.id" class="iconright" name="checkbox-mark" color="#18ee00" size="36">
				
			</u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				address:[],
				choice_id:0
			};
		},
		async onLoad() {
			this.choice_id=this.options.nowAddressId
			let res = await this.$u.api.getAllAddress();
			this.address=res.data;
		},
		methods:{
			choice_new(id){
				this.$u.route({
					url:`pages/order/order?nowAddressId=${id}`
				})
			}
		}
	}
</script>

<style lang="less">
.address{
	display: flex;
	position: relative;
	padding: 20rpx;
	height: 160rpx;
	flex-direction: column;
	justify-content: space-between;
	margin: 10rpx;
	border-radius: 20rpx;
	box-shadow: 0 0 10rpx rgba(0,0,0,.2);
	font-size: 36rpx;
	font-weight: 600;
	.iconright{
		position: absolute;
		right: 3%;
		top: 45%;
	}
	.main-info{
		.name{
			margin-right: 20rpx;
		}
	}
	.address-info{
		.address-detail{
			font-size: 28rpx;
			font-weight: 200;
			margin-left: 20rpx;
		}
	}
}
</style>
