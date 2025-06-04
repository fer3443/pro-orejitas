import { Logout, Title } from "@/components";
import { UserPosts } from "./ui/UserPosts";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function ProfilePage({searchParams}:Props) {
  const strPage = await searchParams;
  const page = strPage ? parseInt(strPage.page || "1") : 1;
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-4 gap-x-2 my-5 md:gap-x-6">
      <div className="h-full col-span-1 mb-5 md:mb-0 flex flex-col items-center">
        <Title
          title="Mi perfil"
          subtitle={`Fernando Arroyo`}
          className="px-4 md:px-2"
        />
        <div className="w-full flex flex-col space-y-4 px-4 md:px-2">
          <ul className="flex flex-col gap-y-1 md:gap-y-2 text-xs lg:text-md text-gray-700 font-semibold">
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
      <UserPosts page={page}/>
    </div>
  );
}