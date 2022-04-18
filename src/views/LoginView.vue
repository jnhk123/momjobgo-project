<template>
  <div>
    <v-card>
      <v-responsive :aspect-ratio="16/9">
        <v-card-text>
          로그인 만들거임
        </v-card-text>
      </v-responsive>
    </v-card>
  </div>
</template>

<script>
const PAGE_NAME = "Login"

export default {
    name : PAGE_NAME,

    mounted() {
        this.$store.state.title = PAGE_NAME;
        this.$store.state.appBarVisible = false;
        this.$store.state.appNavVisible = false;
        this.$store.state.appFooterVisible = false;
    },

    unmounted() {
        this.$store.state.appBarVisible = true;
        this.$store.state.appNavVisible = true;
        this.$store.state.appFooterVisible = true;
    },    
}
</script>