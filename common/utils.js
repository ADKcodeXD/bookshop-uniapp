// 对常用代码进行封装 挂载到$u上


const install = (Vue, vm) => {
	const isLogin=()=>{
		const token=vm.vuex_token;
		if(!token){
			// 获取参数的代码
			const currentPage=getCurrentPages().pop();
			const {options,route}=currentPage;
			const optionKeys=Object.keys(options);
			
			let params='';
			if(optionKeys.length!==0){
				params=optionKeys.reduce((pre,current)=>{
					return pre+current+'='+options[current]+'&'
				},'?').slice(0,-1)
			}
			// 获取结束 缓存到uni中
			uni.setStorageSync('back_url',route+params);
			
			// 这里就是带参数的页面
			
			vm.$u.toast('请您登录后再进行访问！')
			// 两秒后跳转到登录页
			setTimeout(() => {
				vm.$u.route({
					type:'redirect',
					url: 'pages/auth/login'
				})
			}, 2000)
			return false
		}
		return true;
	}
	const updateUser=async ()=>{
		let userInfo=await vm.$u.api.userInfo();
		vm.$u.vuex('vuex_user',userInfo);
		vm.$u.toast('修改成功！')
	}
	vm.$u.isLogin=isLogin;
	vm.$u.userUpdate=updateUser;
	
}


export default {
	install
}

