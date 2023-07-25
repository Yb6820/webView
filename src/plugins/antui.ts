import {
    Button,
    Checkbox,
    Form,
    Input,
    Layout,
    Menu
} from 'ant-design-vue';
import type { App } from "vue";

export const useAntUIs=(app:App)=>{
    app
    .use(Button)
    .use(Form)
    .use(Input)
    .use(Checkbox)
    .use(Layout)
    .use(Menu)
}
