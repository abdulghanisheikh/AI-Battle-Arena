import React from 'react';
import { BsLightningChargeFill, BsSend } from "react-icons/bs";
import { PiTerminalWindowBold } from "react-icons/pi";
import { RiAttachment2 } from "react-icons/ri";

const EmptyState = ({ inputValue, setInputValue, handleSend }) => {
  return (
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
  );
};

export default EmptyState;
