<template>
  <div
    class="markdown prose dark:prose-invert max-w-none"
    v-html="renderedContent"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { renderMarkdown } from '@/utils/markdown';

interface Props {
  content: string;
}

const props = defineProps<Props>();

const renderedContent = computed(() => {
  return renderMarkdown(props.content);
});
</script>

<style scoped>
.markdown :deep(pre) {
  border-radius: 0.5rem;
  overflow-x: auto;
}

.markdown :deep(code) {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.markdown :deep(pre code) {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  display: block;
}

.markdown :deep(h1),
.markdown :deep(h2),
.markdown :deep(h3) {
  font-weight: 700;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.markdown :deep(h1) {
  font-size: 1.5rem;
}

.markdown :deep(h2) {
  font-size: 1.25rem;
}

.markdown :deep(h3) {
  font-size: 1.125rem;
}

.markdown :deep(p) {
  margin-top: 1rem;
  margin-bottom: 1rem;
  line-height: 1.625;
}

.markdown :deep(ul),
.markdown :deep(ol) {
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 1.5rem;
}

.markdown :deep(li) {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.markdown :deep(a) {
  color: rgb(79 70 229);
  text-decoration: underline;
}

.markdown :deep(a):hover {
  color: rgb(67 56 202);
}

.dark .markdown :deep(a) {
  color: rgb(129 140 248);
}

.dark .markdown :deep(a):hover {
  color: rgb(165 180 252);
}

.markdown :deep(blockquote) {
  border-left-width: 4px;
  border-left-color: rgb(99 102 241);
  padding-left: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-style: italic;
}

.markdown :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.markdown :deep(th),
.markdown :deep(td) {
  border-width: 1px;
  border-color: rgb(209 213 219);
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.dark .markdown :deep(th),
.dark .markdown :deep(td) {
  border-color: rgb(55 65 81);
}

.markdown :deep(th) {
  background-color: rgb(243 244 246);
  font-weight: 600;
}

.dark .markdown :deep(th) {
  background-color: rgb(31 41 55);
}
</style>