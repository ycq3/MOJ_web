import Vue from 'vue'
import Router from 'vue-router'
import MOJHome from '@/components/MOJHome'
import MOJMenu from '@/components/MOJMenu'
import Problem from '@/components/Problem/ProblemList'
import Test from '@/components/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MOJHome',
      component: MOJHome
    },
    {
      path: '/menu',
      name: 'Menu',
      component: MOJMenu
    },
    {
      path: '/problem',
      name: 'Problem',
      component: Problem
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
})
