import { createApp } from 'vue'
import App from './App.vue'
import 'uno.css'
import router from "~/router";
import { createPinia } from "pinia";
import "nprogress/nprogress.css"

const app = createApp(App)

app.use(router)
app.use(createPinia())

app.mount('#app');
