<template>
    <div class="container py-5">
        <div class="row">
            <div class="col-md-8">

                <question-comp v-for="question in questions" :question="question"></question-comp>

            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import QuestionComp from "./comp/QuestionComp";
    export default {
        name: "Forum",
        components: {QuestionComp},
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
