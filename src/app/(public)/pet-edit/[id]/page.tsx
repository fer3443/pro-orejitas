import { notFound } from "next/navigation";
import { EditPetPost } from "../ui/EditPetPost";
interface Props {
  params:Promise<{id:string}>
}
export default async function PetEditPage({params}:Props) {
  const {id} = await params;
  if(!id){
    notFound()
  }
  return (
  <div className="grid grid-cols-12 gap-6 my-6">
        <div className="col-span-full text-center">
          <h1>Crear un post Page</h1>
        </div>
        <div className="col-span-full flex justify-center">
          <EditPetPost id={id}/>
        </div>
      </div>
  );
}