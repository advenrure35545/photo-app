<template>
  <div id="app">
    <header v-if="token">
      <div class="uk-container">
        <Navbar></Navbar>
      </div>
    </header>
    <router-view/>
  </div>
</template>

<script>
  import Navbar from './components/Navbar'
  import {mapGetters} from 'vuex'

  export default {
    components: {
      Navbar
    },
    computed: {
      ...mapGetters([
          'token'
      ])
    }
  }
</script>

<style lang="scss">
  body, html{
    width: 100%;
    height: 100%;
  }

  header{
    padding: 2rem 0;
    background: #000;
  }
</style>

