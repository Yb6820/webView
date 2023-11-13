import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/style.css'
import { useAntUIs } from './plugins/antui'
import { useIcons } from './plugins/icon'
import router from './router'
import store from './store'
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme  from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

import hljs from 'highlight.js';

VMdPreview.use(githubTheme , {
    Hljs: hljs,
});
VueMarkdownEditor.use(githubTheme,{
    Hljs:hljs,
})
const app=createApp(App);
app.use(store).use(router).use(VMdPreview).use(VueMarkdownEditor).mount('#app')
useAntUIs(app);
useIcons(app);
