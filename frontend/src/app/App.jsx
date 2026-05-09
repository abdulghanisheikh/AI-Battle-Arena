import React, { useState, useRef, useEffect } from 'react';
import './index.css';
import ModelCard from './components/ModelCard';
import { PiTerminalWindowBold } from "react-icons/pi";
import { BsSend, BsLightningChargeFill, BsTrophy } from "react-icons/bs";
import { RiAttachment2 } from "react-icons/ri";
import { FaBalanceScale } from "react-icons/fa";

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
      <aside className="w-64 bg-[#16181c] border-r border-white/5 flex flex-col shrink-0 hidden md:flex">
        <div className="p-6">
          <h1 className="text-xl font-bold tracking-wider text-white">AI BATTLE ARENA</h1>
        </div>
        
        <div className="px-6 py-4">
          <div className="text-[10px] text-zinc-500 font-bold tracking-widest mb-1">COMMAND CENTER</div>
          <div className="text-lg font-semibold text-[#b0c6ff]">Elite Rank</div>
        </div>

        <nav className="flex-1 mt-4">
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center gap-3 px-6 py-3 bg-[#1e2330] border-l-2 border-indigo-400 text-indigo-300 text-sm font-medium">
                <BsLightningChargeFill size={16} />
                Live Arena
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-6 py-3 text-zinc-400 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors">
                <BsTrophy size={16} />
                Leaderboards
              </a>
            </li>
          </ul>
        </nav>

        <div className="p-6">
          <button onClick={() => setMessages([])} className="w-full bg-[#b0c6ff] text-[#002d6e] font-semibold py-3 px-4 rounded hover:bg-[#d9e2ff] transition-colors text-sm cursor-pointer">
            NEW BATTLE
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative bg-[#111316]">

        {/* Top bar */}
        <header className="flex justify-between md:justify-end items-center px-6 py-3 pb-2">
          <button className="hover:text-white cursor-pointer text-lg transition-colors">
              Login
          </button>
        </header>

        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
            <div className="flex flex-col items-center max-w-2xl w-full text-center mt-[-10vh]">
              {/* Main Icon */}
              <div className="relative w-16 h-16 rounded-2xl bg-[#1c1e22] border border-violet-500/40 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(139,92,246,0.1)]">
                <BsLightningChargeFill size={32} className="text-white" />
              </div>

              <h2 className="text-4xl font-bold text-white mb-4">Start a New Battle</h2>
              <p className="text-zinc-400 text-lg mb-12">
                Challenge top-tier LLMs to a technical duel. Compare performance, and reasoning capabilities in our high-stakes arena.
              </p>

              {/* Main Input Box */}
              <form onSubmit={handleSend} className="w-full bg-[#1c1e22] border border-white/10 rounded-xl p-4 flex flex-col relative transition-all focus-within:border-[#b0c6ff]/50 focus-within:shadow-[0_0_30px_rgba(176,198,255,0.1)]">
                
                <div className="flex items-start gap-3 mb-2">
                  <div className="mt-1">
                    <PiTerminalWindowBold size={21} className='opacity-50' />
                  </div>
                  <textarea
                    className="w-full bg-transparent text-white placeholder-zinc-600 resize-none outline-none min-h-[100px] font-mono"
                    placeholder="Enter a complex coding challenge or reasoning task to initiate battle..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend(e);
                      }
                    }}
                  />
                </div>
                
                <div className="flex justify-between items-end mt-4">
                  <div className="flex gap-4 text-zinc-500">
                    <button type="button" className="hover:text-white transition-colors cursor-pointer">
                      <RiAttachment2 size={21} />
                    </button>
                  </div>

                  <button type="submit" className="bg-[#b0c6ff] text-[#002d6e] px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-[#d9e2ff] transition-colors cursor-pointer">
                    <p>INITIALIZE DUEL</p>
                    <BsSend size={18} />
                  </button>
                </div>
              </form>
            </div>


          </div>
        ) : (
          <>
            {/* Scrollable feed */}
            <div className="flex-1 overflow-y-auto p-6 pb-23 hide-scrollbar">
          <div className="max-w-4xl mx-auto flex flex-col gap-10">
            {messages.map((item, idx) => {
              const isModelAWinner = item.judgement && item.judgement.winner === 1;
              const isModelBWinner = item.judgement && item.judgement.winner === 2;

              return (
                <div key={idx} className="flex flex-col gap-8 animate-fade-in">
                  
                  {/* User Prompt */}
                  <div className="bg-[#1c1e22] border border-[#00f2ff]/40 rounded-xl p-6 shadow-[0_0_15px_rgba(0,242,255,0.05)]">
                    <div className="text-lg text-[#00f2ff] font-mono tracking-widest mb-3 flex items-center gap-2">
                      USER PROMPT
                      <div className="h-[1px] flex-1 bg-[#00f2ff]/20"></div>
                    </div>
                    <div className="text-white font-medium">
                      {item.problem}
                    </div>
                  </div>

                  {/* Models */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ModelCard
                      variant="model1"
                      isWinner={isModelAWinner}
                      hasJudgement={!!item.judgement}
                      score={item.judgement?.solution_1_score}
                      content={item.solution_1}
                    />
                    <ModelCard
                      variant="model2"
                      isWinner={isModelBWinner}
                      hasJudgement={!!item.judgement}
                      score={item.judgement?.solution_2_score}
                      content={item.solution_2}
                    />
                  </div>

                  {/* Judgement */}
                  {item.judgement && (
                    <div className="bg-[#1c1e22] border border-[#00f2ff]/30 rounded-xl overflow-hidden">
                      <div className="bg-[#161c20] px-6 py-4 border-b border-[#00f2ff]/20 flex items-center gap-2">
                        <FaBalanceScale size={20} className="text-[#00f2ff]" />
                        <span className="text-xs font-mono text-[#00f2ff] tracking-widest font-bold">JUDGE'S VERDICT</span>
                      </div>
                      <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="italic text-zinc-300 text-[1.05rem] leading-relaxed flex-1">
                          {item.judgement.solution_2_reasoning}
                        </div>
                        <div className="shrink-0 w-24 h-24 rounded-2xl bg-[#0a0b0d] border border-[#00f2ff] shadow-[0_0_20px_rgba(0,242,255,0.15)] flex items-center justify-center text-4xl font-bold text-[#00f2ff]">
                          {Math.max(item.judgement.solution_1_score, item.judgement.solution_2_score)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Fixed Input Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#111316] via-[#111316] to-transparent">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSend} className="bg-[#282a2d] rounded-xl flex items-center p-2 shadow-2xl border border-white/5">
              <input
                type="text" 
                placeholder="Type your problem statement here"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-transparent border-none text-sm text-white px-4 placeholder-zinc-500 focus:outline-none focus:ring-0"
              />
              <button type="button" className="px-3 py-1 text-zinc-400 hover:text-white transition-colors cursor-pointer text-sm">
                Add file
              </button>
              <button type="submit" className="bg-[#b0c6ff] text-[#002d6e] px-5 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-[#d9e2ff] transition-colors cursor-pointer">
                <span>SEND</span> 
                <BsSend size={18} />
              </button>
            </form>
          </div>
        </div>
        </>
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