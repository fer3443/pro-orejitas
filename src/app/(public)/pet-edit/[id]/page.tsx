import { notFound } from "next/navigation";
import { EditPetPost } from "../ui/EditPetPost";
import { getPetPostId } from "@/actions";
import { PetPost } from "@/interface";
interface Props {
  params:Promise<{id:string}>
}
export default async function PetEditPage({params}:Props) {
  const {id} = await params;
  const {data,success} = await getPetPostId(id)
  if(!id || !success){
    notFound()
  }
  return (
  <div className="grid grid-cols-12 gap-6 my-6">
        <div className="col-span-full text-center">
          <h1>Editar Post</h1>
        </div>
        <div className="col-span-full flex justify-center">
          <EditPetPost data={data as PetPost}/>
        </div>
      </div>
  );
}