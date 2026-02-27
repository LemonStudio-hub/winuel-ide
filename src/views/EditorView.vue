<template>
  <div class="h-screen flex flex-col bg-white">
    <header class="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <h1 class="text-xl font-semibold tracking-tight text-gray-900">Winuel</h1>
        <span class="text-xs px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full font-medium">
          编辑器
        </span>
      </div>
      <nav class="flex items-center gap-1">
        <Button variant="ghost" size="sm" @click="router.push('/')">
          对话
        </Button>
      </nav>
    </header>

    <div class="flex-1 flex overflow-hidden">
      <aside class="w-64 flex-shrink-0 hidden md:block border-r border-gray-100">
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
        <div v-else class="flex-1 flex items-center justify-center bg-gray-50">
          <div class="text-center">
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