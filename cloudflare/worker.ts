export interface Env {
  AI_API_KEY?: string;
  AI_API_URL?: string;
}

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
        // 这里集成实际的AI API调用
        // 示例：模拟流式响应
        const response = await simulateAIResponse(message);

        for (const chunk of response) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'content', content: chunk })}\n\n`));
          await new Promise(resolve => setTimeout(resolve, 50));
        }

        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`));
        controller.close();
      } catch (error) {
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: 'error', message: '处理失败' })}\n\n`
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

async function simulateAIResponse(message: string): Promise<string[]> {
  const responses = [
    `我理解你想了解关于 "${message}" 的内容。`,
    '这是一个很好的问题！让我为你详细解答。',
    '以下是我的分析：\n\n1. 首先，我们需要理解问题的核心\n2. 然后，我们可以考虑不同的解决方案\n3. 最后，选择最适合的方案',
    '\n```javascript\n// 示例代码\nfunction solve() {\n  console.log("Solution implemented");\n}\n```\n',
    '希望这个回答对你有帮助！如果还有其他问题，请随时问我。',
  ];

  return responses;
}