<template>
  <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-6 z-50">
    <div class="max-w-4xl mx-auto">
      <div class="flex gap-3 items-end">
        <div class="flex-1 relative">
          <Textarea
            v-model="inputValue"
            placeholder="输入你的问题..."
            :rows="1"
            class="flex-1 resize-none pr-12"
            @keydown.enter.exact.prevent="handleSend"
            @keydown.enter.shift.exact.prevent
          />
          <div class="absolute right-3 bottom-2.5 text-xs text-gray-400 pointer-events-none">
            Enter 发送
          </div>
        </div>
        <Button
          :variant="isStreaming ? 'danger' : 'primary'"
          :disabled="!inputValue.trim() && !isStreaming"
          size="md"
          @click="handleSend"
        >
          <svg v-if="!isStreaming" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
          </svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"/>
          </svg>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
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
</script>