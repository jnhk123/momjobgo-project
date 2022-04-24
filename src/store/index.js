import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: 'Home',

    appBarVisible: true,
    appNavVisible: true,
    appFooterVisible: true,

    user: {
      token: '',
      name: '',
      id: ''
    },

    menuList: []

  },
  getters: {

    userInfo(state){
      return state.user;
    },

    hasToken(state) {
      return !!state.user.token
    },

    token(state) {
      return state.user.token;
    },

    title(state) {
      return state.title;
    },

    menuList(state) {
      return state.menuList;
    }
  },

  mutations: {

    setToken: function (state, token) {
      state.user.token = token;
    },

    setUserInfo: async function (state, user) {
      state.user.id = user.id;
      state.user.name = user.name;
    },

    setTitle: function (state, title) {
      state.title = title;
    },

    setMenuList: function (state, menuList) {
      state.menuList = menuList;
    }

  },

  actions: {

    setUserInfo: function (context, user) {
      context.commit('setUserInfo', user);
    },

    setToken: function (context, token) {
      context.commit('setToken', token);
    },

    setTitle: function (context, title) {
      context.commit('setTitle', title);
    },

    setMenuList: function (context, menuList) {
      context.commit('setMenuList', menuList);
    }

  },

});
