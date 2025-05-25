import { RiCloseFill } from "react-icons/ri";

function ChatHeader() {
  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-4 md:px-20">
      <div className="flex gap-5 items-center">
        {/* Yahan kuch content add kar sakte ho like user name or avatar */}
        <div className="text-white text-lg font-semibold">Chat Room</div>
      </div>

      <div className="flex items-center justify-center gap-5">
        <button className="text-neutral-500 hover:text-white focus:outline-none transition-all duration-300">
          <RiCloseFill className="text-3xl" />
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;
