// for version checking
require('../package.json')

// for SEO
require('../robots.txt')

// for mobile app
require("./assets/favicon-192.png")
require('./manifest.json')

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import 'whatwg-fetch';
import store from './store';

import './utils/polyfill';

// storing all the node templates
window.NodeTemplate = Object.create(null);

import Button from './vue/Button.vue';

Vue.config.productionTip = false

Vue.component('app-button', Button);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

// Sign in anoumously first
firebase.initializeApp(FIREBASE_CONFIG);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(function() {
    let creadential = localStorage.getItem(`firebase:authUser:${FIREBASE_CONFIG.apiKey}`);
    if(!creadential) {
      return firebase.auth().signInAnonymously()
    }
  }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error(errorCode, errorMessage)
  });  

// used when you want to ensure user data is available
window.getCurrentUser = function() {
  return new Promise(resolve => {
    let unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    })
  })
}