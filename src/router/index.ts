import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'

const routes = [
    {
        path: '/',
        name: "Home",
        component: Home,
        meta: {
            title: "肩部识别程序",
        }
    },
]


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach(async (to) => {
    if (to.meta.title) {
        document.title = to.meta.title as string;
    }
});

export default router
