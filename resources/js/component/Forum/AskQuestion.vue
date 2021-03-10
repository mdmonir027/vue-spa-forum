<template>
    <div class="container py-5">
        <div class="row">
            <div class="col-md-12">
                <form @submit.prevent="askQuestion">

                    <div class="form-group">
                        <label for="title">Title</label>
                        <input type="text" v-model="form.title" class="form-control" id="title" placeholder="Title">
                        <div class="text-danger" v-if="errors && errors.title">{{ errors.title[0] }}</div>
                    </div>

                    <div class="form-group">
                        <label for="category">Category</label>
                        <select name="category" class="form-control" v-model="form.category_id" id="category">
                            <option :value="category.id" v-for="category in categories">{{ category.name }}</option>
                        </select>
                        <div class="text-danger" v-if="errors && errors.category_id">{{ errors.category_id[0] }}</div>
                    </div>
                    <div class="form-group">
                        <label for="category">Body</label>
                        <ckeditor :editor="editor" v-model="form.body" :config="editorConfig"></ckeditor>
                        <div class="text-danger" v-if="errors && errors.body">{{ errors.body[0] }}</div>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

    export default {
        name: "AskQuestion",
        data() {
            return {

                form: {
                    title: null,
                    category_id: null,
                    body: null
                },
                editor: ClassicEditor,
                editorConfig: {},
                errors:{}
            }
        },
        computed:{
            categories(){
                return this.$store.getters.categories
            }
        },
        mounted() {
            this.$store.dispatch('categories');
        },
        methods:{
            askQuestion(){
                axios.post('/api/question' , this.form)
                    .then(response => this.$router.push(response.data.path))
                    .catch(error => this.errors = error.response.data.errors)
            }
        }

    }
</script>

<style scoped>

</style>
