require('./bootstrap');
window.Vue = require('vue');
import jquery from 'jquery'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import router from "./Router/router";
import User from "./Helpers/User"; // User class
import CKEditor from '@ckeditor/ckeditor5-vue2';
import store from "./Store/Store";

// // material icons import
// import Delete from 'vue-material-design-icons/Delete';
// import Edit from 'vue-material-design-icons/Pencil';
// import Done from 'vue-material-design-icons/Check';
// import Save from 'vue-material-design-icons/ContentSave';

// // icons components
Vue.component('delete-icon', require('vue-material-design-icons/Delete').default);
Vue.component('edit-icon', require('vue-material-design-icons/Pencil').default);
Vue.component('done-icon', require('vue-material-design-icons/Check').default);
Vue.component('save-icon', require('vue-material-design-icons/ContentSave').default);
Vue.component('cancel-icon', require('vue-material-design-icons/CloseCircleOutline').default);
Vue.component('liked-icon', require('vue-material-design-icons/ThumbUp').default);
Vue.component('like-icon', require('vue-material-design-icons/ThumbUpOutline').default);

window.jQuery = jquery;


// user class for global
window.User = User;

// ck editor
Vue.use(CKEditor);


// event for handling events
window.EventBus = new Vue();


// icon component

Vue.component('app-home', require('./component/AppHome').default);


const app = new Vue({
    el: '#content',
    router,
    store,
});
