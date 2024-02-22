// import Vue from 'vue'
import { createApp } from 'vue'
import '@/style.css'
import router from '@/plugins/router'
import vuetify from '@/plugins/vuetify'
import axios from '@/plugins/axios'
import App from '@/App.vue'
// import '@mdi/font/css/materialdesignicons.css'

// Vue.use(VueAxios, axios);
createApp(App).use(router).use(vuetify).use(axios).mount('#app')
