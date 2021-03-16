import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/notes/list'
  },
  {
    path: '/notes/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/notes/list'
      },
      {
        path: 'list',
        component: () => import('@/views/Tab1.vue')
      },
      {
        path: 'favorites',
        component: () => import('@/views/Tab2.vue')
      },
      {
        path: 'categories',
        component: () => import('@/views/Tab3.vue')
      },
      {
        path: 'add',
        component: () => import('@/views/AddNote.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
