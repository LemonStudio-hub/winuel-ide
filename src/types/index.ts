export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  isStreaming?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'directory';
  content?: string;
  language?: string;
  children?: FileNode[];
  parentId?: string;
  createdAt: number;
  updatedAt: number;
}

export interface EditorState {
  currentFileId: string | null;
  files: FileNode[];
  unsavedChanges: boolean;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  fontSize: number;
  lineNumbers: boolean;
  wordWrap: boolean;
}

export interface CodeBlock {
  language: string;
  filename?: string;
  code: string;
}