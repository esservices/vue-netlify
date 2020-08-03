import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import PageLoader from './helpers/PageLoader.vue';

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(VueRouter);

const VUE_APP_BASE = process.env.VUE_APP_MGNL_BASENAME + process.env.VUE_APP_SITE_BASENAME;

const router = new VueRouter({
  mode: 'history',
  base: VUE_APP_BASE,
  routes: [{ path: '*', component: PageLoader }],
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
