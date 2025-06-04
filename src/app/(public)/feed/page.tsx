import { getPetPost } from "@/actions/pets/get-pet-post";
import { PaginationComponent, PetsGrid, Title } from "@/components";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function FeedPage({ searchParams }: Props) {
  const strPage = await searchParams;
  const page = strPage ? parseInt(strPage.page || "1") : 1;
  const { data, totalPages } = await getPetPost({ page });

  return (
    <div>
      <Title
      title="Bienvenidos a Orejitas"
      subtitle="El sitio donde ayudamos a nuestros amiguitos de 4 patas"
      className="px-4 md:px-0"
      />
      <PetsGrid pets={data || []}/>
      <PaginationComponent totalPages={totalPages || 1}/>
    </div>
  );
}