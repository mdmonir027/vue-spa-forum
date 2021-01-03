require('./bootstrap');
window.Vue = require('vue');
import jquery from 'jquery'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import router from "./Router/router";
import User from "./Helpers/User"; // User class
import Vuex from 'vuex'
import Store from "./Store/Store";
import CKEditor from '@ckeditor/ckeditor5-vue2';

window.jQuery = jquery;


// user class for global
window.User = User;

// vuex initiating
Vue.use(Vuex);
const store = new Vuex.Store(Store);

// ck editor
Vue.use(CKEditor);

window.EventBus = new Vue();

Vue.component('app-home', require('./component/AppHome').default);

const app = new Vue({
    el: '#content',
    router,
    store
});
