<template>
  <div class="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
    <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <h1 class="text-xl font-bold text-gray-900 dark:text-white">Winuel IDE</h1>
        <span class="text-xs px-2 py-1 bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300 rounded-full">
          AI对话
        </span>
      </div>
      <nav class="flex items-center gap-2">
        <Button variant="ghost" size="sm" @click="router.push('/editor')">
          编辑器
        </Button>
      </nav>
    </header>

    <main class="flex-1 overflow-y-auto pb-24">
      <div v-if="currentMessages.length === 0" class="flex flex-col items-center justify-center h-full px-4">
        <div class="text-6xl mb-4">🤖</div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          开始对话
        </h2>
        <p class="text-gray-600 dark:text-gray-400 text-center max-w-md">
          向我提问任何编程问题，我会帮你编写代码、解释概念、解决问题
        </p>
      </div>

      <div v-else class="space-y-0">
        <ChatMessage
          v-for="message in currentMessages"
          :key="message.id"
          :role="message.role"
          :content="message.content"
          :is-streaming="message.isStreaming"
        />
      </div>
    </main>

    <ChatInput
      :is-streaming="isStreaming"
      @send="handleSend"
      @stop="handleStop"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useChatStore } from '@/stores/chat';
import { useChat } from '@/composables/useChat';
import Button from '@/components/ui/Button.vue';
import ChatMessage from '@/components/chat/ChatMessage.vue';
import ChatInput from '@/components/chat/ChatInput.vue';

const router = useRouter();
const chatStore = useChatStore();
const { sendMessage, stopStreaming } = useChat();

const currentMessages = computed(() => chatStore.currentMessages);
const isStreaming = computed(() => chatStore.isStreaming);

function handleSend(message: string) {
  sendMessage(message);
}

function handleStop() {
  stopStreaming();
}
</script>