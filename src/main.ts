import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import { useAppStore } from './stores/app';
import './style.css';
import './assets/highlight.css';
import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// 初始化应用设置
const appStore = useAppStore();
appStore.applyTheme();

app.mount('#app');
