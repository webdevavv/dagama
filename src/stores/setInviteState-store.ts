import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ISetInviteState {
  inviteState: string;
  setInviteState: (invite: string) => void;
}

export const setInviteState = create(
  persist<ISetInviteState>(
    (set) => ({
      inviteState: "invite_code",
      setInviteState: (invite) => set((state) => ({ inviteState: invite })),
    }),
    {
      name: "inviteState",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
