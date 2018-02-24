<template>
  <div id="app">
    <app-header title='test'/>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Header from './vue/Header.vue';

export default {
  name: 'app',
  components: {
    'app-header': Header
  },
  computed: {
    showHeader() {
      return this.$route.path != '/editor'
    }
  },
  mounted() {
  }
}
</script>

<style lang='scss'>
body {
  font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;

  margin:0; 
  // background-color: #eeeeee;
  background-color: #f5f5f5;
  
  // remove mobile selection hightlight
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
</style>
