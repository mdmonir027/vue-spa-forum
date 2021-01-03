<template>
    <div class="card">
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
</template>

<script>
    export default {
        name: "QuestionComp",
        props: ['question']
    }
</script>

<style scoped>

</style>
