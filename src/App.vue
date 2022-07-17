<template>
  <router-view></router-view>
</template>

<script>
import Login from './views/login/login.vue'
import Alert from './components/alert.vue'
export default {
  components: {
    Login,
    Alert
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #app {
    width: 100%;
    height: 100%;
  }
</style>