import { Title } from "@/components";
import { ResetPasswordForm } from "./ui/ResetPasswordForm";

interface Props {
  searchParams:Promise<{token:string}>
}

export default async function ResetPasswordPage({searchParams}:Props) {
  const {token} = await searchParams;
  console.log(token)

  if(!token){
    return (
      <div className="lg:px-0">
        <h1 className="text-2xl font-semibold">Token Invalido o faltante.</h1>
      </div>
    )
  }
  return (
    <div className="space-y-4 px-4 lg:px-0">
      <Title title="Reestablecer contraseña"/>
      <div>
        <ResetPasswordForm token={token}/>
      </div>
    </div>
  );
}