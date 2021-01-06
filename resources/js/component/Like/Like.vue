<template>
    <div class="likeIcon">
        <liked-icon class="text-primary" @click="unlikeIt" v-if="liked"></liked-icon>
        <like-icon class="text-primary" @click="likeIt" v-else></like-icon>
        <span>{{ count }}</span>
    </div>
</template>

<script>
    export default {
        name: "Like",
        props: ['likes', 'reply'],
        data() {
            return {
                count: this.likes.count,
                liked: this.likes.liked,
            }
        },
        methods: {
            incr() {
                return this.count++
            },
            decr() {
                return this.count--
            },
            likeIt() {
                if (User.loggedIn()) {
                    axios.post(`/api/like/${this.reply}`)
                        .then(response => {
                            this.liked = true;
                            this.incr()
                        })
                        .catch(error => console.log(error.response.data))
                }
            },
            unlikeIt() {
                if (User.loggedIn()) {
                    axios.delete(`/api/like/${this.reply}`)
                        .then(response => {
                            this.liked = false;
                            this.decr()
                        })
                        .catch(error => console.log(error.response.data))
                }
            },

        }

    }
</script>

<style>

    .likeIcon {
        font-size: 25px;
    }

</style>
