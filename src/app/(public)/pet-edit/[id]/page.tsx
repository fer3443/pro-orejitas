import { notFound } from "next/navigation";
import { EditPetPost } from "../ui/EditPetPost";
import { getPetPostId } from "@/actions";
import { PetPost } from "@/interface";
import { Metadata } from "next";
interface Props {
  params:Promise<{id:string}>
}

export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {id} = await params;
  const {data, success} = await getPetPostId(id);
  if(!id || !success){
    return {
      title: "Titulo no encontrado",
      description: "No se encontró la publicación"
    }
  }
  return  {
    title: `Editar Post - ${data?.title}`,
    description: data?.description
  }
}

export default async function PetEditPage({params}:Props) {
  const {id} = await params;
  const {data,success} = await getPetPostId(id)
  if(!id || !success){
    notFound()
  }
  return (
  <div className="grid grid-cols-12 gap-6 my-6">
        <div className="col-span-full flex justify-center">
          <EditPetPost data={data as PetPost}/>
        </div>
      </div>
  );
}