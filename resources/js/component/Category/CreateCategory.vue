<template>

    <div class="container py-5">
        <div class="row">

            <div class="col-md-12 mb-4">

                <div class="card">

                    <div class="card-body">

                        <form @submit.prevent="addCategory">

                            <div class="form-group">
                                <input type="text" class="form-control-plaintext border-bottom categoryInput"
                                       v-model="form.name" id="name"
                                       placeholder="Category Name">
                                <div class="text-danger"></div>
                            </div>

                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-sm">Create</button>
                            </div>

                        </form>

                    </div>
                </div>

            </div>
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h6>Categories</h6>
                    </div>
                    <ul class="list-group">
                        <category-list-item :category="category" v-for="category in categories"
                                            :key="category.id"></category-list-item>
                    </ul>
                </div>
            </div>


        </div>
    </div>

</template>

<script>
    import SideBar from "../Forum/SideBar";
    import CategoryListItem from "./CategoryListItem";

    export default {
        name: "CreateCategory",
        data() {
            return {
                form: {
                    name: null
                }
            }
        },
        components: {CategoryListItem, SideBar},
        methods: {
            addCategory() {
                axios.post('/api/category', this.form)
                    .then(response => {
                        this.form.name = null;
                        this.$store.dispatch('categories');
                    })
                    .catch(error => console.log(error.response.data))
            }
        },
        computed: {
            categories() {
                return this.$store.getters.categories
            }
        },
        mounted() {
            this.$store.dispatch('categories')
        }
    }
</script>

<style scoped>
    .categoryInput {
        outline: none !important;
    }
</style>
