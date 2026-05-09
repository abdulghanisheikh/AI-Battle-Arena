import React, { useState, useRef, useEffect } from 'react';
import './index.css';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import ChatArea from './components/ChatArea';
import EmptyState from './components/EmptyState';

const App = () => {
  const [messages, setMessages] = useState([]);

  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMockEntry = {
      problem: inputValue,
      solution_1: "Loading...",
      solution_2: "Loading...",
      judgement: null
    };

    setMessages([...messages, newMockEntry]);
    setInputValue('');
    
    setTimeout(() => {
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMsgIndex = newMessages.length - 1;

        newMessages[lastMsgIndex] = {
          problem: newMessages[lastMsgIndex].problem,
          solution_1: "Technical output for: " + newMessages[lastMsgIndex].problem,
          solution_2: "Creative output for: " + newMessages[lastMsgIndex].problem,
          judgement: {
            solution_1_score: 8.0,
            solution_2_score: 9.5,
            solution_1_reasoning: "Accurate.",
            solution_2_reasoning: "Highly engaging.",
            winner: 2
          }
        };

        return newMessages;
      });
    }, 1500);
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
          <ChatArea 
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