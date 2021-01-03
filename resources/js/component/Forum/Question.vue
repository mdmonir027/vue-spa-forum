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
                                    <button class="btn btn-success float-right"> 5 Replies</button>
                                </div>
                            </div>
                            <hr>

                            <div class="media">
                                <div class="media-body" v-html="question.body"></div>
                            </div>

                        </div>
                        <div class="card-footer" v-if="own && !editing">
                            <button type="button" class="btn btn-primary btn-sm" @click="editQuestion()">Edit</button>
                            <button class="btn btn-danger btn-sm">Delete</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>

    import EditQuestion from "./EditQuestion";

    export default {
        name: "Question",
        components: {EditQuestion},
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
            cancelEditing() {
                EventBus.$on('cancelEditing', () => {
                    this.getQuestion();
                    this.editing = false;
                });
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
            this.cancelEditing();
            this.getQuestion();
        }
    }
</script>

<style scoped>

</style>
