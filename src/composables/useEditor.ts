import { useEditorStore } from '@/stores/editor';

export function useEditor() {
  const editorStore = useEditorStore();

  function saveCurrentFile(content: string) {
    if (editorStore.currentFileId) {
      editorStore.updateFileContent(editorStore.currentFileId, content);
      editorStore.saveChanges();
    }
  }

  function detectLanguage(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase();
    const languageMap: Record<string, string> = {
      js: 'javascript',
      ts: 'typescript',
      jsx: 'javascript',
      tsx: 'typescript',
      vue: 'vue',
      html: 'html',
      css: 'css',
      scss: 'scss',
      json: 'json',
      md: 'markdown',
      py: 'python',
      java: 'java',
      cpp: 'cpp',
      c: 'c',
      go: 'go',
      rs: 'rust',
      php: 'php',
      rb: 'ruby',
      sql: 'sql',
      sh: 'bash',
      yaml: 'yaml',
      yml: 'yaml',
      xml: 'xml',
      txt: 'text',
    };
    return languageMap[ext || ''] || 'text';
  }

  return {
    saveCurrentFile,
    detectLanguage,
  };
}