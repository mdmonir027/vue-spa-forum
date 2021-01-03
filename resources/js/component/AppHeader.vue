<template>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <router-link to="/" class="navbar-brand">Forum </router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item" v-for="item in items" v-if="item.show">
                        <router-link :to="item.to" class="nav-link">{{ item.title}}</router-link>
                    </li>

                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import User from "../Helpers/User";

    export default {
        name: "AppHeader",
        data: () => {
            return {
                items:[
                    {title:'Forum'  ,to:'/' , show:true},
                    {title:'Ask Question'  ,to:'/ask' , show:User.loggedIn()},
                    {title:'Category'  ,to:'/category' , show:User.admin()},
                    {title:'Login'  ,to:'/login' , show:!User.loggedIn()},
                    {title:'Logout'  ,to:'/logout' , show:User.loggedIn()},
                ]
            }
        },
        created() {
            EventBus.$on('logout' , ()=>{
                User.logout();
            })
        }
    }
</script>

<style scoped>

</style>
