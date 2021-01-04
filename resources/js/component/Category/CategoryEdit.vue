<template>
    <li class="list-group-item">
        <form @submit.prevent="updateCategory()">
            <div class="row">
                <div class="col-md-11">
                    <div class="row">
                        <div class="col-md-1">
                            <span type="button" class="btn btn-danger btn-sm" @click="cancel()">Cancel</span>
                        </div>
                        <div class="col-md-10">
                            <input type="text" v-model:name="category.name"
                                   class="form-control-plaintext border-bottom categoryInput">
                        </div>
                    </div>


                </div>
                <div class="col-md-1">
                    <button type="submit" class="btn btn-success btn-sm float-right">Save</button>
                </div>
            </div>
        </form>
    </li>
</template>

<script>
    export default {
        name: "CategoryEdit",
        props: ['category'],
        data() {
            return {
                form: {
                    name: ''
                }
            }
        },
        methods: {
            cancel() {
                EventBus.$emit('cancelEditing')
            },
            updateCategory() {
                axios.put(`/api/category/${this.category.slug}`, this.category)
                    .then(response => this.cancel())
                    .catch(error => console.log(error))
            }
        }
    }
</script>

<style scoped>
    .categoryInput {
        outline: none !important;
    }
</style>
