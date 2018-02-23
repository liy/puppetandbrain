// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'whatwg-fetch';

import Button from './vue/Button.vue';

Vue.config.productionTip = false

Vue.component('app-button', Button);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

// Sign in anoumously first
firebase.initializeApp(FIREBASE_CONFIG);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                .then(function() {
                  return firebase.auth().signInAnonymously()
                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.error(errorCode, errorMessage)
                });

firebase.auth().onAuthStateChanged(user => {
  // sign in
  if(user) {
    window.CurrentUser = user;
  }
  // sign out
  else {
    
  }
})