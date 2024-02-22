import { createRouter, createWebHistory } from "vue-router";

const routes = [
        {  path : '', name:'Home', component:() => import('@/views/Home.vue')} ,
        {  path : '/Home', name:'Home', component:() => import('@/views/Home.vue')} ,
        {  path : '/Login', name:'Login', component:() => import('@/views/Login/Login.vue')} ,
]
 const router = createRouter(
        {
                routes,
                history: createWebHistory(),
        }
 )
 export default router