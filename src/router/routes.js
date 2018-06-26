export default [
    { 
        path: '/', 
        name:'home',
        component: require('~/pages/Home.vue'),
    }, {
        path: '/monitor',
        name: 'monitor',
        component: require('~/pages/Monitor.vue'),
    }, {
        path: '/controll',
        name: 'controll',
        component: require('~/pages/Controllroom.vue'),
    },
    
    { 
        path: '*', 
        component: require('~/pages/404.vue'), 
        meta: { bodyClass: 'page404' }, 
    }
];