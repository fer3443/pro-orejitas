import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  isLoggedIn: boolean;
  userId: string | null;
  setUser: (isLogged:boolean, userId: string | null) => void;
  logout: () => void;
}

const storeApi:StateCreator<UserState> = (set) => ({
  isLoggedIn: false,
  userId:null,
  setUser: (islogged:boolean, userId:string | null) => set({isLoggedIn: islogged, userId: islogged ? userId : null}),
  logout: () => set({
    isLoggedIn: false,
    userId:null
  })
})

export const useUserStore = create<UserState>()(persist(storeApi,{name: "auth-orejitas-store"}))