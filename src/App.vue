<template>
  <div id="app">
    <main>
      <router-view></router-view>
    </main>
    <span id='app-version'>{{appVersion}}</span>
  </div>
</template>

<script>
import './Tooltip.scss'

import Header from './vue/Header.vue';

export default {
  name: 'app',
  data() {
    return {
      appVersion: APP_VERSION
    }
  }
}
</script>

<style lang='scss'>
body {
  font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;

  margin:0; 
  
  // remove mobile selection hightlight
  -webkit-tap-highlight-color: rgba(0,0,0,0);


  background-color: #b574ed;
  // background-color: #f5f5f5;
  transition: background-color ease 0.3s;
}

.editor-body {
  background-color: #f5f5f5;
}

#modal-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#app-version {
  position: absolute;
  font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 10px;
  color: rgb(175, 175, 175);
  bottom: 3px;
  left: 3px;
  
  user-select: none;
  pointer-events: none;
}
</style>
