import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Info',
      component: require('@/components/Info').default,
    },
    {
      path: '/plan',
      name: 'Plan',
      component: require('@/components/Plan').default,
    },
    {
      path: '/aim',
      name: 'Aim',
      component: require('@/components/Aim').default,
    },
    {
      path: '/analyze',
      name: 'Analyze',
      component: require('@/components/Analyze').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
})
