<template>
  <div class="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
    <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <h1 class="text-xl font-bold text-gray-900 dark:text-white">Winuel IDE</h1>
        <span class="text-xs px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full">
          代码编辑器
        </span>
      </div>
      <nav class="flex items-center gap-2">
        <Button variant="ghost" size="sm" @click="router.push('/')">
          AI对话
        </Button>
      </nav>
    </header>

    <div class="flex-1 flex overflow-hidden">
      <aside class="w-64 flex-shrink-0 hidden md:block">
        <FileTree
          :files="files"
          :current-file-id="currentFileId"
          :unsaved-changes="unsavedChanges"
          @select="handleSelectFile"
        />
      </aside>

      <main class="flex-1 flex flex-col">
        <div v-if="currentFile" class="flex-1">
          <CodeEditor
            v-model="currentFileContent"
            :file-name="currentFile.name"
            :language="currentFile.language"
            @save="handleSave"
          />
        </div>
        <div v-else class="flex-1 flex items-center justify-center">
          <div class="text-center text-gray-500 dark:text-gray-400">
            <div class="text-4xl mb-2">📁</div>
            <p>没有打开的文件</p>
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