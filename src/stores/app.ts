import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { AppSettings } from '@/types';

export const useAppStore = defineStore('app', () => {
  const settings = ref<AppSettings>({
    theme: 'auto',
    fontSize: 14,
    lineNumbers: true,
    wordWrap: true,
  });

  const sidebarOpen = ref(false);

  function updateTheme(theme: 'light' | 'dark' | 'auto') {
    settings.value.theme = theme;
    applyTheme();
  }

  function applyTheme() {
    const { theme } = settings.value;
    let targetTheme: 'light' | 'dark' = 'light';

    if (theme === 'auto') {
      targetTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      targetTheme = theme;
    }

    if (targetTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value;
  }

  function setSidebarOpen(open: boolean) {
    sidebarOpen.value = open;
  }

  return {
    settings,
    sidebarOpen,
    updateTheme,
    applyTheme,
    toggleSidebar,
    setSidebarOpen,
  };
});