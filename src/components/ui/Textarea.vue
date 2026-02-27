<template>
  <textarea
    :id="id"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :rows="rows"
    :class="textareaClasses"
    @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  rows?: number;
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  error: false,
  rows: 4,
});

defineEmits<{
  'update:modelValue': [value: string];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

const textareaClasses = computed(() => {
  const base = [
    'w-full',
    'border',
    'rounded-lg',
    'transition-all',
    'duration-150',
    'focus:outline-none',
    'focus:ring-2',
    'resize-none',
    'max-w-full',
    'box-border',
  ];

  const colorClasses = props.error
    ? ['border-red-500', 'focus:ring-red-500']
    : ['border-gray-200', 'focus:ring-gray-900', 'focus:border-gray-900'];

  return [
    ...base,
    ...colorClasses,
    props.disabled
      ? 'bg-gray-50 cursor-not-allowed'
      : 'bg-white placeholder:text-gray-400',
  ].filter(Boolean).join(' ');
});
</script>