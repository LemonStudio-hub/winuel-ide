const API_URL = import.meta.env.VITE_API_URL || 'https://your-worker.workers.dev';

export interface ChatRequest {
  message: string;
  sessionId?: string;
}

export interface ChatResponse {
  type: 'content' | 'done' | 'error';
  content?: string;
  message?: string;
}

export class AIService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_URL;
  }

  async chat(request: ChatRequest): Promise<Response> {
    const url = new URL('/chat', this.baseUrl);
    url.searchParams.append('message', request.message);
    if (request.sessionId) {
      url.searchParams.append('sessionId', request.sessionId);
    }

    return fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'text/event-stream',
        'Cache-Control': 'no-cache',
      },
    });
  }
}

export const aiService = new AIService();