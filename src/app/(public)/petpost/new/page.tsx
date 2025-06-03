import { NewPetPost } from "./ui/NewPetPost";

export default function NewPetPostPage() {
  return (
    <div className="grid grid-cols-12 gap-6 my-6">
      <div className="col-span-full text-center">
        <h1>Crear un post Page</h1>
      </div>
      <div className="col-span-full flex justify-center">
        <NewPetPost/>
      </div>
    </div>
  );
}