<template>
  <div :class="messageClasses">
    <div class="flex items-start gap-4 max-w-4xl mx-auto py-6 px-6">
      <div :class="avatarClasses">
        <svg v-if="role === 'user'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      </div>
      <div class="flex-1 min-w-0">
        <div class="text-sm font-medium mb-2 text-gray-500">
          {{ role === 'user' ? '你' : 'Winuel' }}
        </div>
        <div v-if="role === 'user'" class="text-gray-900 leading-relaxed break-words">
          {{ content }}
        </div>
        <MarkdownRenderer v-else :content="content" />
        <div v-if="isStreaming" class="flex items-center gap-1.5 mt-3 text-gray-400">
          <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
          <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
          <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import MarkdownRenderer from '@/components/common/MarkdownRenderer.vue';

interface Props {
  role: 'user' | 'assistant' | 'system';
  content: string;
  isStreaming?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isStreaming: false,
});

const messageClasses = computed(() => {
  return props.role === 'user'
    ? 'bg-gray-50'
    : 'bg-white';
});

const avatarClasses = computed(() => {
  return [
    'flex-shrink-0',
    'w-9',
    'h-9',
    'rounded-full',
    'flex',
    'items-center',
    'justify-center',
    props.role === 'user'
      ? 'bg-gray-900 text-white'
      : 'bg-gray-100 text-gray-900',
  ];
});
</script>

<style scoped>
.delay-100 {
  animation-delay: 0.15s;
}

.delay-200 {
  animation-delay: 0.3s;
}
</style>