import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { FileNode } from '@/types';

export const useEditorStore = defineStore('editor', () => {
  const files = ref<FileNode[]>([
    {
      id: 'main',
      name: 'main.js',
      type: 'file',
      content: '// 开始编写你的代码\n\nfunction hello() {\n  console.log("Hello, Winuel IDE!");\n}\n\nhello();',
      language: 'javascript',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ]);

  const currentFileId = ref<string | null>(files.value[0]?.id || null);
  const unsavedChanges = ref(false);

  const currentFile = computed(() => {
    return files.value.find(f => f.id === currentFileId.value);
  });

  function createFile(name: string, content: string = '', language: string = 'text') {
    const file: FileNode = {
      id: `file-${Date.now()}`,
      name,
      type: 'file',
      content,
      language,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    files.value.push(file);
    return file;
  }

  function updateFileContent(fileId: string, content: string) {
    const file = files.value.find(f => f.id === fileId);
    if (file) {
      file.content = content;
      file.updatedAt = Date.now();
      unsavedChanges.value = true;
    }
  }

  function deleteFile(fileId: string) {
    const index = files.value.findIndex(f => f.id === fileId);
    if (index > -1) {
      files.value.splice(index, 1);
      if (currentFileId.value === fileId) {
        currentFileId.value = files.value[0]?.id || null;
      }
    }
  }

  function renameFile(fileId: string, newName: string) {
    const file = files.value.find(f => f.id === fileId);
    if (file) {
      file.name = newName;
      file.updatedAt = Date.now();
    }
  }

  function setCurrentFile(fileId: string) {
    currentFileId.value = fileId;
  }

  function saveChanges() {
    unsavedChanges.value = false;
  }

  return {
    files,
    currentFileId,
    currentFile,
    unsavedChanges,
    createFile,
    updateFileContent,
    deleteFile,
    renameFile,
    setCurrentFile,
    saveChanges,
  };
});