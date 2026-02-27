<template>
  <div class="h-screen flex flex-col bg-white overflow-hidden">
    <header class="flex-shrink-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <h1 class="text-xl font-semibold tracking-tight text-gray-900">Winuel</h1>
        <span class="text-xs px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full font-medium">
          对话
        </span>
      </div>
      <nav class="flex items-center gap-1">
        <Button variant="ghost" size="sm" @click="router.push('/editor')">
          编辑器
        </Button>
      </nav>
    </header>

    <main class="flex-1 overflow-hidden">
      <LiaoWindow title="AI 对话" class="h-full">
        <LiaoMessageList
          :messages="formattedMessages"
          :use-ai-adapter="false"
          :is-streaming="isStreaming"
          class="h-full"
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