<template>
  <div class="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full">
    <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
      <h3 class="font-semibold text-gray-900 dark:text-white text-sm">文件</h3>
    </div>
    <div class="p-2">
      <div
        v-for="file in files"
        :key="file.id"
        :class="fileItemClasses(file.id)"
        @click="$emit('select', file.id)"
      >
        <span class="mr-2">{{ getFileIcon(file.name) }}</span>
        <span class="flex-1 truncate">{{ file.name }}</span>
        <span
          v-if="file.id === currentFileId && unsavedChanges"
          class="text-yellow-500"
        >
          ●
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FileNode } from '@/types';

interface Props {
  files: FileNode[];
  currentFileId: string | null;
  unsavedChanges: boolean;
}

const props = defineProps<Props>();

defineEmits<{
  select: [fileId: string];
}>();

const fileItemClasses = (fileId: string) => {
  return [
    'flex',
    'items-center',
    'px-3',
    'py-2',
    'rounded-lg',
    'cursor-pointer',
    'transition-colors',
    'text-sm',
    props.currentFileId === fileId
      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
  ].join(' ');
};

function getFileIcon(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  const iconMap: Record<string, string> = {
    js: '📜',
    ts: '📘',
    jsx: '⚛️',
    tsx: '⚛️',
    vue: '💚',
    html: '🌐',
    css: '🎨',
    scss: '🎨',
    json: '📋',
    md: '📝',
    py: '🐍',
    java: '☕',
    go: '🐹',
    rs: '🦀',
  };
  return iconMap[ext || ''] || '📄';
}
</script>