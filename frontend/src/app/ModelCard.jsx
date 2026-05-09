import React from 'react';
import ReactMarkdown from 'react-markdown';

const ModelCard = ({ variant, isWinner, hasJudgement, score, content }) => {
  const isModel1 = variant === 'model1';
  
  // Styles for Model 1
  const m1CardStyle = 'border-white/5';
  const m1BadgeStyle = isWinner ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' : 'bg-black/40 border-white/10 text-zinc-300';

  // Styles for Model 2
  const m2CardStyle = 'border-white/5';
  const m2BadgeStyle = isWinner ? 'bg-violet-600 border-violet-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]' : 'bg-black/40 border-white/10 text-zinc-300';

  const cardStyle = isModel1 ? m1CardStyle : m2CardStyle;
  const badgeStyle = isModel1 ? m1BadgeStyle : m2BadgeStyle;

  const title = isModel1 ? 'MODEL 1' : 'MODEL 2';
  
  const icon = isModel1 ? (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
  ) : (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
  );

  return (
    <div className={`bg-[#1c1e22] border rounded-xl p-6 flex flex-col transition-all ${cardStyle}`}>
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
        <div className="flex items-center gap-2 text-zinc-400 tracking-wider">
          {icon}
          {title}
        </div>

        {hasJudgement && (
          <div className={`px-4 py-1.5 rounded-full text-xs font-bold font-mono border ${badgeStyle}`}>
            {isWinner && 'WINNING '}
            {(!isWinner || isModel1) && <span className="opacity-60 font-normal mr-1">SCORE</span>}
            <span className="text-base text-white">{score}</span>/10
          </div>
        )}
      </div>

      <div className="text-zinc-300 leading-relaxed flex-1 text-sm">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ModelCard;