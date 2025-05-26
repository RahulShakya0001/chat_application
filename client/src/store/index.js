import { create } from "zustand";
import { createAuthSlice } from "./slices/auth-slice";
import { createChatSlice } from "./slices/chat-slice";

const useAppStore = create()((...set) => ({
  ...createAuthSlice(...set),
  ...createChatSlice(...set)
}));



export {
    useAppStore
}