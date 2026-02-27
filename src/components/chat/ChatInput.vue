<template>
  <div class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 z-50">
    <div class="max-w-4xl mx-auto">
      <div class="flex gap-2">
        <Textarea
          v-model="inputValue"
          placeholder="输入你的问题或代码需求..."
          :rows="1"
          class="flex-1 resize-none"
          @keydown.enter.exact.prevent="handleSend"
          @keydown.enter.shift.exact.prevent
        />
        <Button
          :variant="isStreaming ? 'danger' : 'primary'"
          :disabled="!inputValue.trim() && !isStreaming"
          @click="handleSend"
        >
          {{ isStreaming ? '停止' : '发送' }}
        </Button>
      </div>
      <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Enter 发送，Shift + Enter 换行
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Textarea from '@/components/ui/Textarea.vue';
import Button from '@/components/ui/Button.vue';

interface Props {
  isStreaming: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  send: [message: string];
  stop: [];
}>();

const inputValue = ref('');

function handleSend() {
  if (props.isStreaming) {
    emit('stop');
  } else if (inputValue.value.trim()) {
    emit('send', inputValue.value);
    inputValue.value = '';
  }
}

watch(() => props.isStreaming, (newVal) => {
  if (!newVal) {
    // 流式传输结束，可以做一些清理工作
  }
});
</script>