import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
interface ISetAddressStore {
  address: string | undefined;
  setAddress: (address: string | undefined) => void;
}

export const setAddressStore = create(
  persist<ISetAddressStore>(
    (set) => ({
      address: "",
      setAddress: (address) => set((state) => ({ address: address })),
    }),
    {
      name: "address", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
