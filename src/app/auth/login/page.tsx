import { LoginForm } from "./ui/LoginForm";

export default function LoginPage() {
  return (
    <section className="h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl">Iniciar sesión</h1>
      <article className="min-w-[250px]">
        <LoginForm />
      </article>
    </section>
  );
}