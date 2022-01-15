<template>
	<view>
		<u-navbar :is-back="false" title="　" :border-bottom="false">
			<view class="u-flex u-row-right" style="width: 100%;">
				<view class="camera u-flex u-row-center">
					<u-icon name="camera-fill" color="#000000" size="48"></u-icon>
				</view>
			</view>
		</u-navbar>
		<view class="u-flex user-box u-p-t-30 u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10 avatar-body">
				<oss-upload></oss-upload>
			</view>
			<view class="u-flex-1" v-if="isLogin">
				<view class="u-font-18 u-p-b-20">{{vuex_user.name}}</view>
				<view class="u-font-14 u-tips-color">邮箱:{{vuex_user.email}}</view>
			</view>
			<view class="u-flex-1" v-else>
				<view class="u-font-18 u-p-b-20">未登录</view>
				<view class="u-font-14 u-tips-color">邮箱:xxxxxxxx</view>
			</view>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group  v-if="isLogin">
				<u-cell-item icon="rmb-circle" title="支付"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group v-if="isLogin">
				<u-cell-item icon="shopping-cart" title="我的订单"></u-cell-item>
				<u-cell-item @click="toBaseInfo" icon="account-fill" title="个人信息"></u-cell-item>
				<u-cell-item icon="setting" title="地址管理"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group v-if="isLogin">
				<u-cell-item @click="logout" icon="man-delete" title="退出登录"></u-cell-item>
			</u-cell-group>
			<u-cell-group v-else>
				<u-cell-item @click="login" icon="man-add-fill" title="去登录"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic:'https://uviewui.com/common/logo.png',
				show:true,
				isLogin:false
			}
		},
		onLoad() {
			const token=this.vuex_token;
			if(!token){
				this.$u.toast('您当前未登录哦~请登录后进行操作');
				this.isLogin=false;
			}else{
				this.isLogin=true;
			}
		},
		onShow() {
			const token=this.vuex_token;
			if(!token){
				this.isLogin=false;
			}else{
				this.isLogin=true;
			}
		},
		methods: {
			toBaseInfo(){
				this.$u.route({
					url:'pages/center/baseInfo'
				})
			},
			async logout(){
				let result=await this.$u.api.userLogOut();
				this.$u.toast('退出成功')
				setTimeout(()=>{
					this.$u.vuex('vuex_user',{});
					this.$u.vuex('vuex_token',null);
				},1500)
				
				this.$u.route({
					type:'reLaunch',
					url:'pages/index/index'
				})
				
			},
			login(){
				this.$u.route({
					url:'pages/auth/login'
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #ededed;
}

.camera{
	width: 54px;
	height: 44px;
	
	&:active{
		background-color: #ededed;
	}
}
.user-box{
	background-color: #fff;
}
.avatar-body{
	width: 70px;
	height: 70px;

}
</style>


