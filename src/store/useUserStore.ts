import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  isLoggedIn: boolean;

  setUser: (isLogged:boolean) => void;
}

const storeApi:StateCreator<UserState> = (set) => ({
  isLoggedIn: false,

  setUser: (islogged:boolean) => set({isLoggedIn: islogged})
})

export const useUserStore = create<UserState>()(persist(storeApi,{name: "auth-orejitas-store"}))