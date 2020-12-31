require('./bootstrap');

window.Vue = require('vue');
import jquery from 'jquery'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import router from "./Router/router";
window.jQuery = jquery;
import User from "./Helpers/User"; // User class

// user class for global
window.User = User;


Vue.component('app-home', require('./component/AppHome').default);

const app = new Vue({
    el: '#content',
    router
});
