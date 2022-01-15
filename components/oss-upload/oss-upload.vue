<template>
	<view>
		<u-upload 
		ref="uUpload" 
		:max-size="5*1024*1024"
		:multiple="false"
		:action="action" 
		:custom-btn="true"
		:before-upload="beforeUpload"
		:max-count="1"
		:show-upload-list="true"
		:form-data="formData"
		width="0"
		height="0">
			<u-avatar slot="addBtn" :src="vuex_user.avatar_url===undefined?'@/static/logo.png':vuex_user.avatar_url" size="140"></u-avatar>
		</u-upload>
		
	</view>
</template>

<script>
	let _this;
	export default {
		name:"oss-upload",
		data() {
			return {
				action: '',
				formData:{},
				upFileName:'',
				isLogin:false
			}
		},
		onShow() {
			const token=this.vuex_token;
			if(!token){
				this.isLogin=false
			} else{
				this.isLogin=true
			}
		},
		methods:{
			async beforeUpload(index, list) {
				if(!this.isLogin) return;
				const {file}=list[0];
				// #ifdef H5
				const fileName=file.name;
				// #endif
				// 条件编译
				// #ifndef H5
				const fileName=file.path;
				// #endif
				// 获取后缀
				const suffix=fileName.slice(fileName.lastIndexOf('.'));
				// 生成唯一的文件名
				const upFileName=this.$u.guid(20)+suffix;
				this.upFileName=upFileName;
				const osstoken=await this.$u.api.authOssToken();
				// 获取到osstoken
				this.action=osstoken.host;
				console.log(this.action)
				this.formData={
					'key':upFileName,
					'policy':osstoken.policy,
					'OSSAccessKeyId':osstoken.accessid,
					'success_action_status':'200',
					'signature':osstoken.signature
				}
				return true;
			},
			async onSuccess(){
				this.$refs.uUpload.remove(0)
				await this.$u.userAvatarUpdate({avatar:this.upFileName})
				this.$u.toast('更新成功');
				this.$u.updateUser();
			}
		}
		
	}
</script>

<style>

</style>
