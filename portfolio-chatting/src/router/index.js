import Vue from 'vue'
import VueRouter from 'vue-router'
import helloWorld from '../components/HelloWorld.vue'
import Titlepage from '../components/Titlepage.vue'
import Mainpage from '../components/Mainpage.vue'
import Chatpage from '../components/Chatpage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Titlepage',
    component: Titlepage
  },
  {
    path: '/Mainpage',
    name: 'Mainpage',
    component: Mainpage
  },
  {
    path: '/Chatpage',
    name: 'Chatpage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Chatpage
  },
  {
    path: '/Hello',
    name: 'HelloPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: helloWorld
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
