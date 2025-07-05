"use server"

import { verifyToken } from "@/lib/auth-token";
import { cookies } from "next/headers"

export const getUserStatus = async ():Promise<{isLogged:boolean, id:string | null}> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-user')?.value
  if(!token){
    return {
      isLogged: false,
      id: null
    }
  }

  const { id } = verifyToken(token) as {id:string};
  if(!id){
    return {
      isLogged:false,
      id:null
    }
  }
  return {isLogged: true, id}
}