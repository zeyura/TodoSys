import Vue from 'vue'
import VueRouter from 'vue-router'
import Create from '../views/Create.vue'

Vue.use(VueRouter)

  const routes = [
      {
        path: '/',
        name: 'Create',
        component: Create
      },
      {
        path: '/list',
        name: 'List',
        component: () => import('../views/List.vue')  // dinam import
      },
      {
          path: '/task/:id',
          name: 'Task',
          component: () => import('../views/Task.vue')
      }
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
