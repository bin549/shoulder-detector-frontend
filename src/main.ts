import { createApp } from 'vue'
import App from './App.vue'
import 'uno.css'
import router from "~/router";
import { createPinia } from "pinia";
import "nprogress/nprogress.css"
import "./permission"
import store from './stores'
import Naive from './plugin/naive-ui'
const app = createApp(App)

app.use(store)
app.use(router)
app.use(Naive)
app.use(createPinia())

app.mount('#app');
