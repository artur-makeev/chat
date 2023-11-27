import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
// @ts-ignore
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'

const app = createApp(App)
app.use(bootstrap)
app.mount('#app')
