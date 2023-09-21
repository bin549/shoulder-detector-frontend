import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/auth/index.vue'
import NotFound from '~/pages/404.vue'

const routes = [
    {
        path: '/',
        name: "Home",
        component: Home,
        meta: {
            title: "肩部识别程序-首页",
        }
    },
    {
        path: '/login',
        name: "Login",
        component: Login,
        meta: {
            title: "肩部识别程序-登录页",
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]


export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach(async (to) => {
    if (to.meta.title) {
        document.title = to.meta.title as string;
    }
});

export default router
