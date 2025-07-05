"use client";

import React from "react";
import { logoutUser } from "@/actions";
import { useUserStore } from "@/store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  onClose?: () => void;
}

export const Logout = ({ onClose }: Props) => {
  const setLogout = useUserStore((state) => state.logout);
  const router = useRouter();
  const handlerLogout = async () => {
    try {
      const resp = await logoutUser();
      if (resp.success) {
        setLogout();
        onClose?.();
        toast.success(resp.message);
        router.push("/feed");
      } else {
        toast(resp.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al cerrar sesión");
    }
  };
  return (
    <button
      onClick={handlerLogout}
      className="font-semibold cursor-pointer hover:text-blue-500 transition-all"
    >
      cerrar sesión
    </button>
  );
};
