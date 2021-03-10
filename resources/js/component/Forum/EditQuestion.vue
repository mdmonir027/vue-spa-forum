<template>
    <form @submit.prevent="questionUpdate()">

        <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" id="title" v-model="form.title" placeholder="Title">
            <div class="text-danger" v-if="errors && errors.title ">{{ errors.title[0] }}</div>
        </div>


        <div class="form-group">
            <label>Body</label>
            <ckeditor :editor="editor" v-model="form.body" :config="editorConfig"></ckeditor>
            <div class="text-danger" v-if="errors && errors.body ">{{ errors.body[0] }}</div>
        </div>
        <button type="submit" class="btn btn-success btn-sm">
            <save-icon></save-icon>
        </button>
        <button type="submit" class="btn btn-warning btn-sm" @click="cancel()">
            <cancel-icon></cancel-icon>
        </button>

    </form>
</template>

<script>
    import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

    export default {
        name: "EditQuestion",
        props: ['question'],
        data() {
            return {
                editor: ClassicEditor,
                editorConfig: {},
                form: {
                    body: this.question.body,
                    title: this.question.title,
                },
                errors: {}
            }
        },
        methods: {
            cancel() {
                EventBus.$emit('cancelEditing')
            },
            questionUpdate() {
                let this_ = this;
                axios.put(`/api/question/${this.$route.params.slug}`, this.form)
                    .then(response => this_.cancel())
                    .catch(error => this.errors = error.response.data.errors)
            }
        }
    }
</script>

<style scoped>

</style>
