<template>
    <div class="container py-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">

                        <div v-if="editing">
                            <edit-question :question="question"></edit-question>
                        </div>

                        <div class="" v-else>


                            <div class="row">
                                <div class="col-md-8">
                                    <h5 class="mt-0 mb-1">{{ question.title }}</h5>
                                    <span class="text-muted">{{question.user}} asked {{ question.created_at }}</span>
                                </div>
                                <div class="col-md-4 ">
                                    <button class="btn btn-success float-right"> {{ question.repliy_count }} Replies
                                    </button>
                                </div>
                            </div>
                            <hr>

                            <div class="media">
                                <div class="media-body" v-html="question.body"></div>
                            </div>

                        </div>

                    </div>
                    <div class="card-footer" v-if="own && !editing">
                        <button type="button" class="btn btn-secondary btn-sm" @click="editQuestion()">
                            <edit-icon></edit-icon>
                        </button>
                        <button class="btn btn-info btn-sm" @click="deleteQuestion()">
                            <delete-icon></delete-icon>
                        </button>
                    </div>
                </div>
                <replies :replies="question.replies" :slug="question.slug"></replies>
            </div>
        </div>
    </div>
</template>

<script>

    import EditQuestion from "./EditQuestion";
    import Replies from "../Reply/Replies";


    export default {
        name: "Question",
        components: {Replies, EditQuestion},
        data() {
            return {
                question: {},
                own: false,
                editing: false,

            }
        },
        methods: {
            getQuestion() {
                let this_ = this;
                axios.get(`/api/question/${this.$route.params.slug}`)
                    .then(response => {
                        this.question = response.data
                        this_.checkOwn(response.data.user_id)
                    })
                    .catch(error => console.log(error))
            },
            checkOwn(userId) {
                this.own = User.own(userId)
            },
            editQuestion() {
                this.editing = true;
            },
            listen() {
                EventBus.$on('cancelEditing', () => {
                    this.getQuestion();
                    this.editing = false;
                });
                EventBus.$on('deleteReply', () => {
                    this.getQuestion();
                });
                EventBus.$on('addReply', () => {
                    this.getQuestion();
                });
                EventBus.$on('cancelReplyUpdate', () => {
                    this.getQuestion();
                });

                Echo.private('App.Models.User.' + User.id())
                    .notification((notification) => {
                        this.question.replies.unshift(notification.reply)
                        this.question.repliy_count++;
                    });
            },
            deleteQuestion() {
                axios.delete(`/api/question/${this.$route.params.slug}`)
                    .then(response => this.$router.push({name: 'Home'}))
                    .catch(error => console.log(error.response.data))
            }
        },
        watch: {
            check() {
                this.getQuestion();
            }
        },
        mounted() {
            this.getQuestion();
            this.checkOwn();
            this.listen();
            this.getQuestion();
        },
        created() {
        }
    }
</script>

<style scoped>

</style>
