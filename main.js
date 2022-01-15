import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);
import httpInterceptor from '@/common/http.interceptor.js'
import httpApi from '@/common/http.api.js'
import utils from '@/common/utils.js'
import store from '@/store';
let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);



const app = new Vue({
	store,
    ...App
})
Vue.use(httpInterceptor,app)
Vue.use(httpApi,app)
Vue.use(utils,app)

app.$mount()
