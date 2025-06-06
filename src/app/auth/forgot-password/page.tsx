import { IoArrowBack } from "react-icons/io5";
import { Title } from "@/components";
import { ForgotPasswordForm } from "./ui/ForgotPasswordForm";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-4 px-4 lg:px-0">
      <Link href="/auth/login" className="flex items-center gap-2 hover:text-blue-400 mt-4"><IoArrowBack/><span>Regresar</span></Link>
      <Title title="Olvidaste tu contraseña?" />
      <h3 className="font-semibold md:text-lg">
        Para reestrablecer tu contraseña, por favor escribí a continuación tu
        correo electrónico.
      </h3>
      <div>
        <ForgotPasswordForm />
      </div>
      <p className="text-xs">Enviaremos un email con las instrucciones a seguir.</p>
    </div>
  );
}
