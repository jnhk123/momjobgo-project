<template>
    <v-app>
        <NavView></NavView>

        <HeaderView></HeaderView>

        <MainView></MainView>

        <FooterView></FooterView>
    </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import NavView from "./views/layout/NavView.vue";
import HeaderView from "./views/layout/HeaderView.vue";
import FooterView from "./views/layout/FooterView.vue";
import MainView from "./views/layout/MainView.vue";
import Page from "./utils/Page";

export default {
    name: "App",
    data: () => ({}),

    components: {
        NavView,
        HeaderView,
        MainView,
        FooterView,
    },

    mounted() {
        this.checkToken();
    },

    methods: {
        checkToken() {
            if( this.hasToken && Page.method.getSubPath() !== Page.HOME.path){
                this.$router.push({ path: Page.HOME.path });
            } else if (!this.hasToken && Page.method.getSubPath() !== Page.LOGIN.path){
                this.$router.push({ path: Page.LOGIN.path });
            }
        },
    },

    computed: {
        ...mapGetters(["hasToken"]),
    },

    watch: {
        'hasToken': function () {
            this.checkToken();
        },
    },

};
</script>
