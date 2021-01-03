<template>

    <div class="card">

        <div class="card-header">
            <h3>Categories</h3>
        </div>

        <ul class="list-group">
            <li class="list-group-item" v-for="category in categories" :key="category.id">{{ category.name }}</li>
        </ul>

    </div>

</template>

<script>
    export default {
        name: "SideBar",
        computed: {
            categories() {
                return this.$store.getters.categories
            },
        },
        mounted() {
            this.$store.dispatch('categories');
        }
    }
</script>

<style scoped>

</style>
