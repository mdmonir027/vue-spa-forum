<template>
    <span class="nav-link">
        <div class="dropdown">
          <a class="dropdown-toggle" role="button" id="notificationDropDown"
             data-toggle="dropdown"
             aria-haspopup="true" aria-expanded="false">
             <bell-outline class="notificationIcon" :class="notificationColor"></bell-outline>
             <sup :class="notificationColor"> {{ unreadCount }}</sup>
          </a>

          <div class="dropdown-menu" v-if="unreadCount > 0 || readCount > 0" aria-labelledby="notificationDropDown">

              <router-link :to="item.path" v-for="item in unread" :key="item.id"
                           class="dropdown-item">
                   <span @click="readIt(item)"> {{item.replyBy}} has reply on </span>
              </router-link>
              <hr v-if="read.length > 0 && unreadCount > 0">
              <span class="dropdown-item disabled" v-if="read.length > 0" v-for="item in read" :key="item.id"> {{item.replyBy}} has reply on</span>
          </div>
        </div>
    </span>
</template>

<script>
    import BellOutline from "vue-material-design-icons/BellCircle";
    import Exception from "../Helpers/Exception";

    export default {
        name: "AppNotifications",
        components: {BellOutline},
        data() {
            return {
                read: {},
                unread: {},
                readCount: 0,
                unreadCount: 0,
            }
        },
        methods: {
            getNotifications() {
                axios.post('/api/notifications')
                    .then(response => {
                        this.read = response.data.read;
                        this.unread = response.data.unread;
                        this.readCount = response.data.read.length;
                        this.unreadCount = response.data.unread.length;
                    })
                    .catch(error => Exception.handle(error))
            },
            readIt(notification) {
                axios.post('/api/markAsRead', {id: notification.id})
                    .then(response => {
                        console.log(this.unread);
                        this.unread.splice(notification, 1);
                        this.read.push(notification);
                        this.unreadCount--;
                    })
                    .catch(error => console.log(error))
            }
        },
        mounted() {
            this.getNotifications();
        },
        computed: {
            notificationColor() {
                return this.unreadCount > 0 ? 'text-danger' : 'text-primary'
            }
        },
        created() {
            Echo.private('App.Models.User.' + User.id())
                .notification((notification) => {
                    this.unread.unshift(notification)
                    this.unreadCount++;
                });
        }
    }
</script>

<style>
    #notificationDropDown .notificationIcon {
        font-size: 25px;
    }
    #notificationDropDown:after {
        display: none !important;
    }
</style>
