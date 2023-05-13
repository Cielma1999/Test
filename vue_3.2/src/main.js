import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import SvgIcon from '@/icons'
import 'element-plus/dist/index.css'
import '@/router/permission'
import * as ElIcons from '@element-plus/icons-vue'
import i18n from '@/i18n'
import filters from './utils/filters'
const app = createApp(App);
for(const iconName in ElIcons){
    app.component(iconName,ElIcons[iconName])
}
filters(app);
SvgIcon(app);
app.use(store).use(router).use(i18n).mount('#app');
