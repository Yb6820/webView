import type {App}from 'vue'
import {
UserOutlined,
LockOutlined  
} from '@ant-design/icons-vue'

export const useIcons=(app:App)=>{
    app.component(UserOutlined.name,UserOutlined),
    app.component(LockOutlined.name,LockOutlined)
};
