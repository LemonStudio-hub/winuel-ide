<template>
  <div class="h-full flex flex-col bg-white">
    <div class="flex items-center justify-between px-6 py-3 border-b border-gray-100">
      <div class="flex items-center gap-3">
        <span class="text-sm font-medium text-gray-900">
          {{ fileName }}
        </span>
        <span
          v-if="language"
          class="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded"
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
    <div class="flex-1 overflow-auto p-6">
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