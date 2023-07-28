import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TodayView from '../views/TodayView.vue'
import FiveDayView from '../views/Forecast/FiveDayView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/today',
    name: 'today',
    component: () => import(/* webpackChunkName: "today" */ '../views/TodayView.vue')
  },
  {
    path: '/fiveDay',
    name: 'fiveDay',
    component: () => import(/* webpackChunkName: "fiveDay" */ '../views/Forecast/FiveDayView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
