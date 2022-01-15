<template>
	<view class="u-p-20">
		<u-form :model="form" ref="uForm">
			<u-form-item label="昵称" prop="name" required>
				<u-input v-model="form.name" />
			</u-form-item>
		</u-form>
		<u-button @click="submit">提交</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: ''
				},
				rules: {
					name: [
						{ 
							required: true, 
							message: '请输入姓名', 
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['change','blur'],
						}
					]
				}
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
			this.form.name=this.vuex_user.name;
		},
		methods: {
			submit() {
				this.$refs.uForm.validate(async valid => {
					if (valid) {
						const result=await this.$u.api.userInfoUpdate(this.form);
						
						// 更新完了之后重新请求用户信息
						this.$u.userUpdate();
						
					}
				});
			}
		}
	}
</script>

<style>

</style>
