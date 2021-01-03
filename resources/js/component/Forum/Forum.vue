<template>
    <div class="container py-5">
        <div class="row">
            <div class="col-md-8">
                <div class="card" v-for="question in questions">
                    <div class="card-body">
                        <div class="media">
                            <div class="media-body">
                                <router-link :to="question.path" v-if="question.path">
                                    <h5 class="mt-0 mb-1">{{question.title}}</h5>
                                </router-link>
                                <span class="text-muted">{{question.user}} asked {{ question.created_at}}</span>
                                <br>
                                <div v-html="question.body"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="col-md-4">

                <side-bar></side-bar>

            </div>
        </div>
    </div>
</template>

<script>

    import SideBar from "./SideBar";

    export default {
        name: "Forum",
        components: {SideBar},
        computed: {
            questions() {
                return this.$store.getters.questions
            }
        },
        mounted() {
            this.$store.dispatch('questions')
        }
    }
</script>

<style scoped>

</style>
