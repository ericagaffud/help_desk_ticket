import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Hardware from './components/Hardware.vue'
import Connectivity from './components/Connectivity.vue'
import SubPage from './components/SubPage.vue'
import FinalPage from './components/FinalPage.vue'
import DataPage from './components/DataPage.vue'
import Upload from './components/upload.vue'


Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path:'/hardware',
        name: 'Hardware',
        component: Hardware
    },
    {
        path:'/connectivity',
        name: 'Connectivity',
        component: Connectivity
    },
    {
        path:'/subpage',
        name: 'SubPage',
        component: SubPage
    },
    {
        path:'/finalpage',
        name: 'FinalPage',
        component: FinalPage
    },
    {
        path: '/data',
        name: DataPage,
        component: DataPage
    },
    {
        path: '/software',
        name: 'Software',
        component: () => import('./components/Software.vue')
    },
    {
        path: '/upload',
        name: Upload,
        component: Upload
    }
]

const router = new Router ({
    routes: routes,
    mode: 'history'
})

export default router;