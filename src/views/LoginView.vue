<template>
  <v-app>
    <v-card width="500" style="top: 25%" class="mx-auto mt-5">
      <v-card-title class="pb-0">
        <h3>Login</h3>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field label="Id" v-model="id" />
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            v-model="password"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="success" @click="signUp">회원가입</v-btn>
        <v-btn color="info" @click="login">로그인</v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
const PAGE_NAME = "Login";

export default {

  data: () => ({
    name: PAGE_NAME,

    showPassword: false,

    id: "",

    password: "",
  }),

  methods : {
    async login() {
      const response = await this.$api(`/auth/user`, "post", {
        id: this.id,
        pwd: this.password,
      });

      if(response.token){
        this.$store.state.user.token = response.token;
        this.goToHome();
      }
    },

    signUp(){
      
    },

    goToHome(){
      this.$router.push({path: '/'});
    }

  },

  mounted() {
    this.$store.state.title = PAGE_NAME;
    this.$store.state.appBarVisible = false;
    this.$store.state.appNavVisible = false;
    this.$store.state.appFooterVisible = false;
    if(this.token){
      this.goToHome();
    }
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
