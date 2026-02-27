<template>
  <div class="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
    <div class="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center gap-2">
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
          {{ fileName }}
        </span>
        <span
          v-if="language"
          class="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-400"
        >
          {{ language }}
        </span>
      </div>
      <div class="flex items-center gap-2">
        <Button variant="ghost" size="sm" @click="$emit('save')">
          保存
        </Button>
      </div>
    </div>
    <div class="flex-1 overflow-auto p-4">
      <Textarea
        :model-value="modelValue"
        class="w-full h-full font-mono text-sm"
        @update:model-value="$emit('update:modelValue', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Textarea from '@/components/ui/Textarea.vue';
import Button from '@/components/ui/Button.vue';

interface Props {
  modelValue: string;
  fileName?: string;
  language?: string;
}

defineProps<Props>();

defineEmits<{
  'update:modelValue': [value: string];
  save: [];
}>();
</script>