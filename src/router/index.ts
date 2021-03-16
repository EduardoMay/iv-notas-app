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
        component: () => import('@/views/ListNotes.vue')
      },
      {
        path: 'view/:id',
        component: () => import('@/views/ViewNote.vue')
      },
      {
        path: 'favorites',
        component: () => import('@/views/FavoritesNotes.vue')
      },
      {
        path: 'categories',
        component: () => import('@/views/CategoriesNotes.vue')
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
