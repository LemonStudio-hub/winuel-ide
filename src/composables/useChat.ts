import { ref } from 'vue';
import { useChatStore } from '@/stores/chat';
import { useEditorStore } from '@/stores/editor';
import { extractCodeBlocks } from '@/utils/codeExtractor';
import type { CodeBlock } from '@/types';

export function useChat() {
  const chatStore = useChatStore();
  const editorStore = useEditorStore();
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

          // 流式传输完成后，提取代码块并保存到编辑器
          const lastMessage = chatStore.currentMessages[chatStore.currentMessages.length - 1];
          if (lastMessage && lastMessage.role === 'assistant') {
            saveCodeBlocksToEditor(lastMessage.content);
          }
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

  function saveCodeBlocksToEditor(content: string) {
    const codeBlocks = extractCodeBlocks(content);

    if (codeBlocks.length === 0) {
      return;
    }

    // 保存所有代码块到编辑器
    codeBlocks.forEach((codeBlock: CodeBlock) => {
      const existingFile = editorStore.files.find(
        (f) => f.name === codeBlock.filename
      );

      if (existingFile) {
        // 更新已存在的文件
        editorStore.updateFileContent(existingFile.id, codeBlock.code);
      } else {
        // 创建新文件
        editorStore.createFile(codeBlock.filename || 'untitled', codeBlock.code, codeBlock.language);
      }
    });

    console.log(`已保存 ${codeBlocks.length} 个代码文件到编辑器`);
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