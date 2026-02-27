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
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
    'resize-none',
  ];

  const colorClasses = props.error
    ? ['border-red-500', 'focus:ring-red-500', 'dark:border-red-400']
    : ['border-gray-300', 'focus:ring-primary-500', 'focus:border-primary-500', 'dark:border-gray-600', 'dark:focus:border-primary-500'];

  return [
    ...base,
    ...colorClasses,
    props.disabled
      ? 'bg-gray-100 cursor-not-allowed dark:bg-gray-800'
      : 'bg-white dark:bg-gray-900',
  ].filter(Boolean).join(' ');
});
</script>