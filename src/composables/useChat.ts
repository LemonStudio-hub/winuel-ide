import { ref } from 'vue';
import { useChatStore } from '@/stores/chat';

export function useChat() {
  const chatStore = useChatStore();
  const eventSource = ref<EventSource | null>(null);

  function sendMessage(content: string) {
    chatStore.addMessage({
      role: 'user',
      content,
    });

    chatStore.isStreaming = true;

    chatStore.addMessage({
      role: 'assistant',
      content: '',
      isStreaming: true,
    });

    connectToAI(content);
  }

  function connectToAI(userMessage: string) {
    const url = `${import.meta.env.VITE_API_URL || 'http://localhost:8787'}/chat?message=${encodeURIComponent(userMessage)}`;

    eventSource.value = new EventSource(url);

    if (eventSource.value) {
      eventSource.value.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        if (data.type === 'content') {
          chatStore.updateLastAssistantMessage(
            (chatStore.currentMessages[chatStore.currentMessages.length - 1]?.content || '') + data.content
          );
        } else if (data.type === 'done') {
          chatStore.isStreaming = false;
          eventSource.value?.close();
        } else if (data.type === 'error') {
          chatStore.updateLastAssistantMessage('发生错误: ' + data.message);
          chatStore.isStreaming = false;
          eventSource.value?.close();
        }
      };

      eventSource.value.onerror = () => {
        chatStore.updateLastAssistantMessage('连接失败，请检查网络后重试');
        chatStore.isStreaming = false;
        eventSource.value?.close();
      };
    }
  }

  function stopStreaming() {
    if (eventSource.value) {
      eventSource.value.close();
      eventSource.value = null;
    }
    chatStore.isStreaming = false;
  }

  return {
    sendMessage,
    stopStreaming,
  };
}