import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import TodayView from '../views/TodayView.vue'
import FiveDayView from '../views/Forecast/FiveDayView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: TodayView
  },
  {
    path: '/today',
    name: 'today',
    component: TodayView
  },
  {
    path: '/fiveDay',
    name: 'fiveDay',
    component: FiveDayView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
