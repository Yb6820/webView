import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/style.css'
import { useAntUIs } from './plugins/antui'
import { useIcons } from './plugins/icon'
import router from './router'
import store from './store'

const app=createApp(App);
app.use(store).use(router).mount('#app')
useAntUIs(app);
useIcons(app);
