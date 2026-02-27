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
    'duration-150',
    'focus:outline-none',
    'focus:ring-2',
  ];

  const colorClasses = props.error
    ? ['border-red-500', 'focus:ring-red-500']
    : ['border-gray-200', 'focus:ring-gray-900', 'focus:border-gray-900'];

  const sizeClasses = {
    sm: ['px-3', 'py-1.5', 'text-sm'],
    md: ['px-4', 'py-2', 'text-sm'],
    lg: ['px-6', 'py-3', 'text-base'],
  };

  return [
    ...base,
    ...colorClasses,
    ...sizeClasses[props.size],
    props.disabled
      ? 'bg-gray-50 cursor-not-allowed'
      : 'bg-white placeholder:text-gray-400',
  ].filter(Boolean).join(' ');
});
</script>