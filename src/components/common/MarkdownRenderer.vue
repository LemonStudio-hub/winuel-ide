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
  margin: 1rem 0;
}

.markdown :deep(code) {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  background-color: rgb(243 244 246);
  color: rgb(17 24 39);
}

.markdown :deep(pre code) {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  display: block;
  background-color: transparent;
}

.markdown :deep(h1),
.markdown :deep(h2),
.markdown :deep(h3) {
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: rgb(17 24 39);
}

.markdown :deep(h1) {
  font-size: 1.5rem;
  line-height: 2rem;
}

.markdown :deep(h2) {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.markdown :deep(h3) {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.markdown :deep(p) {
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  line-height: 1.75;
  color: rgb(55 65 81);
}

.markdown :deep(ul),
.markdown :deep(ol) {
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  margin-left: 1.5rem;
}

.markdown :deep(li) {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  color: rgb(55 65 81);
}

.markdown :deep(a) {
  color: rgb(17 24 39);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.markdown :deep(a):hover {
  text-decoration-thickness: 2px;
}

.markdown :deep(blockquote) {
  border-left-width: 3px;
  border-left-color: rgb(209 213 219);
  padding-left: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: rgb(107 114 128);
  font-style: normal;
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
  border-color: rgb(229 231 235);
  border-style: solid;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  text-align: left;
}

.markdown :deep(th) {
  background-color: rgb(249 250 251);
  font-weight: 600;
  color: rgb(17 24 39);
}

.markdown :deep(td) {
  color: rgb(55 65 81);
}

.markdown :deep(strong) {
  font-weight: 600;
  color: rgb(17 24 39);
}

.markdown :deep(em) {
  font-style: italic;
}
</style>