export interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface DeepSeekConfig {
  messages: DeepSeekMessage[];
  model: string;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
  frequency_penalty?: number;
  presence_penalty?: number;
  stop?: string | string[];
}

export class DeepSeekError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DeepSeekError';
  }
} 