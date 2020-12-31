import Vue from "vue";
import VueRouter from 'vue-router';
import AppHome from "../component/AppHome";
import Login from "../component/Auth/Login";

Vue.use(VueRouter);

const routes = [

    {path:'/login' , component: Login}
];

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router;
