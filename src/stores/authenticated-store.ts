import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
type AuthenticationStatus = "unauthenticated" | "authenticated" | "loading";
interface ISetAuthenticated {
  authenticated: AuthenticationStatus;
  setAuthenticatedStatus: (authenticatedStatus: AuthenticationStatus) => void;
}

export const setAuthenticated = create(
  persist<ISetAuthenticated>(
    (set) => ({
      authenticated: "unauthenticated",
      setAuthenticatedStatus: (authenticatedStatus) =>
        set((state) => ({ authenticated: authenticatedStatus })),
    }),
    {
      name: "userAuthenticated", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
