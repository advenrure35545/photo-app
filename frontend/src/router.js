import Vue from 'vue'
import Router from 'vue-router'
import MainPage from './views/MainPage.vue'
import LoginPage from './views/LoginPage'
import store from './store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      beforeEnter: guard,
      component: MainPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    }
  ]
})

function guard(to, from, next){
  if(store.getters.token){
    next()
  }else{
    next('/login')
  }
}

router.beforeEach()

export default router
