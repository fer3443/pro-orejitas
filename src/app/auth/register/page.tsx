import { Metadata } from "next";
import { RegisterForm } from "./ui/RegisterForm";

export const metadata:Metadata = {
  title: "Crear cuenta"
}
export default function RegisterPage() {
  return (
   <section className="h-screen flex flex-col items-center justify-center gap-6">
        <h1 className="text-2xl">Crear cuenta</h1>
        <article className="min-w-[300px]">
          <RegisterForm />
        </article>
      </section>
  );
}