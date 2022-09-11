import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import SvgIcon from '@/icons'
import 'element-plus/dist/index.css'
import '@/router/permission'
import * as ElIcons from '@element-plus/icons-vue'


const app = createApp(App);
for(const iconName in ElIcons){
    app.component(iconName,ElIcons[iconName])
}
SvgIcon(app);
app.use(store).use(router).mount('#app');
