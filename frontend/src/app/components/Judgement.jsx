import { FaBalanceScale } from "react-icons/fa";

const Judgement = ({item}) => {
    const {solution_1_score, solution_2_score, solution_1_reasoning, solution_2_reasoning} = item.judgement;

    const winnerModel = solution_1_score >= solution_2_score ? "MODEL 1" : "MODEL 2";
    const winnerScore = Math.max(solution_1_score, solution_2_score);
    const winnerSolutionReasoning = solution_1_score >= solution_2_score ? solution_1_reasoning : solution_2_reasoning;

    return <div className="bg-[#1c1e22] border border-[#00f2ff]/30 rounded-xl overflow-hidden">

        <div className="bg-[#161c20] px-6 py-4 border-b border-[#00f2ff]/20 flex items-center gap-2">
            <FaBalanceScale size={20} className="text-[#00f2ff]" />
            <span className="text-xs font-mono text-[#00f2ff] tracking-widest font-bold">JUDGE'S VERDICT</span>
        </div>

        <div className="px-6 py-3 flex justify-center items-start gap-8">
            <div className="italic text-zinc-300 text-[1.05rem] leading-relaxed flex-1">
            {winnerSolutionReasoning}
            </div>

            <div className="flex flex-col items-center justify-center gap-1">
                <div className="shrink-0 w-24 h-24 rounded-2xl bg-[#0a0b0d] border border-[#00f2ff] shadow-[0_0_20px_rgba(0,242,255,0.15)] flex items-center justify-center font-bold text-[#00f2ff]">
                    <h1 className="text-4xl">{winnerScore}</h1>
                </div>
                <h2 className="text-lg">{winnerModel}</h2>
            </div>
        </div>
    </div>
}

export default Judgement;