import { Title } from "@/components";
import { UserPosts } from "../ui/UserPosts";
import { notFound, redirect } from "next/navigation";
import { getUserById } from "@/actions";
import { formatDate } from "@/utils";

interface Props {
  searchParams: Promise<{ page?: string }>;
  params: Promise<{id:string}>
}

export default async function UserProfilePage({ searchParams, params }: Props) {
  const strPage = await searchParams;
  const page = strPage ? parseInt(strPage.page || "1") : 1;
  const {id} = await params;
  if(!id) {
    redirect('/feed')
  }

  const data = await getUserById(id);
  if(!data.success){
    return notFound();
  }
  
  const {user} = data

  return (
    <div className="min-h-screen grid grid-cols-1 gap-x-2 my-5 md:gap-x-6">
      <div className="col-span-full mb-5 md:mb-0 flex flex-col">
        <Title title={user?.name || "Name user"} className="px-4 md:px-2"/>
        <div className="w-full flex flex-col space-y-2 px-4 md:px-2 text-sm">
          <p>
            Se unió el: <span>{formatDate(user?.createdAt || "")}</span>
          </p>
          <p className="font-semibold">Posteos</p>
          <ul className="flex items-center gap-2 md:gap-4 text-gray-700 font-semibold">
            <li className="flex flex-col gap-2">
              <span className="text-base">{user?.postsCount.total}</span>
              <p>Totales</p>
            </li>
            <li className="flex flex-col gap-2">
              <span className="text-base">{user?.postsCount.active}</span>
              <p>Activos</p>
            </li>
            <li className="flex flex-col gap-2">
              <span className="text-base">{user?.postsCount.resolved}</span>
              <p>Resueltos</p>
            </li>
            <li className="flex flex-col gap-2">
              <span className="text-base">{user?.postsCount.closed}</span>
              <p>Cerrados</p>
            </li>
          </ul>
        </div>
      </div>
      <UserPosts page={page} userId={id} />
    </div>
  );
}
