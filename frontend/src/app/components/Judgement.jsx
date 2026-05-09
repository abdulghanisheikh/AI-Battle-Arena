import { FaBalanceScale } from "react-icons/fa";

const Judgement = ({item}) => {
    const {solution_1_score, solution_2_score, solution_1_reasoning, solution_2_reasoning} = item.judgement;
    
    const winner_score = Math.max(solution_1_score, solution_2_score);
    const winner_solution_reasoning = solution_1_score >= solution_2_score ? solution_1_reasoning : solution_2_reasoning;

    return <div className="bg-[#1c1e22] border border-[#00f2ff]/30 rounded-xl overflow-hidden">
        <div className="bg-[#161c20] px-6 py-4 border-b border-[#00f2ff]/20 flex items-center gap-2">
            <FaBalanceScale size={20} className="text-[#00f2ff]" />
            <span className="text-xs font-mono text-[#00f2ff] tracking-widest font-bold">JUDGE'S VERDICT</span>
        </div>
        <div className="px-6 py-3 flex justify-center items-start gap-8">
            <div className="italic text-zinc-300 text-[1.05rem] leading-relaxed flex-1">
            {winner_solution_reasoning}
            </div>
            <div className="shrink-0 w-24 h-24 rounded-2xl bg-[#0a0b0d] border border-[#00f2ff] shadow-[0_0_20px_rgba(0,242,255,0.15)] flex items-center justify-center text-4xl font-bold text-[#00f2ff]">
                {winner_score}
            </div>
        </div>
    </div>
}

export default Judgement;