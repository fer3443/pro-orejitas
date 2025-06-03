import { notFound } from "next/navigation";

import { getPetPost } from "@/actions";
import { PaginationComponent, PetsGrid, Title } from "@/components";
import { PetPost, PostType } from "@/interface";
import { typeLabel } from "@/constants/type-labels";

interface Props {
  params: Promise<{typest:string}>;
  searchParams: Promise<{page?:string}>
}
export default async function TypeStatusPage({params, searchParams}:Props) {
  const {typest} = await params;
  const strPage = await searchParams;

  const page = strPage ? parseInt(strPage.page || "1") : 1;
  const { data, totalPages } = await getPetPost({ page, typest: typest as PostType });
  if(data?.length === 0){
    return <div>
      <h2>No hay nada por aqui...</h2>
    </div>
  }
  if(typest !== 'ADOPTION' && typest !== 'LOST' && typest !== 'FOUND'){
    notFound();
  }

  return (
    <div>
      <Title
      title={`Sección de ${typeLabel[typest]}`}
      subtitle="Aqui podras encontrar a tu mascota perdida o en adopcion, o reportar una mascota encontrada."
      className="px-4 md:px-0"
      />
      <PetsGrid pets={data as PetPost[]}/>
      <PaginationComponent totalPages={totalPages || 1}/>
    </div>
  );
}