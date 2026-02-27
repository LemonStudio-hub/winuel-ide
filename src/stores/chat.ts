import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Message, ChatSession } from '@/types';

export const useChatStore = defineStore('chat', () => {
  const sessions = ref<ChatSession[]>([]);
  const currentSessionId = ref<string | null>(null);
  const isStreaming = ref(false);

  const currentSession = computed(() => {
    return sessions.value.find(s => s.id === currentSessionId.value);
  });

  const currentMessages = computed(() => {
    return currentSession.value?.messages || [];
  });

  function createSession(title?: string) {
    const session: ChatSession = {
      id: `session-${Date.now()}`,
      title: title || '新对话',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    sessions.value.unshift(session);
    currentSessionId.value = session.id;
    return session;
  }

  function addMessage(message: Omit<Message, 'id' | 'timestamp'>) {
    if (!currentSession.value) {
      createSession();
    }

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      timestamp: Date.now(),
      ...message,
    };

    currentSession.value?.messages.push(newMessage);
    currentSession.value!.updatedAt = Date.now();

    return newMessage;
  }

  function updateLastAssistantMessage(content: string) {
    if (!currentSession.value) return;

    const lastMessage = currentSession.value.messages[currentSession.value.messages.length - 1];
    if (lastMessage && lastMessage.role === 'assistant') {
      lastMessage.content = content;
    }
  }

  function deleteSession(sessionId: string) {
    const index = sessions.value.findIndex(s => s.id === sessionId);
    if (index > -1) {
      sessions.value.splice(index, 1);
      if (currentSessionId.value === sessionId) {
        currentSessionId.value = sessions.value[0]?.id || null;
      }
    }
  }

  function clearCurrentSession() {
    if (currentSession.value) {
      currentSession.value.messages = [];
      currentSession.value.updatedAt = Date.now();
    }
  }

  return {
    sessions,
    currentSessionId,
    currentSession,
    currentMessages,
    isStreaming,
    createSession,
    addMessage,
    updateLastAssistantMessage,
    deleteSession,
    clearCurrentSession,
  };
});