import Vue from 'vue'
import Router from 'vue-router'
import Home from './home/Home.vue'
import About from './about/About.vue'
import Contact from './contact/Contact.vue'
import store from '@/store';
import ConfirmModal from './editor/ui/ConfirmModal';

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
        document.body.className = 'home'
        
        next();
      }
    },
    {
      path: '/editor',
      name: 'Editor',
      component: Editor,
      async beforeEnter(to, from, next) {
        document.body.className = 'editor'
        // not tutorial
        store.tutorialMode = false;

        next();
        
        // first time visit?
        if(!localStorage.getItem('visited')) {
          let modal = new ConfirmModal('How about a simple tutorial.', 'First time visit?')
          modal.primaryText = 'Yes, please';
          modal.secondaryText = 'Nah...';
          let {action} = await modal.open();
          if(action) {
            next('/tutorials/animate-a-puppet');
          }
        }
      },
    },
    {
      path: '/editor/:activityID',
      name: 'Creation',
      component: Editor,
      props: true,
      beforeEnter: (to, from, next) => {
        console.log('route before enter')
        // TODO: auto play tutorial if user first time visit
        document.body.className = 'editor'
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
        document.body.className = 'editor'
        store.tutorialMode = true;
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
    }
  ]
})
