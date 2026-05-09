import React from 'react';
import ModelCard from './ModelCard';
import { FaBalanceScale } from "react-icons/fa";
import { BsSend } from "react-icons/bs";

const ChatArea = ({ messages, messagesEndRef, inputValue, setInputValue, handleSend }) => {
  return (
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
                <div className="bg-[#1c1e22] border border-[#00f2ff]/40 rounded-xl rounded-tl-none px-5 py-2 shadow-[0_0_15px_rgba(0,242,255,0.05)] w-fit justify-start">
                  <div className="text-lg text-[#00f2ff] font-mono tracking-widest flex items-center gap-2">
                    USER PROMPT
                  </div>
                  <div className="text-white">
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
  );
};

export default ChatArea;
