<template>
	<view>
		<view class="address" @click="changeAddress">
			<view class="main-info">
				<text class="name">{{defaultAddress.name}}</text>
				<text class="phone">{{defaultAddress.phone}}</text>
			</view>
			<view class="address-info" >
				<u-tag text="当前地址" mode="light" shape="circle"  type="warning"/>
				<text class="address-detail" v-if="defaultAddress.name">{{addressString}}</text>
				<text class="address-detail" v-else>您当前还没有地址哦~点击去添加</text>
			</view>
			<u-icon class="iconright" name="play-right" color="#000000" size="28">
				
			</u-icon>
		</view>
		<view class="goods" v-for="goods in carts" :key="goods.id">
			<u-image width="200" height="200"  :src="goods.goods.cover_url">	
			</u-image>
			<view class="content">
				<view class="title">{{goods.goods.title}}</view>
				<view class="price">
					<u-tag text="支持七天无理由" size="mini" mode="light"  type="error"/>
					<view class="price-down">
						<text class="pricemain">￥{{goods.goods.price}}</text>
						<text>x{{goods.num}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="bottom">
			<view class="pricebottom">
				<text>实付</text>
				<text class="bigPrice">￥{{totalPrice}}</text>
			</view>
			<view class="btn">
				<navigator @click="submit"  class="mybutton" >下单付款</navigator>
			</view>
		</view>
	
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				address:[],
				carts:[],
				defaultAddress:{}
			};
		},
		async onShow() {
			this.$u.isLogin();
			const res=await this.$u.api.orderPreview();
			const choiceid=this.options.nowAddressId;
			this.address=res.address;
			this.carts=res.carts;
			if(!choiceid){
				res.address.forEach((aes)=>{
					if(aes.is_default==1){
						this.defaultAddress=aes
					}
				})
				if(!this.defaultAddress.name) this.defaultAddress=res.address[0]||{};
			}else{
				res.address.forEach((aes)=>{
					if(aes.id==choiceid){
						this.defaultAddress=aes
					}
				})
			}
		},
		computed:{
			totalPrice(){
				let total=0;
				this.carts.forEach((e)=>{
					total+=e.num*e.goods.price
				})
				return total
			},
			addressString(){
				let a=""
				let aes = this.defaultAddress;
				if(a==""){
					a+=aes.province
					a+=aes.city
					a+=aes.county
					a+=aes.address
				}
				return a
			}
		},
		methods:{
			changeAddress(){
				this.$u.route({
					url:`pages/order/address?nowAddressId=${this.defaultAddress.id}`
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

// 商品小模块
.goods{
	display: flex;
	padding: 20rpx;
	margin: 10rpx;
	justify-content: space-between;
	border-radius: 20rpx;
	box-shadow: 0 0 10rpx rgba(0,0,0,.2);
	.content{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 66%;
		.title{
			font-size: 34rpx;
			font-weight: 600;
		}
		.price-down{
			display: flex;
			justify-content: space-between;
			.pricemain{
				color: red;
				font-size: 34rpx;
				font-weight: 600;
			}
		}
	}
}
.bottom{
	position: fixed;
	width: 97%;
	height: 100rpx;
	margin: 10rpx;
	border-radius: 40rpx;
	bottom: 6%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: rgba(25, 23, 21, 0.5);
	.pricebottom{
		font-size: 30rpx;
		color: white ;
		margin-left: 20rpx;
		.bigPrice{
			font-size: 40rpx;
		}
	}
	.btn{
		height: 100%;
		width: 30%;
		border-radius: 0 40rpx 40rpx 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: red;
		font-size: 30rpx;
		color: white;
	}
}
</style>
