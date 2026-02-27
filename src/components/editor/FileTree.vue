<template>
  <div class="h-full flex flex-col">
    <div class="px-4 py-3 border-b border-gray-100">
      <h3 class="font-medium text-gray-900 text-sm">文件</h3>
    </div>
    <div class="flex-1 overflow-y-auto p-2">
      <div
        v-for="file in files"
        :key="file.id"
        :class="fileItemClasses(file.id)"
        @click="$emit('select', file.id)"
      >
        <span class="mr-2">{{ getFileIcon(file.name) }}</span>
        <span class="flex-1 truncate text-sm">{{ file.name }}</span>
        <span
          v-if="file.id === currentFileId && unsavedChanges"
          class="text-gray-400 ml-2"
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
    'duration-150',
    props.currentFileId === fileId
      ? 'bg-gray-100 text-gray-900'
      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
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