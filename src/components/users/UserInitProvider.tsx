"use client";

import { getUserStatus } from "@/actions";
import { useUserStore } from "@/store";
import { useEffect } from "react";

export const UserInitProvider = () => {
  const setUser = useUserStore(state => state.setUser);

  useEffect(() => {
   getUserStatus().then((res) => setUser(res.isLogged))
  },[setUser]);

  return null
}