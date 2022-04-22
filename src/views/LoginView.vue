<template>
  <v-app>
    <v-card width="500" style="top: 25%" class="mx-auto mt-5">
      <v-card-title class="pb-0">
        <h3>Login</h3>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field label="Id" v-model="id" @keyup.enter="$refs.pwd.focus()"/>
          <v-text-field
            ref="pwd"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            v-model="password"
            @keyup.enter="login"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <SignUpModal btn-color="success">
          <template v-slot:title>회원가입</template>
        </SignUpModal>
        <v-btn color="info" @click="login" style="margin-left: 8px;">로그인</v-btn>
      </v-card-actions>
    </v-card>

    
  </v-app>
</template>

<script>
import SignUpModal from './SignupView'
import {mapActions} from 'vuex'

const PAGE_NAME = "Login";

export default {

  data: () => ({
    name: PAGE_NAME,

    showPassword: false,

    id: "",

    password: "",
  }),

  components : {
    SignUpModal
  },

  methods : {

    ...mapActions(['setToken', 'setUserInfo']),

    async login() {
      const response = await this.$api(`/auth/user`, "post", {
        id: this.id,
        pwd: this.password,
      });

      if(response?.status === this.HTTP_OK){
        const token = response.data.token;
        this.setToken(token);
        
        const {data : user} = await this.$api(`/api/auth/user`, 'get')
        this.setUserInfo(user);

      } else if(response?.data?.error){
        alert(response.data.error);
      }
    },

  },

  mounted() {
    this.$store.state.title = PAGE_NAME;
    this.$store.state.appBarVisible = false;
    this.$store.state.appNavVisible = false;
    this.$store.state.appFooterVisible = false;
  },

  beforeDestroy() {
    this.$store.state.appBarVisible = true;
    this.$store.state.appNavVisible = true;
    this.$store.state.appFooterVisible = true;
  },

  computed : {
    token() {
      return this.$store.state.user.token;
    }
  }
}
</script>
