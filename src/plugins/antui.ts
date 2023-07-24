import type { App } from "vue";
import {
Button,
Form,
Input,
Checkbox,
Layout
} from 'ant-design-vue'

export const useAntUIs=(app:App)=>{
    app
    .use(Button)
    .use(Form)
    .use(Input)
    .use(Checkbox)
    .use(Layout)
}
