<template>
  <div :class="messageClasses">
    <div class="flex items-start gap-3 max-w-4xl mx-auto">
      <div :class="avatarClasses">
        {{ role === 'user' ? '👤' : '🤖' }}
      </div>
      <div class="flex-1 min-w-0">
        <div class="font-semibold text-sm mb-1">
          {{ role === 'user' ? '你' : 'AI助手' }}
        </div>
        <div v-if="role === 'user'" class="text-gray-800 dark:text-gray-200 break-words">
          {{ content }}
        </div>
        <MarkdownRenderer v-else :content="content" />
        <div v-if="isStreaming" class="flex items-center gap-1 mt-2 text-gray-500 dark:text-gray-400">
          <span class="animate-bounce">●</span>
          <span class="animate-bounce delay-100">●</span>
          <span class="animate-bounce delay-200">●</span>
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
    ? 'bg-gray-100 dark:bg-gray-800 p-4'
    : 'bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-800';
});

const avatarClasses = computed(() => {
  return [
    'flex-shrink-0',
    'w-8',
    'h-8',
    'rounded-full',
    'flex',
    'items-center',
    'justify-center',
    'text-lg',
    props.role === 'user'
      ? 'bg-primary-600 text-white'
      : 'bg-green-600 text-white',
  ];
});
</script>

<style scoped>
.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}
</style>