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
    }

  },
  getters: {

  },

  mutations: {

    setToken: function (state, token) {
      state.user.token = token;
    },

    setUserInfo: async function (state, user) {
      state.user.id = user.id;
      state.user.name = user.name;
    }

  },

  actions: {

    setUserInfo: function (context, user) {
      context.commit('setUserInfo', user);
    },

    setToken: function (context, token) {
      context.commit('setToken', token);
    }

  },

});
