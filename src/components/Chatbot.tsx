// src/components/Chatbot.tsx
import React, { useState } from 'react';

interface ChatbotProps {
  botName?: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ botName = 'e-Troy' }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    let response = "I'm not sure I understand.";
    if (input.toLowerCase().includes('remote')) {
      response = "For remote work, I recommend our Acer Swift and LG UltraWide Monitor.";
    } else if (input.toLowerCase().includes('install')) {
      response = "Our onsite installation service ensures a hassle-free setup.";
    }
    setMessages([...messages, `You: ${input}`, `${botName}: ${response}`]);
    setInput('');
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
        aria-label="Toggle Chatbot"
      >
        {botName}
      </button>
      {open && (
        <div className="mt-2 w-80 h-96 bg-white dark:bg-gray-800 border rounded shadow-lg flex flex-col animate-fadeIn">
          <div className="flex-1 p-2 overflow-y-auto">
            {messages.map((msg, idx) => (
              <div key={idx} className="mb-2 p-2 bg-gray-100 dark:bg-gray-700 rounded">
                {msg}
              </div>
            ))}
          </div>
          <div className="p-2 border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Type your message..."
              aria-label="Chat input"
            />
            <button
              onClick={sendMessage}
              className="mt-2 w-full bg-blue-600 text-white p-2 rounded"
              aria-label="Send Chat Message"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
