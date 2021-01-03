<template>
    <form @submit.prevent="questionUpdate()">

        <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" id="title" v-model="form.title" placeholder="Title">
            <div class="text-danger"></div>
        </div>


        <div class="form-group">
            <label>Body</label>
            <ckeditor :editor="editor" v-model="form.body" :config="editorConfig"></ckeditor>
        </div>
        <button type="submit" class="btn btn-primary">Update</button>
        <button type="submit" class="btn btn-danger" @click="cancel()">Cancel</button>

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
                }
            }
        },
        methods: {
            cancel() {
                EventBus.$emit('cancelEditing')
            },
            questionUpdate() {
                let this_ = this;
                axios.put(`/api/question/${this.$route.params.slug}` , this.form)
                    .then(response => this_.cancel())
                    .catch(error => console.log(error.response.data))
            }
        }
    }
</script>

<style scoped>

</style>
