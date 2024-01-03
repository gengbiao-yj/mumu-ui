import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import mumuUI from '@mumu-ui/mumu-ui'

const env = import.meta.env
console.log(env)
createApp(App).use(ElementPlus).use(mumuUI).mount('#app')
