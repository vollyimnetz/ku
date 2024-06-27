import Home from '@/pages/Home.vue';
import Monitor from '@/pages/Monitor.vue';
import Controllroom from '@/pages/Controllroom.vue';
import Page404 from '@/pages/404.vue';


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