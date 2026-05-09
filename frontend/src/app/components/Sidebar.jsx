import React from 'react';
import { BsLightningChargeFill, BsTrophy } from "react-icons/bs";

const Sidebar = ({ onNewBattle }) => {
  return (
    <aside className="w-64 bg-[#16181c] border-r border-white/5 flex flex-col shrink-0 md:flex">
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
        <button onClick={onNewBattle} className="w-full bg-[#b0c6ff] text-[#002d6e] font-semibold py-3 px-4 rounded hover:bg-[#d9e2ff] transition-colors text-sm cursor-pointer">
          NEW BATTLE
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
