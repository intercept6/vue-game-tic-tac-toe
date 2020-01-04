import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import Toasted from 'vue-toasted';
import './assets/sass/style.scss';

Vue.config.productionTip = false;

Vue.use(Toasted);

new Vue({
  render: h => h(App),
}).$mount('#app');
