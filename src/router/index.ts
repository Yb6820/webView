import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import AdminView from '../views/AdminView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  {
    path: '/',
    name: 'admin',
    component: AdminView
  },
  {
    path:'/hotel',
    name:'hotel',
    component:()=>import ('../components/hotel/HotelList.vue')
  },
  {
    path:'/md',
    name:'md',
    component:()=>import('../components/md/MarkDown.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
