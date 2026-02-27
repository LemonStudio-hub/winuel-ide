<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="animate-spin mr-2">⟳</span>
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  full?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  full: false,
});

defineEmits<{
  click: [event: MouseEvent];
}>();

const buttonClasses = computed(() => {
  const base = [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'rounded-lg',
    'transition-all',
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
  ];

  const variantClasses = {
    primary: [
      'bg-primary-600',
      'text-white',
      'hover:bg-primary-700',
      'active:bg-primary-800',
      'focus:ring-primary-500',
      'disabled:bg-primary-400',
    ],
    secondary: [
      'bg-gray-200',
      'text-gray-900',
      'dark:bg-gray-700',
      'dark:text-white',
      'hover:bg-gray-300',
      'dark:hover:bg-gray-600',
      'focus:ring-gray-500',
    ],
    ghost: [
      'bg-transparent',
      'text-gray-700',
      'dark:text-gray-300',
      'hover:bg-gray-100',
      'dark:hover:bg-gray-800',
      'focus:ring-gray-500',
    ],
    danger: [
      'bg-red-600',
      'text-white',
      'hover:bg-red-700',
      'active:bg-red-800',
      'focus:ring-red-500',
      'disabled:bg-red-400',
    ],
  };

  const sizeClasses = {
    sm: ['px-3', 'py-1.5', 'text-sm'],
    md: ['px-4', 'py-2', 'text-base'],
    lg: ['px-6', 'py-3', 'text-lg'],
  };

  return [
    ...base,
    ...variantClasses[props.variant],
    ...sizeClasses[props.size],
    props.full ? 'w-full' : '',
    props.disabled || props.loading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
  ].filter(Boolean).join(' ');
});
</script>