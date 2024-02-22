<template>
  <v-app id="inspire" v-if="isLogin">
    {{ isLogin }}
    <v-system-bar>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-navigation-drawer v-model="drawer">
      <v-sheet color="grey-lighten-4" class="pa-4">
        <v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>

        <div>{{ UserData.FullName }}</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="[icon, text] in links" :key="icon" :prepend-icon="icon" :title="text" link @click="Route(text)"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container class="py-8 px-6" fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
  <v-app id="inspire" v-else>
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
const cards = ['Today', 'Yesterday']
const links = [
  ['mdi-inbox-arrow-down', 'Brands'],
  ['mdi-alert-octagon', 'Logout'],
]

const drawer = ref(null)
</script>

<script>
export default {
  data: () => ({
    cards: ['Today', 'Yesterday'],
    drawer: null,
    isLogin:false,
    UserData: null,
    links: [
      ['mdi-inbox-arrow-down', 'Brands'],
      ['mdi-log-out', 'Logout'],
    ],
  }),
  created() {
    this.UserData = localStorage.getItem('UserData')?localStorage.getItem('UserData'):null;
    this.UserData = JSON.parse(this.UserData);
    if (!localStorage.getItem('Token')) {
      this.isLogin = false;      
        this.$router.push('/login');
    }else{
      this.isLogin = true;
    }
  },
  methods:{
    Route(Text){
      console.log(Text)
      if(Text == "Logout"){
        localStorage.removeItem('Token')
        this.isLogin = false;
        this.$router.push('/login');
      }
    }
  }
}
</script>