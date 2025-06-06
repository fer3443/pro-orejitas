"use server"

import { cookies } from "next/headers"

export const getUserStatus = async ():Promise<{isLogged:boolean}> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-user')?.value
  if(!token){
    return {
      isLogged: false
    }
  }
  return {isLogged: true}
}