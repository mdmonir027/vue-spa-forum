import Vue from "vue";
import VueRouter from 'vue-router';
import Login from "../component/Auth/Login";
import SignUp from "../component/Auth/SignUp";
import Logout from "../component/Auth/Logout";
import Forum from "../component/Forum/Forum";
import Question from "../component/Forum/Question";
import AskQuestion from "../component/Forum/AskQuestion";

Vue.use(VueRouter);

const routes = [

    {path:'/' , component: Forum , name: 'Home'},
    {path:'/ask' , component: AskQuestion , name: 'AskQuestion'},
    {path:'/login' , component: Login , name: 'Login'},
    {path:'/sign-up' , component: SignUp , name: 'SignUp'},
    {path:'/logout' , component: Logout , name: 'Logout'},
    {path:'/question/:slug' , component: Question , name: 'Question'},
];

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router;
