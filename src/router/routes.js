import Home from '@/components/Home.vue';
import Monitor from '@/components/Monitor.vue';
import Controllroom from '@/components/Controllroom.vue';
import Page404 from '@/components/404.vue';


export default [
  {
    path: '/',
    name:'home',
    component: Home,
  }, {
    path: '/monitor',
    name: 'monitor',
    component: Monitor,
  }, {
    path: '/controll',
    name: 'controll',
    component: Controllroom,
  },
  {
    path: '/:pathMatch(.*)',
    component: Page404,
    meta: { bodyClass: 'page404' },
  }
];