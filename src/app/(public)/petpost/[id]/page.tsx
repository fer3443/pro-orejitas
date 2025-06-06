import { notFound } from "next/navigation";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { getPetPostId } from "@/actions";
import { SlideShow, SlideShowMobile, StatusBadge } from "@/components";
import { titleFont } from "@/config/fonts";
import { speciesLabel, typeLabel } from "@/constants/type-labels";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PetPostDetailPage({ params }: Props) {
  const { id } = await params;
  const { data } = await getPetPostId(id);
  if (!data) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-4 gap-5">
      <div className="col-span-1 md:col-span-2">
        {/*Slide show desktop*/}
        <SlideShow
          image={data.image}
          title={data.title}
          className="max-w-[500px] mx-auto hidden md:block"
        />
        {/*SlideShow Mobile */}
        <SlideShowMobile image={data.image} title={data.title} className="block md:hidden"/>
      </div>
      {/*Detalles */}
      <div className="col-span-1 md:col-span-2 space-y-4 px-4">
        <div className="space-y-4 max-w-[500px]">
          <div className="flex items-center justify-between">
            <h1
              className={`${titleFont.className} antialiased font-bold text-xl`}
            >
              {data.title}
            </h1>
            
            <StatusBadge
              id={data.id}
            />

          </div>
          <p className="text-muted-foreground">{data.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground mt-4">
            <div>
              <span className="font-semibold text-foreground">Tipo:</span>{" "}
              {typeLabel[data.type]}
            </div>
            <div>
              <span className="font-semibold text-foreground">Especie:</span>{" "}
              {speciesLabel[data.species]}
            </div>
            {data.breed && (
              <div>
                <span className="font-semibold text-foreground">Raza:</span>{" "}
                {data.breed}
              </div>
            )}
            {data.age && (
              <div>
                <span className="font-semibold text-foreground">Edad:</span>{" "}
                {data.age}
              </div>
            )}
            <div>
              <span className="font-semibold text-foreground">Ubicación:</span>{" "}
              {data.location}
            </div>
            <div>
              <span className="font-semibold text-foreground">Publicado:</span>{" "}
              {format(new Date(data.createdAt), "dd 'de' MMMM yyyy", {
                locale: es,
              })}
            </div>
            <div>
              <span className="font-semibold text-foreground">
                Publicado por:
              </span>{" "}
              {data.user.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}