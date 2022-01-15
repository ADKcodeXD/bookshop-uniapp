<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎注册我的书城</view>
			<input class="u-border-bottom" type="text" v-model="name" placeholder="请输入你的昵称" />
			<input class="u-border-bottom" type="email" v-model="email" placeholder="请输入邮箱" />
			<input class="u-border-bottom" type="password" v-model="password" placeholder="请输入密码" />
			<input class="u-border-bottom" type="password" v-model="password_confirm" placeholder="请再次输入密码" />
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">注册</button>
			<view class="alternative">
				<view class="password">已经有账号？去<navigator url="./login">登录</navigator></view>
			</view>
		</view>
		<view class="buttom">
			<view class="hint">
				登录代表同意
				<text class="link">乱七八糟书城用户协议、隐私政策，</text>
				并授权使用您的微信信息（如昵称、头像、收获地址）以便您统一管理
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				email:'',
				password:'',
				password_confirm:''
			}
		},
		computed: {
			inputStyle() {
				let style = {};
				if(this.$u.test.email(this.email) && this.password) {
					style.color = "#fff";
					style.backgroundColor = this.$u.color['warning'];
				}
				return style;
			}
		},
		methods: {
			async submit(){
				if(!this.$u.test.email(this.email) || !this.password || !this.name) return 
				const params={
					name:this.name,
					email:this.email,
					password:this.password,
					password_confirmation:this.password_confirm
				}
				const res=await this.$u.api.authRegister(params);
				this.$u.route({
					url:'pages/auth/login'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.u-border-bottom{
	margin-bottom: 50rpx !important;
}
.wrap {
	font-size: 28rpx;
	.content {
		width: 600rpx;
		margin: 80rpx auto 0;

		.title {
			text-align: left;
			font-size: 60rpx;
			font-weight: 500;
			margin-bottom: 100rpx;
		}
		input {
			text-align: left;
			margin-bottom: 10rpx;
			padding-bottom: 6rpx;
		}
		.tips {
			color: $u-type-info;
			margin-bottom: 60rpx;
			margin-top: 8rpx;
		}
		.getCaptcha {
			background-color: rgb(253, 243, 208);
			color: $u-tips-color;
			border: none;
			font-size: 30rpx;
			padding: 12rpx 0;
			
			&::after {
				border: none;
			}
		}
		.alternative {
			color: $u-tips-color;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			margin-top: 30rpx;
			
		}
	}
	.buttom {
		.loginType {
			display: flex;
			padding: 350rpx 150rpx 150rpx 150rpx;
			justify-content:space-between;
			
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: $u-content-color;
				font-size: 28rpx;
			}
		}
		
		.hint {
			padding: 20rpx 40rpx;
			font-size: 20rpx;
			color: $u-tips-color;
			
			.link {
				color: $u-type-warning;
			}
		}
	}
}
</style>
