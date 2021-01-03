<template>
    <div class="container my-4">
        <div class="row justify-content-center">
            <div class="col-md-5">
                <div class="card">
                    <div class="card-header">
                        <h3 class="text-center">Sing Up</h3>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="SignUp">
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input type="text" v-model="form.name"
                                       class="form-control" id="name"
                                       placeholder="Name">
                                <div class="text-danger" v-if="errors && errors.name">{{ errors.name[0]}}</div>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" v-model="form.email"
                                       A class="form-control" id="email"
                                       placeholder="Email Address">
                                <div class="text-danger" v-if="errors && errors.email">{{ errors.email[0]}}</div>
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" v-model="form.password"
                                       class="form-control" id="password"
                                       placeholder="Password">
                                <div class="text-danger" v-if="errors && errors.password">{{ errors.password[0]}}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="password_confirmation">Confirm Password</label>
                                <input type="password" v-model="form.password_confirmation" class="form-control"
                                       id="password_confirmation" placeholder="Password">
                                <div class="text-danger" v-if="errors && errors.password">{{ errors.password[0]}}
                                </div>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-secondary btn-block" type="submit">Sign Up</button>
                                <router-link to="/login" class="btn btn-info btn-block">Login</router-link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AppHome from "../AppHome";

    export default {
        name: "SignUp",
        data() {
            return {
                form: {
                    name: null,
                    email: null,
                    password: null,
                    password_confirmation: null,
                },
                errors: {}
            }
        },
        created() {
            if (User.loggedIn()) {
                this.$router.push({name: 'Home'})
            }
        },
        methods: {
            SignUp() {
                axios.post('/api/auth/sign-up', this.form)
                    .then(response => {
                        this.errors = {};
                        User.responseAfterLogin(response.data)
                        this.$router.push({name: 'Home'})
                    })
                    .catch(error => this.errors = error.response.data.errors)
            }
        }
    }
</script>

<style scoped>

</style>
