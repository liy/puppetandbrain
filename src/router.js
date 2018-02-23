import Vue from 'vue'
import Router from 'vue-router'
import Editor from './editor/Editor.vue'
import Home from './home/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/editor',
      name: 'Editor',
      component: Editor
    },
    {
      path: '/tutorials/:tutorialName',
      name: 'Tutorial',
      component: Editor,
    }
  ]
})
