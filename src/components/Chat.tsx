import { useState } from 'react';
import { chatService, Message } from '../services/chatService';

interface ChatProps {
  width: string;
  height: string;
}

const Chat: React.FC<ChatProps> = ({ width, height }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim() && !isLoading) {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: input,
        role: 'user',
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        // Use mock service for development
        const response = await chatService.sendMockMessage(input);
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response,
          role: 'assistant',
          timestamp: Date.now()
        };

        setMessages(prev => [...prev, assistantMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
        // Add error message to chat
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: 'Sorry, there was an error processing your message.',
          role: 'assistant',
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div style={{ width, height, display: 'flex', flexDirection: 'column' }}>
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        padding: '10px',
        backgroundColor: '#1e1e1e',
        color: '#fff'
      }}>
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            style={{ 
              marginBottom: '10px',
              padding: '8px',
              backgroundColor: msg.role === 'user' ? '#2d2d2d' : '#1e1e1e',
              borderRadius: '4px',
              borderLeft: `3px solid ${msg.role === 'user' ? '#007acc' : '#4CAF50'}`
            }}
          >
            <div style={{ 
              fontSize: '12px', 
              color: '#888',
              marginBottom: '4px'
            }}>
              {msg.role === 'user' ? 'You' : 'Assistant'} • {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
            {msg.content}
          </div>
        ))}
        {isLoading && (
          <div style={{ 
            padding: '8px',
            color: '#888',
            fontStyle: 'italic'
          }}>
            Assistant is typing...
          </div>
        )}
      </div>
      <div style={{ 
        padding: '10px', 
        borderTop: '1px solid #333',
        display: 'flex',
        gap: '10px'
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          disabled={isLoading}
          style={{
            flex: 1,
            padding: '8px',
            backgroundColor: '#2d2d2d',
            border: '1px solid #444',
            color: '#fff',
            borderRadius: '4px'
          }}
          placeholder={isLoading ? "Assistant is typing..." : "Type a message..."}
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          style={{
            padding: '8px 16px',
            backgroundColor: isLoading ? '#444' : '#007acc',
            border: 'none',
            color: '#fff',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat; 