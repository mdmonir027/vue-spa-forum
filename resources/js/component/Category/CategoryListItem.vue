<template>
    <div>
        <li class="list-group-item" v-if="!editing">
            <div class="row">
                <div class="col-md-10">
                    <button v-if="!editing" @click="startEditing" class="btn btn-primary btn-sm">Edit</button>
                    <span class="ml-1">{{category.name}}</span>
                </div>
                <div class="col-md-2">
                    <button v-if="!editing" class="btn btn-danger btn-sm float-right" @click="deleteCategory">Delete
                    </button>
                </div>
            </div>
        </li>
        <category-edit v-if="editing" :category="category"></category-edit>
    </div>
</template>

<script>
    import CategoryEdit from "./CategoryEdit";

    export default {
        name: "CategoryListItem",
        components: {CategoryEdit},
        props: ['category'],
        data: () => {
            return {
                editing: false,
            }
        },
        methods: {
            startEditing() {
                this.editing = true;
            },
            deleteCategory() {
                axios.delete(`/api/category/${this.category.slug}`)
                    .then(response => this.$store.dispatch('categories'))
                    .catch(error => console.log(error.response.data))
            }
        },
        mounted() {
            EventBus.$on('cancelEditing', () => {
                this.editing = false;
                this.$store.dispatch('categories')
            })
        }
    }
</script>

<style scoped>

</style>
