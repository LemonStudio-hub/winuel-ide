<template>
  <div class="h-screen flex flex-col bg-white overflow-hidden">
    <header class="bg-white border-b border-gray-100 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
      <div class="flex items-center gap-3 sm:gap-4 min-w-0">
        <h1 class="text-lg sm:text-xl font-semibold tracking-tight text-gray-900 truncate">Winuel</h1>
        <span class="text-xs px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 text-gray-600 rounded-full font-medium whitespace-nowrap">
          编辑器
        </span>
      </div>
      <nav class="flex items-center gap-1 flex-shrink-0">
        <Button variant="ghost" size="sm" @click="router.push('/')">
          对话
        </Button>
      </nav>
    </header>

    <div class="flex-1 flex overflow-hidden w-full">
      <aside class="w-64 flex-shrink-0 hidden md:block border-r border-gray-100">
        <FileTree
          :files="files"
          :current-file-id="currentFileId"
          :unsaved-changes="unsavedChanges"
          @select="handleSelectFile"
        />
      </aside>

      <main class="flex-1 flex flex-col w-full overflow-hidden">
        <div v-if="currentFile" class="flex-1 w-full overflow-hidden">
          <CodeEditor
            v-model="currentFileContent"
            :file-name="currentFile.name"
            :language="currentFile.language"
            @save="handleSave"
          />
        </div>
        <div v-else class="flex-1 flex items-center justify-center bg-gray-50 w-full overflow-hidden">
          <div class="text-center px-4 w-full max-w-full">
            <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <p class="text-gray-500">没有打开的文件</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useEditorStore } from '@/stores/editor';
import { useEditor } from '@/composables/useEditor';
import Button from '@/components/ui/Button.vue';
import FileTree from '@/components/editor/FileTree.vue';
import CodeEditor from '@/components/editor/CodeEditor.vue';

const router = useRouter();
const editorStore = useEditorStore();
const { saveCurrentFile } = useEditor();

const files = computed(() => editorStore.files);
const currentFileId = computed(() => editorStore.currentFileId);
const currentFile = computed(() => editorStore.currentFile);
const unsavedChanges = computed(() => editorStore.unsavedChanges);

const currentFileContent = ref('');

watch(currentFile, (file) => {
  if (file) {
    currentFileContent.value = file.content || '';
  }
}, { immediate: true });

function handleSelectFile(fileId: string) {
  editorStore.setCurrentFile(fileId);
}

function handleSave() {
  if (currentFileId.value) {
    saveCurrentFile(currentFileContent.value);
  }
}
</script>

<style scoped>
/* 移动端编辑器样式调整 */
@media (max-width: 640px) {
  :deep(.code-editor textarea) {
    font-size: 12px;
    line-height: 1.5;
  }

  :deep(.code-editor .header) {
    padding: 0.75rem;
  }

  :deep(.code-editor .filename) {
    font-size: 0.875rem;
  }
}

/* 确保所有元素不会超出边界 */
* {
  max-width: 100%;
  box-sizing: border-box;
}
</style>