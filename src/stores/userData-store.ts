import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type fetchData = {
  score_user: string;
  u_rank: string;
  remote_key: string;
  invite_link: string;
  u_name: string;
  refer: string;
  lider_user: string;
  wls: boolean;
  btn_list: {
    tg: boolean;
    xt: boolean;
    discord: boolean;
    gp: boolean;
  };
  discord_link: string;
};

interface ISetData {
  data: fetchData | null;
  setData: (data: fetchData | null) => void;
}

export const setData = create(
  persist<ISetData>(
    (set) => ({
      data: null,
      setData: (data) => set({ data: data }),
    }),
    {
      name: "userData", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
