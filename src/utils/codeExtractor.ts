import type { CodeBlock } from '@/types';

/**
 * 从 Markdown 内容中提取代码块
 */
export function extractCodeBlocks(content: string): CodeBlock[] {
  const codeBlocks: CodeBlock[] = [];
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    const language = match[1] || 'text';
    let code = match[2] || '';
    let filename: string | undefined;

    // 检查代码块的第一行是否包含文件名注释
    const firstLine = code.split('\n')[0];
    if (firstLine) {
      const filenameMatch = firstLine.match(/\/\/\s*文件名:\s*(.+)|#\s*文件名:\s*(.+)|<!--\s*文件名:\s*(.+)-->/);

      if (filenameMatch) {
        filename = filenameMatch[1] || filenameMatch[2] || filenameMatch[3];
        // 移除文件名注释行
        code = code.split('\n').slice(1).join('\n');
      }
    }

    // 如果没有文件名，根据语言生成默认文件名
    if (!filename) {
      filename = getDefaultFilename(language);
    }

    codeBlocks.push({
      language,
      filename,
      code: code.trim(),
    });
  }

  return codeBlocks;
}

/**
 * 根据语言生成默认文件名
 */
function getDefaultFilename(language: string): string {
  const extensions: Record<string, string> = {
    javascript: 'index.js',
    js: 'index.js',
    typescript: 'index.ts',
    ts: 'index.ts',
    vue: 'App.vue',
    html: 'index.html',
    css: 'style.css',
    scss: 'style.scss',
    json: 'package.json',
    python: 'main.py',
    py: 'main.py',
    java: 'Main.java',
    go: 'main.go',
    rs: 'main.rs',
    php: 'index.php',
    rb: 'index.rb',
    sql: 'schema.sql',
    sh: 'script.sh',
    bash: 'script.sh',
    yaml: 'config.yaml',
    yml: 'config.yml',
    xml: 'config.xml',
    md: 'README.md',
  };

  return extensions[language.toLowerCase()] || `file.${language}`;
}

/**
 * 解析文件名，返回文件名和扩展名
 */
export function parseFilename(filename: string): { name: string; ext: string } {
  const parts = filename.split('/');
  const name = parts[parts.length - 1] || '';
  const extParts = name.split('.');
  const ext = extParts.length > 1 ? extParts[extParts.length - 1]! : '';

  return {
    name,
    ext,
  };
}