<template>
    
    <div class="likeIcon">
        <liked-icon class="text-primary likeIconCom" @click="unlikeIt" v-if="liked"></liked-icon>
        <like-icon class="text-primary likeIconCom" @click="likeIt" v-else></like-icon>
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
        created() {
            Echo.channel(`LikeChannel`)
                .listen('LikeEvent', (e) => {
                    if (e.id === this.reply) {
                        e.type === 1 ? this.count++ : this.count--;
                    }
                });
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
    .likeIconCom:hover{
        cursor: pointer;
    }

</style>
