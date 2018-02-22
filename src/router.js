import Vue from 'vue'
import Router from 'vue-router'
import Editor from '@/editor/Editor.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/editor',
      name: 'Editor',
      component: Editor
    }
  ]
})
