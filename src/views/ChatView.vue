<template>
  <div class="h-screen flex flex-col bg-white">
    <header class="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
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

    <main class="flex-1 overflow-y-auto pb-32">
      <div v-if="currentMessages.length === 0" class="flex flex-col items-center justify-center h-full px-6">
        <div class="w-20 h-20 mb-6 rounded-full bg-gray-50 flex items-center justify-center">
          <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
          </svg>
        </div>
        <h2 class="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">
          开始新的对话
        </h2>
        <p class="text-gray-500 text-center max-w-md leading-relaxed">
          问我任何关于编程的问题，我会帮你编写代码、解释概念、解决问题
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