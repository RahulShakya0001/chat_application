import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { Avatar, AvatarImage } from "@/components/ui/avatar"; // Make sure these are imported correctly
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { FiEdit2 } from "react-icons/fi";

function ProfileInfo() {
  const { userInfo } = useAppStore();

  const fallbackLetter =
    userInfo.firstName?.charAt(0).toUpperCase() ||
    userInfo.email?.charAt(0).toUpperCase() ||
    "?";

  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]">
      <div className="flex gap-3 items-center justify-center">
        <div className="w-12 h-12 relative">
          <Avatar className="h-12 w-12 rounded-full overflow-hidden">
            {userInfo.image ? (
              <AvatarImage
                src={`${HOST}${userInfo.image}`}
                alt="Profile"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <div
                className={`uppercase h-12 w-12 text-lg border flex items-center justify-center rounded-full ${getColor(
                  userInfo.color
                )}`}
              >
                {fallbackLetter}
              </div>
            )}
          </Avatar>
        </div>
        <div>
          {userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : ""}
        </div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
                <FiEdit2 className="text-purple-500 text-xl font-medium" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default ProfileInfo;
