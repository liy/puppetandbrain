<template>
  <div id="app">
    <header v-if="showHeader">
      <span>Vue.js PWA</span>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    showHeader() {
      return this.$route.path != '/editor'
    }
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

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
