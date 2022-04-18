<template>

  <v-app>
    <v-navigation-drawer app v-if="$store.state.appNavVisible">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Vue-project </v-list-item-title>
          <v-list-item-subtitle> 오준혁 </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app v-if="$store.state.appBarVisible">
      <v-app-bar-title> {{ $store.state.title }} </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app v-if="$store.state.appFooterVisible">
      <v-card flat tile class="text-center">
        <v-card-text></v-card-text>
        <v-card-text class="black--text pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="black--text">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>

</template>

<script>
export default {
  name: "App",

  data: () => ({
    items: [
      { title: "Home", icon: "home", to: "/" },
      { title: "About", icon: "question_mark", to:"/about" },
      { title: "Login", icon: "login", to:"/login" },
    ],
  }),
};
</script>
