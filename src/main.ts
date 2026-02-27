import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import { useAppStore } from './stores/app';
import LiaoKit from '@yuandezuohua/liaokit';
import '@yuandezuohua/liaokit/dist/liaokit.css';
import './style.css';
import './assets/highlight.css';
import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(LiaoKit);

// 初始化应用设置
const appStore = useAppStore();
appStore.applyTheme();

app.mount('#app');
