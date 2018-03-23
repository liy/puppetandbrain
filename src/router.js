import Vue from 'vue'
import Router from 'vue-router'
import Home from './home/Home.vue'
import About from './about/About.vue'
import Contact from './contact/Contact.vue'
import QueAns from './q&a/QueAns.vue'
import store from '@/store';

const Tutorial = () => import('./tutorials/Tutorial.vue');
const TutorialList = () => import('./tutorials/TutorialList.vue')
const Editor = () => import('./editor/Editor.vue');
const CreationList = () => import('./creations/CreationList.vue');

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: (to, from, next) => {
        document.body.className = 'home'
        
        next();
      }
    },
    {
      path: '/editor',
      name: 'Editor',
      component: Editor,
      beforeEnter(to, from, next) {
        document.body.className = 'editor'
        // not tutorial
        store.commit('updateTutorialMode', false);

        next();
      },
    },
    {
      path: '/editor/:activityID',
      name: 'Creation',
      component: Editor,
      props: true,
      beforeEnter: (to, from, next) => {
        document.body.className = 'editor'
        // not tutorial
        store.commit('updateTutorialMode', false);
        next();
      }
    },
    {
      path: '/tutorials',
      name: 'TutorialList',
      component: TutorialList,
      async beforeEnter(to, from, next) {
        document.body.className = 'tutorial-list'
        next();
      }
    },
    {
      path: '/tutorials/:tutorialName',
      name: 'Tutorial',
      component: Tutorial,
      beforeEnter: (to, from, next) => {
        document.body.className = 'editor'
        store.commit('updateTutorialMode', true);
        next();
      }
    },
    {
      path: '/creations',
      name: 'Creations',
      component: CreationList,
      beforeEnter: (to, from, next) => {
        document.body.className = 'creations'
        next();
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      beforeEnter: (to, from, next) => {
        document.body.className = 'about'
        next();
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
      beforeEnter: (to, from, next) => {
        document.body.className = 'contact'
        next();
      }
    },
    {
      path: '/que-ans',
      name: 'que-ans',
      component: QueAns,
      beforeEnter: (to, from, next) => {
        document.body.className = 'que-ans'
        next();
      }
    }
  ]
})
