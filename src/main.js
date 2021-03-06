if(process.env.NODE_ENV !== 'dev') {  
  require('offline-plugin/runtime').install();
}

// for version checking
require('../package.json')

// for SEO
require('../robots.txt')

require("./assets/favicon-192.png")

// for android app
require('./manifest.json')
require('./assets/icons/android-1x.png')
require('./assets/icons/android-2x.png')
require('./assets/icons/android-3x.png')
require('./assets/icons/android-4x.png')
require('./assets/icons/android-512.png')

// for ios app
require('./assets/icons/ios-192.png')

// default meta data image for twitter card image and other open graph share services, i.e., facebook share
// serverside rendering needs to be implemented for in order to supply dynmaic snapshot image for each activity
require('./assets/site-image.jpg')

// firebase
import firebase from 'firebase/app'
window.firebase = firebase;
import 'firebase/auth'

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
import './editor/NodeTemplate';

import Button from './vue/Button.vue';

Vue.config.productionTip = false

Vue.component('app-button', Button);

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
      if(user) {
        unsubscribe();
        resolve(user);
      }
    })
  })
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})