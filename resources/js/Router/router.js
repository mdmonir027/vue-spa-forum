import Vue from "vue";
import VueRouter from 'vue-router';
import AppHome from "../component/AppHome";
import Login from "../component/Auth/Login";
import SignUp from "../component/Auth/SignUp";

Vue.use(VueRouter);

const routes = [

    {path:'/login' , component: Login},
    {path:'/sign-up' , component: SignUp}
];

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router;
