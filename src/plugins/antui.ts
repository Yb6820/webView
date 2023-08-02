import {
    Button,
    Checkbox,
    Form,
    Input,
    Layout,
    Menu,
    Table,
    Card,
    Pagination,
    DatePicker,
    Select,
    Upload,
    Modal
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
    .use(Table)
    .use(Card)
    .use(Pagination)
    .use(DatePicker)
    .use(Select)
    .use(Upload)
    .use(Modal)
}
