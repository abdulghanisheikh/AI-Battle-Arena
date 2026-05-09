const UserChat = ({item}) => {
    return <div className="bg-[#1c1e22] border border-[#00f2ff]/40 rounded-xl rounded-tl-none px-5 py-2 shadow-[0_0_15px_rgba(0,242,255,0.05)] w-fit justify-start">
        <div className="text-lg text-[#00f2ff] tracking-widest flex items-center gap-2">
        USER PROMPT
        </div>
        <div className="text-white">
        {item.problem}
        </div>
    </div>
}

export default UserChat;