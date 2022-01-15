<template>
	<view>
		<block v-for="goods in goodsList" :key="goods.id">
			<cart-item :goods="goods"></cart-item>
		</block>
		<u-empty text="购物车还没有东西哦,快去购物吧~" v-if="goodsList.length==0" margin-top="200" mode="car"></u-empty>
		<!-- 底下付款组件 -->
		<view class="goPay">
			<u-checkbox
			shape="circle"
			v-model="allCheck"
			@change="changeAllCheck"
			>
			<text>全选</text>
			</u-checkbox>
			<view class="totalPrice">
				<view class="fontcontent">
					<text>合计:</text>
					<text class="total">￥{{totalPrice}}</text>
				</view>
				<u-button @click="gotoPay" shape="circle" :ripple="true" ripple-bg-color="#f4abc1">
					去结算
				</u-button>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				checked:true,
				goodsList:[],
				isAllCheck:false
			}
		},
		computed:{
			totalPrice(){
				let total=0;
				this.goodsList.forEach(element=>{
					if(element.is_checked){
						total+=element.goods.price*element.num
					}
				})
				return total;
			},
			// 全选和全不选判断
			allCheck: {
				get() {
					return this.goodsList.every((goods) => {
						return goods.is_checked
					})
				},
				set(val) {
					this.changeAllCheck(val)
				}
			},
		},
		methods:{
			async getData(){
				const res=await this.$u.api.cartListInfo();
				this.goodsList=res.data;
			},
			// 全选与全不选  有bug
			async changeAllCheck(val){
				if(!val){
					const res=await this.$u.api.changeChecked([])
					console.log(res+"走了这个非");
				}else{
					let ids=[]
					this.goodsList.forEach((element)=>{
						ids.push(element.id);
					})
					const res=await this.$u.api.changeChecked(ids)
					console.log(res+"走了这个是");
				}
				this.getData();
			},
			// 去结算页面
			gotoPay(){
				let goods=[]
				this.goodsList.forEach((element)=>{
					if(element.is_checked){
						goods.push(element);
					}
				})
				if(goods.length==0) {
					this.$u.toast('你还未选中商品哦~');
					return;
				}
				let params={
					...goods
				}
				this.$u.route({
					url:'pages/order/order',
					params:params
				})
			}
		},
		onLoad() {
			this.$u.isLogin();
			this.getData();
			uni.$on('changeNum',()=>{
				this.getData();
			});
			uni.$on('changeCart',()=>{
				this.getData();
			})
		},
		onShow() {
			this.getData();
		}
	}
</script>

<style scoped lang="less">
	.goPay{
		position:fixed;
		display: flex;
		justify-content: space-between;
		height: 100rpx;
		width: 100%;
		bottom: 100rpx;
		padding: 10rpx 20rpx;
		background-color: rgba(255, 255, 255, 0.8);
		.totalPrice{
			display: flex;
			width: 70%;
			align-items: center;
			text-align: center;
			justify-content: space-between;
			vertical-align:middle;
			
			.fontcontent{
				display: inline-flex;
				align-items: center;
				align-self: center;
				font-size: 34rpx;
				.total{
					font-size: 48rpx;
					font-weight: 600;
					color: red;
				}
			}
			
			.u-btn{
				color: white;
				padding: 40rpx 60rpx;
				margin: 0 !important;
				background-color: red;
			}
		}
	}
</style>
