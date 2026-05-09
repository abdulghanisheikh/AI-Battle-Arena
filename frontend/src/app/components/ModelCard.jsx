import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';
import { BsLightningChargeFill, BsStarFill } from 'react-icons/bs';

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
    <BsLightningChargeFill size={16} />
  ) : (
    <BsStarFill size={16} />
  );

  return (
    <div className={`bg-[#1c1e22] border rounded-xl p-6 flex flex-col transition-all ${cardStyle}`}>
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
        <div className="flex items-center gap-2 text-zinc-400 tracking-wider">
          {icon}
          {title}
        </div>

        {hasJudgement && (
          <div className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-tight border ${badgeStyle}`}>
            {isWinner && 'WINNING '}
            {(!isWinner || isModel1) && <span className="opacity-60 font-normal mr-1">SCORE</span>}
            <span className="text-base text-white">{score}</span>/10
          </div>
        )}
      </div>

      <div className="text-zinc-300 leading-relaxed flex-1 text-sm">
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ModelCard;