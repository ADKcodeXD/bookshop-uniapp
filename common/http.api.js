// /common/http.api.js

// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	
	vm.$u.api = {};
	// 此处没有使用传入的params参数
	// 首页相关
	vm.$u.api.index = (params = {}) => vm.$u.get('/api/index',params);
	
	// 认证相关
	vm.$u.api.authLogin = params=> vm.$u.post('/api/auth/login',params)
	// 注册
	vm.$u.api.authRegister = params=> vm.$u.post('/api/auth/register',params)
	// osstoken请求图片的api
	vm.$u.api.authOssToken = params=> vm.$u.get('/api/auth/oss/token')
	
	
	
	// 用户相关
	vm.$u.api.userInfo = params=> vm.$u.get('/api/user')
	// 修改用户信息
	vm.$u.api.userInfoUpdate = params=> vm.$u.put('/api/user',params)
	// 退出登录
	vm.$u.api.userLogOut = params=> vm.$u.post('/api/auth/logout')
	// 传头像api
	vm.$u.api.userAvatarUpdate = params=> vm.$u.patch('/api/user/avatar',params)


	// 商品相关
	// 获取商品的所有信息
	vm.$u.api.getGoodInfo = id=> vm.$u.get(`/api/goods/${id}`)
	// 收藏商品
	vm.$u.api.collectGoods = id=> vm.$u.post(`/api/collects/goods/${id}`)
	// 加入购物车
	vm.$u.api.addToCart = id=> vm.$u.post(`/api/carts`,id)
	// 获取购物车
	vm.$u.api.cartList = params=> vm.$u.get("/api/carts")
	// 获取商品列表/api/goods
	vm.$u.api.goodsList = params=> vm.$u.get("/api/goods",params)
	
	// 获取购物车列表，包含详细信息
	vm.$u.api.cartListInfo = params=> vm.$u.get("/api/carts?include=goods")
	// 改变购物车的选中状态/api/carts/checked cart_ids type:array
	vm.$u.api.changeChecked = ids_cart=> vm.$u.patch(`/api/carts/checked`,{ids_cart})
	// 更改购物车数量 /api/carts/{cart}
	vm.$u.api.changeNumOfGoods = (cartId,num)=> vm.$u.put(`/api/carts/${cartId}`,num)
	// 删除（移出）购物车
	vm.$u.api.deleteOutOfCart = cartId=> vm.$u.delete(`/api/carts/${cartId}`)
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下

	// 订单相关
	// 获取选中状态的商品并生成订单预览 /api/orders/preview
	vm.$u.api.orderPreview = params=> vm.$u.get('/api/orders/preview')
	// 提交订单 /api/orders
	vm.$u.api.submitOrder = address_id=> vm.$u.post('/api/orders',address_id)
	
	
	// 地址相关
	// 获取所有地址列表 /api/address
	vm.$u.api.getAllAddress = params=> vm.$u.get('/api/address')
	
	
}

export default {
	install
}