export interface Env {
  AI_API_KEY?: string;
  AI_API_URL?: string;
}

const SYSTEM_PROMPT = `你是一位经验丰富的全栈开发工程师，精通前端（Vue3、React、TypeScript、Vite）、后端（Node.js、Python、Go）、数据库和各种现代开发技术栈。

你的职责：
1. 理解用户的需求，提供专业的技术建议
2. 根据需求生成高质量、可运行的代码
3. 代码必须完整、可直接使用
4. 使用代码块包裹所有代码，并标注语言类型
5. 在代码前说明文件名和路径
6. 提供必要的代码注释和说明

代码输出格式：
\`\`\`[语言]
// 文件名: [文件路径]
[代码内容]
\`\`\`

当用户要求生成代码时，请：
1. 先分析需求，确认技术栈
2. 生成完整可用的代码
3. 在代码块前明确标注文件名
4. 提供必要的实现说明

始终保持专业、准确、实用的回答风格。`;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/chat' && request.method === 'GET') {
      return handleChat(request, env);
    }

    return new Response('Not Found', { status: 404 });
  },
};

async function handleChat(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const message = url.searchParams.get('message');
  const sessionId = url.searchParams.get('sessionId');

  if (!message) {
    return new Response(JSON.stringify({ type: 'error', message: '缺少message参数' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const apiKey = env.AI_API_KEY || '';
        const apiUrl = env.AI_API_URL || 'https://api.deepseek.com/v1/chat/completions';

        if (!apiKey) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: 'error', message: '未配置AI_API_KEY，请在Cloudflare Workers环境变量中设置' })}\n\n`
            )
          );
          controller.close();
          return;
        }

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              { role: 'user', content: message }
            ],
            stream: true,
            temperature: 0.7,
            max_tokens: 4000,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API请求失败: ${response.status} ${errorText}`);
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          throw new Error('无法获取响应流');
        }

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;

                if (content) {
                  controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify({ type: 'content', content })}\n\n`)
                  );
                }
              } catch (e) {
                // 忽略解析错误
              }
            }
          }
        }

        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`));
        controller.close();
      } catch (error) {
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: 'error', message: error instanceof Error ? error.message : '处理失败' })}\n\n`
          )
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}