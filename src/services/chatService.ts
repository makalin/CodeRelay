interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

class ChatService {
  private apiKey: string;
  private apiEndpoint: string;

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || '';
    this.apiEndpoint = 'https://api.openai.com/v1/chat/completions';
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: message
            }
          ],
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  // Mock response for development/testing
  async sendMockMessage(message: string): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`This is a mock response to: "${message}"`);
      }, 1000);
    });
  }
}

export const chatService = new ChatService();
export type { Message }; 