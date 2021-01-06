<template>

    <div class="media-body">
        <ckeditor :editor="editor" v-model="body" :config="editorConfig"></ckeditor>
        <hr>
        <button class="btn btn-outline-success btn-sm" @click="updateReply">
            <save-icon></save-icon>
        </button>
        <span class="btn btn-outline-danger btn-sm" @click="cancel()"><cancel-icon></cancel-icon></span>
    </div>
</template>

<script>
    import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


    export default {
        name: "EditReply",
        props: ['reply'],
        data() {
            return {
                body: this.reply.reply,
                editor: ClassicEditor,
                editorConfig: {},
            }
        },
        methods: {
            cancel() {
                EventBus.$emit('cancelReplyUpdate')
            },
            updateReply() {
                axios.patch(`/api/question/${this.reply.question_slug}/reply/${this.reply.id}`, {body: this.body})
                    .then(response => this.cancel())
                    .catch(error => console.log(error.response.data))
            }
        }
    }
</script>

<style scoped>

</style>
