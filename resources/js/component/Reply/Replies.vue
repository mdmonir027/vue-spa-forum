<template>
    <div class=" mt-2">
        <add-reply :questionSlug="slug"></add-reply>
        <reply v-for="reply in replies" :key="reply.id" :reply="reply"></reply>
    </div>
</template>

<script>
    import AddReply from "./AddReply";
    import Reply from "./Reply";

    export default {
        name: "Replies",
        components: {Reply, AddReply},
        props: ['replies', 'slug'],
        // data(){
        //     return{
        //         replies: this.repliesP
        //     }
        // }
    }
</script>

<style scoped>

</style>
