# LiaoKit 测试项目

这是一个独立的 LiaoKit 测试项目，用于测试和演示 LiaoKit 组件库的功能。

## 安装

```bash
npm install
```

## 使用 LiaoKit

### 完整引入

```javascript
import { createApp } from 'vue'
import LiaoKit from '@yuandezuohua/liaokit'
import '@yuandezuohua/liaokit/dist/liaokit.css'

const app = createApp(App)
app.use(LiaoKit)
app.mount('#app')
```

### 按需引入

```vue
<template>
  <LiaoWindow title="AI 助手">
    <LiaoMessageList 
      :messages="messages"
      :use-ai-adapter="true"
    />
    <LiaoInputArea v-model="input" @send="handleSend" />
  </LiaoWindow>
</template>

<script setup>
import { 
  LiaoWindow, 
  LiaoMessageList, 
  LiaoInputArea 
} from '@yuandezuohua/liaokit'
import '@yuandezuohua/liaokit/dist/liaokit.css'

// 你的业务逻辑
</script>
```

## 核心组件

- **LiaoMessageList** - 消息列表核心，支持多种消息类型和 AI 适配
- **LiaoInputArea** - 智能输入区域，集成文件上传和表情
- **LiaoWindow** - 窗口基础容器

## 更多信息

访问 [LiaoKit 文档](https://github.com/html1602/LiaoKit) 了解更多详情。