"use client";

import { logoutUser } from '@/actions';
import { useUserStore } from '@/store';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

export const Logout = () => {
  const setUser = useUserStore(state => state.setUser);
  const router = useRouter()
  const handlerLogout = async () => {
    try {
      const resp = await logoutUser();
      if(resp.success){
        setUser(false)
        toast.success(resp.message)
        router.push('/feed')
      }else{
        toast(resp.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Error al cerrar sesión")
    }
  }
  return (
    <button onClick={handlerLogout} className='border rounded-md shadow-xs p-2 cursor-pointer text-sm hover:bg-gray-200 transition-all'>cerrar sesión</button>
  )
}