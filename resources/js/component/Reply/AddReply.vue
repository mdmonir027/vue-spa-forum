<template>
    <div class=" mt-5 ">
        <div class="">
            <form @submit.prevent="addReply">
                <div class="form-group">
                    <ckeditor :editor="editor" v-model="body" :config="editorConfig"></ckeditor>
                </div>
                <button type="submit" class="btn btn-success btn-sm">Reply</button>
            </form>
        </div>
    </div>
</template>

<script>
    import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

    export default {
        name: "AddReply",
        props: ['questionSlug'],
        data() {
            return {
                body: null,
                editor: ClassicEditor,
                editorConfig: {},
            }
        },
        methods: {
            addReply() {
                axios.post(`/api/question/${this.questionSlug}/reply`, {body: this.body})
                    .then(response => {
                        this.body = ''
                        EventBus.$emit('addReply', response.data);
                    })
                    .catch(error => console.log(error.response.data))
            }
        }
    }
</script>

<style scoped>

</style>
