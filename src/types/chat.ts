/**
 * Tipo de remetente da mensagem
 */
export type MessageRole = 'user' | 'assistant';

/**
 * Interface para uma mensagem do chat
 */
export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;  // Pode conter markdown, incluindo imagens ![texto](url)
  timestamp: string;
}

/**
 * Interface para a resposta da API
 */
export interface ApiResponse {
  answer?: string;
  humanizedText?: string;
  error?: string;
} 