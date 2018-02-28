import Vue from 'vue'
import Router from 'vue-router'
import Home from './home/Home.vue'
import store from '@/store';

const Tutorial = () => import('./tutorials/Tutorial.vue');
const Editor = () => import('./editor/Editor.vue');

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: (to, from, next) => {
        document.body.className = ''
        
        next();
      }
    },
    {
      path: '/editor',
      name: 'Editor',
      component: Editor,
      beforeEnter: (to, from, next) => {
        // TODO: auto play tutorial if user first time visit
        document.body.classList.add('editor-body')
        // not tutorial
        store.tutorialMode = false;
        next();
      }
    },
    {
      path: '/editor/:activityID',
      name: 'Creations',
      component: Editor,
      props: true,
      beforeEnter: (to, from, next) => {
        // TODO: auto play tutorial if user first time visit
        document.body.classList.add('editor-body')
        // not tutorial
        store.tutorialMode = false;
        next();
      }
    },
    {
      path: '/tutorials/:tutorialName',
      name: 'Tutorial',
      component: Tutorial,
      beforeEnter: (to, from, next) => {
        // TODO: auto play tutorial if user first time visit
        document.body.classList.add('editor-body')
        store.tutorialMode = true;
        next();
      }
    }
  ]
})
