import { useAntUIs } from './plugins/antui'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { useIcons } from './plugins/icon'

const app=createApp(App);
app.use(store).use(router).mount('#app')
useAntUIs(app);
useIcons(app);
