<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
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
    'duration-150',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
  ];

  const variantClasses = {
    primary: [
      'bg-gray-900',
      'text-white',
      'hover:bg-gray-800',
      'active:bg-gray-700',
      'focus:ring-gray-900',
      'disabled:bg-gray-300',
    ],
    secondary: [
      'bg-gray-100',
      'text-gray-900',
      'hover:bg-gray-200',
      'focus:ring-gray-300',
    ],
    ghost: [
      'bg-transparent',
      'text-gray-600',
      'hover:bg-gray-100',
      'hover:text-gray-900',
      'focus:ring-gray-200',
    ],
    danger: [
      'bg-gray-900',
      'text-white',
      'hover:bg-gray-700',
      'active:bg-gray-600',
      'focus:ring-gray-900',
      'disabled:bg-gray-300',
    ],
  };

  const sizeClasses = {
    sm: ['px-3', 'py-1.5', 'text-sm'],
    md: ['px-4', 'py-2', 'text-sm'],
    lg: ['px-6', 'py-3', 'text-base'],
  };

  return [
    ...base,
    ...variantClasses[props.variant],
    ...sizeClasses[props.size],
    props.full ? 'w-full' : '',
    props.disabled || props.loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
  ].filter(Boolean).join(' ');
});
</script>