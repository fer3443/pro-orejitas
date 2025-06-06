import { Title } from "@/components";
import { NewPetPost } from "./ui/NewPetPost";

export default function NewPetPostPage() {
  return (
    <div className="grid grid-cols-12 gap-6 my-6 px-2 sm:px-4 md:px-0">
      <div className="col-span-full text-center">
        <Title title="Agregar publicación"/>
      </div>
      <div className="col-span-full flex justify-center">
        <NewPetPost/>
      </div>
    </div>
  );
}