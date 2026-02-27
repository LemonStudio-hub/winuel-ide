<template>
  <div class="h-screen flex flex-col bg-white overflow-hidden">
    <header class="flex-shrink-0 bg-white border-b border-gray-100 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
      <div class="flex items-center gap-3 sm:gap-4 min-w-0">
        <h1 class="text-lg sm:text-xl font-semibold tracking-tight text-gray-900 truncate">Winuel</h1>
        <span class="text-xs px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 text-gray-600 rounded-full font-medium whitespace-nowrap">
          对话
        </span>
      </div>
      <nav class="flex items-center gap-1 flex-shrink-0">
        <Button variant="ghost" size="sm" @click="router.push('/editor')">
          编辑器
        </Button>
      </nav>
    </header>

    <main class="flex-1 overflow-hidden w-full">
      <LiaoWindow 
        title="AI 对话" 
        class="h-full w-full"
        :show-header="false"
      >
        <LiaoMessageList
          :messages="formattedMessages"
          :use-ai-adapter="false"
          :is-streaming="isStreaming"
          class="h-full w-full"
        />
        <LiaoInputArea
          v-model="inputValue"
          placeholder="输入你的问题..."
          :disabled="isStreaming"
          @send="handleSend"
        />
      </LiaoWindow>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useChatStore } from '@/stores/chat';
import { useChat } from '@/composables/useChat';
import Button from '@/components/ui/Button.vue';

const router = useRouter();
const chatStore = useChatStore();
const { sendMessage } = useChat();

const inputValue = ref('');

const currentMessages = computed(() => chatStore.currentMessages);
const isStreaming = computed(() => chatStore.isStreaming);

// 转换消息格式为 LiaoKit 格式
const formattedMessages = computed(() => {
  return currentMessages.value.map(msg => ({
    id: msg.id,
    role: msg.role === 'user' ? 'user' : 'assistant',
    content: msg.content,
    timestamp: msg.timestamp,
  }));
});

function handleSend() {
  if (inputValue.value.trim() && !isStreaming.value) {
    sendMessage(inputValue.value);
    inputValue.value = '';
  }
}
</script>

<style scoped>
/* 移动端适配样式 */
:deep(.liao-window) {
  height: 100%;
  width: 100%;
  border-radius: 0;
  overflow: hidden;
}

:deep(.liao-message-list) {
  padding: 0;
  max-height: calc(100vh - 140px);
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
}

/* 调整输入框区域 */
:deep(.liao-input-area) {
  padding: 0.75rem 1rem;
  width: 100%;
  max-width: 100%;
}

/* 消息气泡容器 */
:deep(.liao-message-list) > :deep(.liao-message-bubble) {
  max-width: 100%;
  padding: 0 0.75rem;
  box-sizing: border-box;
}

@media (min-width: 640px) {
  :deep(.liao-message-list) > :deep(.liao-message-bubble) {
    max-width: 90%;
    padding: 0 1rem;
  }
}

/* 消息内容容器 */
:deep(.liao-message-bubble-content) {
  max-width: 100%;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
}

/* 移动端字体调整 */
@media (max-width: 640px) {
  :deep(.liao-message-bubble) {
    font-size: 0.875rem;
  }

  :deep(.liao-message-bubble pre) {
    font-size: 0.8rem;
    padding: 0.5rem;
  }

  :deep(.liao-message-bubble code) {
    font-size: 0.8rem;
  }

  :deep(.liao-input-area) {
    padding: 0.5rem 0.75rem;
  }
}

/* 确保代码块在移动端可以横向滚动 */
:deep(.liao-message-bubble pre) {
  overflow-x: auto;
  max-width: 100%;
  white-space: pre;
  word-wrap: normal;
}

/* 确保内联代码不换行 */
:deep(.liao-message-bubble p > code),
:deep(.liao-message-bubble li > code) {
  white-space: nowrap;
  overflow-x: auto;
  max-width: 100%;
  display: inline-block;
}

/* 确保表格不会超出边界 */
:deep(.liao-message-bubble table) {
  max-width: 100%;
  overflow-x: auto;
  display: block;
}

/* 确保长单词换行 */
:deep(.liao-message-bubble) {
  word-break: break-word;
  overflow-wrap: break-word;
}

/* 调整消息间距 */
:deep(.liao-message-list) > :deep(.liao-message-bubble) {
  margin-bottom: 0.5rem;
}

@media (min-width: 640px) {
  :deep(.liao-message-list) > :deep(.liao-message-bubble) {
    margin-bottom: 1rem;
  }
}

/* 确保输入框不会超出边界 */
:deep(.liao-input-area input),
:deep(.liao-input-area textarea) {
  max-width: 100%;
  box-sizing: border-box;
}

/* 防止任何元素溢出 */
* {
  max-width: 100%;
}
</style>