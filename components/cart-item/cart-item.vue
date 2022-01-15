<template>
	<view class="item-wrapper">
		<u-top-tips ref="uTips"></u-top-tips>
		
		<view class="left-checkbox">
			<u-checkbox 
				shape="circle"
				v-model="goods.is_checked==1"
				@change="changeChecked"
			></u-checkbox>
		</view>
		<view class="right-content">
			<u-image width="200rpx" height="100%" :src="goods.goods.cover_url"></u-image>
			<view class="goodsInfo">
				<view>
					<view class="title">{{goods.goods.title}}</view>
					<view class="des">{{goods.goods.description}}</view>
				</view>
				<view class="price">
					<view class="money">${{goods.goods.price}}</view>
					<view class="plus">
						<view class="box"  @click="changeNum(-1)">-</view>
						<view class="box">{{goods.num}}</view>
						<view class="box" @click="changeNum(1)">+</view>
					</view>
					<navigator @click="show=true">
						<u-icon  name="trash" size="40" color="red" style="line-height: 50rpx;text-align: center;" >
						</u-icon>
					</navigator>
					<u-modal v-model="show" content="是否确认删除这个商品？" :show-cancel-button="true" @confirm="deleteGoods"></u-modal>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"cart-item",
		data() {
			return {
				checked:true,
				show:false
			};
		},
		props:{
			goods:{
				type:Object,
				default(){
					return{}
				}
			}
		},methods:{
			async changeChecked(){
				let id=[]
				id.push(this.goods.id)
				await this.$u.api.changeChecked(id);
				uni.$emit('changeCart');
			},
			async changeNum(val){
				const {id,num}=this.goods;
				let params={
					num:num+val
				}
				if(params.num<1){
					this.$u.toast('商品数量不能少于1')
					return;
				}
				const res=await this.$u.api.changeNumOfGoods(id,params);
				uni.$emit('changeNum');
			},
			// 删除购物车商品
			async deleteGoods(){
				await this.$u.api.deleteOutOfCart(this.goods.id);
				uni.$emit('changeCart');
				await this.$refs.uTips.show({
					title: '已删除商品~',
					type: 'success',
					duration: '2300'
				})
			}
		}
	}
</script>

<style scoped lang="less">
.item-wrapper{
		width: 100%;
		height: 200rpx;
		display: flex;
		justify-content: space-around;
		padding: 10rpx 20rpx;
		.left-checkbox{
			width: 10%;
			height: 100%;
			display:flex;
			 u-checkbox{
				height: 100%;
				flex: 2;
				align-items: center;
			}
		}
		.right-content{
			width: 100%;
			height: 100%;
			border-radius: 10rpx;
			display: flex;
			padding: 10rpx;
			background-color: rgba(249, 249, 248, 1.0);
			.goodsInfo{
				width: 80%;
				display: flex;
				padding-left: 20rpx;
				flex-direction: column;
				justify-content: space-between;
				.title{
					font-size: 30rpx;
					font-weight: 600;
				}
				.des{
					font-size: 20rpx;
					color: gray;
				}
				// 下面
				.price{
					display: flex;
					width: 100%;
					justify-content: space-between;
					.money{
						font-size: 32rpx;
						vertical:bottom;
						color: red;
						font-weight: 600;
					}
					.plus{
						display: flex;
						margin-left: 20rpx;
						.box{
							width: 50rpx;
							height: 50rpx;
							text-align: center;
							margin-right: 10rpx;
							border-radius: 20rpx;
							background-color: rgb(245, 245, 245);
							line-height: 50rpx;
						}
					}
					
				}
			}
		}
		
	}
</style>
