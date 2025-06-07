import { Title } from "@/components";
import { LuMailCheck } from "react-icons/lu";

export default function SendedEmailPage() {
  return (
    <section className="h-dvh text-center">
      <Title title="Orejitas" subtitle="Recuperar contraseña" />
      <article className="h-2/3 max-w-2xl mx-auto flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-4">
        <LuMailCheck size={30} />
        <h3 className="text-lg font-semibold">
          Revisa tu casilla de correo electrónico
        </h3>
      </div>
      <div className="font-semibold text-sm text-gray-800">
        <p>
          Hemos enviado el enlace de recuperación de contraseña a tu correo
          electrónico. Caducará en una 1 hora
        </p>
        <p>Si el email no llego por favor revisa tu carpeta de spam.</p>
      </div>
      </article>
    </section>
  );
}
