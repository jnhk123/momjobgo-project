import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import UserView from '../views/UserView.vue'
import BoardsView from '../views/BoardsView.vue'

import Page from '@/utils/Page'

Vue.use(VueRouter)

const routes = [
    {
        ...Page.HOME,
        component: HomeView
    },
    {
        ...Page.ABOUT,
        component: AboutView
    },
    {
        ...Page.USER,
        component: UserView
    },
    {
        ...Page.BOARD,
        component: BoardsView
    }







    , {
        ...Page.LOGIN,
        component: LoginView
    }
]

const router = new VueRouter({
    base : `${Page.BASE_PATH}`,
    mode: 'history',
    routes
});

router.beforeEach(function (to, from, next) {
    if (store.state.user.token || to.path === Page.LOGIN.path) {
        next();
    }
});

router.afterEach(function (to, from) {
    store.dispatch('setTitle', to.meta.title);
});

export default router
