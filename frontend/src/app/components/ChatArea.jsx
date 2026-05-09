import React from 'react';
import ModelCard from './ModelCard';
import { BsSend } from "react-icons/bs";
import UserChat from './UserChat';
import Judgement from './Judgement';
import { RiAttachment2 } from "react-icons/ri";

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
                <UserChat item={item} />

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
                  <Judgement item={item} />
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
              <RiAttachment2 size={21} />
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
