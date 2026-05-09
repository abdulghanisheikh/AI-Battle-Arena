import React, { useState, useRef, useEffect, useContext } from 'react';
import './index.css';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import ChatInterface from './components/ChatInterface';
import EmptyState from './components/EmptyState';
import { useApp } from './hooks/useApp';
import { AppContext } from './app.context';

const App = () => {

  const app = useApp();
  const context = useContext(AppContext);
  const {messages, setMessages} = context;

  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async(e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setInputValue('');
    
    await app.handleSendMessage(inputValue);
  };

  return (
    <div className="flex h-screen bg-[#111316] text-zinc-200 font-sans overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar onNewBattle={() => setMessages([])} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative bg-[#111316]">

        {/* Top bar */}
        <TopBar />

        {messages.length === 0 ? (
          <EmptyState
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSend={handleSend}
          />
        ) : (
          <ChatInterface 
            messages={messages}
            messagesEndRef={messagesEndRef}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSend={handleSend}
          />
        )}
      </div>
      
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;