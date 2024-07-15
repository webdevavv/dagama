import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ISetJwtToken {
  jwtToken: string;
  setJwtToken: (jwt: string) => void;
}

export const setJWT = create(
  persist<ISetJwtToken>(
    (set) => ({
      jwtToken: "",
      setJwtToken: (jwt) => set({ jwtToken: jwt }),
    }),
    {
      name: "jwtToken", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
