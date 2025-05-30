import App from './App.vue'
import store from './store'

// vue2
// #ifndef VUE3
import Vue from 'vue'

// main.js，注意要在use方法之后执行
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
// 如此配置即可
uni.$u.config.unit = 'rpx'

// 在 main.js 中写入以下代码即可
function isPromise(obj) {
	return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
}

uni.addInterceptor({
	returnValue(res) {
		if (!isPromise(res)) {
			return res
		}
		return new Promise((resolve, reject) => {
			res.then(res => {
				if (res[0]) {
					reject(res[0])
				} else {
					resolve(res[1])
				}
			})
		})
	}
})

Vue.config.productionTip = false
App.mpType = 'app'
// 把store挂载到uni下，解决在NVUE原生页面中无法获取store
uni.$store = store
const app = new Vue({
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	app.use(store)
	return {
		app
	}
}
// #endif