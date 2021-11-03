import Vue from 'vue'
import App from './App.vue'
import VueBarcodeScanner from 'vue-barcode-scanner'

Vue.config.productionTip = false
Vue.use(VueBarcodeScanner)

new Vue({
  render: h => h(App),
}).$mount('#app')
