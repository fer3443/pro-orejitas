import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div>
      <h1>No se encontró la publicación</h1>
      <Link href={'/feed'}>Regresar al feed</Link>
    </div>
  );
}