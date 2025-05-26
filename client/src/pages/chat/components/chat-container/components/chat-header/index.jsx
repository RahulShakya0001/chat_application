import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { RiCloseFill } from "react-icons/ri";

function ChatHeader() {
  const { closeChat, selectedChatData, selectedChatType } = useAppStore();
  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-4 md:px-20">
      <div className="flex gap-5 items-center">
        {/* Yahan kuch content add kar sakte ho like user name or avatar */}
        <div className="text-white text-lg font-semibold">
          <div className="w-12 h-12 relative">
            <Avatar className="h-12 w-12 rounded-full overflow-hidden ">
              {selectedChatData.image ? (
                <AvatarImage
                  src={`${HOST}${selectedChatData.image}`}
                  alt="Profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-12 w-12 text-lg border flex items-center justify-center rounded-full ${getColor(
                    selectedChatData.color
                  )}`}
                >
                  {selectedChatData.firstName
                    ? selectedChatData.firstName?.split("").shift()
                    : selectedChatData.email.split("").shift()}
                </div>
              )}
            </Avatar>

          </div>
        </div>
          <div>
            {
              selectedChatType === "contact" && selectedChatData?.firstName + " " + selectedChatData?.lastName
            }
          </div>
      </div>

      <div className="flex items-center justify-center gap-5">
        <button
          className="text-neutral-500 hover:text-white focus:outline-none transition-all duration-300"
          onClick={closeChat}
        >
          <RiCloseFill className="text-3xl" />
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;
