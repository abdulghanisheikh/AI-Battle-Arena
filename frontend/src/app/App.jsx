import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './index.css';
import ModelCard from './ModelCard';

const App = () => {
  const [messages, setMessages] = useState([
    {
      problem: "Explain the concept of quantum entanglement to a five-year-old.",
      solution_1: "Imagine two magic dice. If you roll one in New York and it shows a six, the other one in London will **instantly** show a six too, no matter how far apart they are. They are connected by an invisible thread that science calls entanglement.",
      solution_2: "Think of two special socks. Even if you take one to the moon and keep one here, as soon as you put the left sock on your foot, the one on the moon **automatically** becomes a right sock. They always know what the other one is doing because they are a pair!",
      judgement: {
          solution_1_score: 8.5,
          solution_2_score: 9.2,
          solution_1_reasoning: "Good technical explanation using dice.",
          solution_2_reasoning: "\"Model B's analogy is more relatable for the target age group, though Model A was technically more precise. The 'sock' metaphor reduces complex quantum state collapse into a simple concept of 'pairing' that five-year-olds can easily visualize.\"",
          winner: 2
      }
    }
  ]);

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
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                Live Arena
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-6 py-3 text-zinc-400 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Leaderboards
              </a>
            </li>
          </ul>
        </nav>

        <div className="p-6">
          <button className="w-full bg-[#b0c6ff] text-[#002d6e] font-semibold py-3 px-4 rounded hover:bg-[#d9e2ff] transition-colors text-sm cursor-pointer">
            NEW BATTLE
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative bg-[#111316]">

        {/* Top bar */}
        <header className="flex justify-between md:justify-end items-center p-6 pb-2">
          <h1 className="text-xl font-bold tracking-wider text-white md:hidden">AI BATTLE ARENA</h1>
          <button className="hover:text-white transition-colors">
              login
          </button>
        </header>

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
                        <svg className="w-5 h-5 text-[#00f2ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path></svg>
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
                placeholder="Enter next battle prompt..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-transparent border-none text-white px-4 py-1 placeholder-zinc-500 focus:outline-none focus:ring-0"
              />
              <button type="button" className="p-3 text-zinc-400 hover:text-white transition-colors">
                <svg className="w-5 h-5 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
              </button>
              <button type="submit" className="bg-[#b0c6ff] text-[#002d6e] px-6 py-3 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-[#d9e2ff] transition-colors">
                SEND 
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
              </button>
            </form>
          </div>
        </div>
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