import { getUserToken } from "@/actions";
import { verifyToken } from "@/lib/auth-token";
import { redirect } from "next/navigation";

export default async function ProfilePage() {

  const data = await getUserToken()
  if(!data.success){
    redirect('/auth/login')
  }
  const user = verifyToken(data.token as string) as {id:string};
  if(!user){
    redirect('/auth/login')
  }

  redirect(`/profile/${user.id}`)
}