<template>
    <div>
        <app-header></app-header>
        <router-view></router-view>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import AppHeader from "./AppHeader";
    import AppFooter from "./AppFooter";

    export default {
        name: "AppHome",
        components: {AppFooter, AppHeader}
    }
</script>

<style scoped>

</style>
