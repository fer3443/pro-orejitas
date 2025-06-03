import { getUserPost } from "@/actions";
import { Logout, PaginationComponent, PostGrid, Title } from "@/components";
import { PetPost } from "@/interface";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const page = 1;
  const { data, totalPages, success } = await getUserPost({ page });
  if (!success) {
    redirect("/feed");
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-x-2 my-5 md:gap-x-6">
      <div className="h-full col-span-1 mb-5 md:mb-0">
        <Title
          title="Mi perfil"
          subtitle={`Fernando Arroyo`}
          className="px-4 md:px-2"
        />
        <div className="w-full flex flex-col space-y-4">
          <ul className="flex flex-col px-4 md:px-2 gap-y-1 md:gap-y-2 text-xs lg:text-md text-gray-700 font-semibold">
            <li>
              Se unió el: <span>28 de mayo 2025</span>
            </li>
            <li>
              Total de posts: <span>1</span>
            </li>
            <li>
              Post activos: <span>1</span>
            </li>
            <li>
              Post cerrados: <span>2</span>
            </li>
          </ul>
         <div className="max-w-[150px]">
           <Logout />
         </div>
        </div>
      </div>
      <div className="h-full col-span-1 md:col-span-3">
        <div className="col-span-full text-center mb-5">
          <h3 className="text-xl font-semibold text-gray-900">Mis Posts</h3>
        </div>
        <PostGrid posts={data?.posts as PetPost[]} />
        <PaginationComponent totalPages={totalPages || 1} />
      </div>
    </div>
  );
}