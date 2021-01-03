<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-md-5">
                <div class="card">
                    <div class="card-header">
                        <h3 class="text-center">Login</h3>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="login">
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" v-model="form.email" class="form-control" id="email" placeholder="Email Address">
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" v-model="form.password" class="form-control" id="password" placeholder="Password">
                            </div>
                            <div class="form-group">
                                <button class="btn btn-primary btn-block" type="submit" >Login</button>
                                <router-link to="/sign-up" class="btn btn-success btn-block" >SignUp</router-link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Login",
        data: ()=>{
            return{
                form:{
                    email: null,
                    password: null
                }
            }
        },
        created() {
            if (User.loggedIn()){
                this.$router.push({name: 'Home'})
            }
        },
        methods:{
            login(){
                User.login(this.form)
            }
        }
    }
</script>

<style scoped>

</style>
