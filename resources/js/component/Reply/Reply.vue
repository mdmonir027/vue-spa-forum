<template>
    <div class="">
        <div class="media mt-4 border p-3" v-if="editing">
            <edit-reply :reply="reply"></edit-reply>
        </div>
        <div class="media mt-4 border p-3" v-else>
            <div class="media-body">
                <h5 class="mt-0">{{reply.user}} <span class="badge badge-primary"> replied {{reply.created_at}}</span>
                </h5>

                <div v-html="reply.reply"></div>

                <hr v-if="own">
                <div v-if="own">
                    <!--                <button class="btn btn-warning btn-sm" @click="editReply">thumb_up</button>-->
                    <button class="btn btn-outline-secondary btn-sm" @click="editReply">
                        <edit-icon></edit-icon>
                    </button>
                    <button class="btn btn-outline-info btn-sm" @click="deleteReply">
                        <delete-icon></delete-icon>
                    </button>
                </div>
            </div>
            <div class="float-right mr-2">
                <like :likes="reply.likes" :reply="reply.id"></like>
            </div>
        </div>


    </div>

</template>

<script>

    import EditReply from "./EditReply";
    import Like from "../Like/Like";

    export default {
        name: "Reply",
        props: ['reply'],
        components: {Like, EditReply},
        data: () => {
            return {
                editing: false,
                own: false
            }
        },
        methods: {
            editReply() {
                this.editing = true;
            },
            listen() {
                let this_ = this;
                EventBus.$on('cancelReplyUpdate', () => {
                    this_.editing = false;
                })
            },
            deleteReply() {
                axios.delete(`/api/question/${this.reply.question_slug}/reply/${this.reply.id}`)
                    .then(response => {
                        EventBus.$emit('deleteReply')
                    })
                    .catch(error => console.log(error.response.data))
            },
            ownReply() {
                this.own = User.own(this.reply.user_id);
            },

        },
        mounted() {
            this.listen();
            this.ownReply();
        }
    }
</script>

<style scoped>

</style>
