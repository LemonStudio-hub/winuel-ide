<template>
  <div class="relative">
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="inputClasses"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    />
    <slot name="suffix" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue?: string | number;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  size?: 'sm' | 'md' | 'lg';
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  error: false,
  size: 'md',
});

defineEmits<{
  'update:modelValue': [value: string];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

const inputClasses = computed(() => {
  const base = [
    'w-full',
    'border',
    'rounded-lg',
    'transition-all',
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
  ];

  const colorClasses = props.error
    ? ['border-red-500', 'focus:ring-red-500', 'dark:border-red-400']
    : ['border-gray-300', 'focus:ring-primary-500', 'focus:border-primary-500', 'dark:border-gray-600', 'dark:focus:border-primary-500'];

  const sizeClasses = {
    sm: ['px-3', 'py-1.5', 'text-sm'],
    md: ['px-4', 'py-2', 'text-base'],
    lg: ['px-6', 'py-3', 'text-lg'],
  };

  return [
    ...base,
    ...colorClasses,
    ...sizeClasses[props.size],
    props.disabled
      ? 'bg-gray-100 cursor-not-allowed dark:bg-gray-800'
      : 'bg-white dark:bg-gray-900',
  ].filter(Boolean).join(' ');
});
</script>