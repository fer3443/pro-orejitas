import React from 'react';
import Link from 'next/link';
import { IoAddOutline } from "react-icons/io5";
import { PetPost } from '@/interface';
import { PostGridItem } from './PostGridItem';

interface Props {
  posts:PetPost[]
}

export const PostGrid = ({posts}:Props) => {
   if(!posts.length){
       return (
         <div className='h-full text-center flex flex-col justify-center'>
           <h2 className='font-semibold text-2xl'>No encontramos mascotas...</h2>
           <h3 className='text-lg'>Prueba agregando una nueva</h3>
           <Link href='/petpost/new' className='font-semibold'><span>Publicar</span></Link>
         </div>
       )
     }
     return (
       <div className='px-4 md:px-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-10 relative'>
         {posts.map(post => (
           // <span key={pet.id}>{pet.title}</span>
           <PostGridItem pet={post} key={post.id}/>
         ))}
         <div className='w-[80px] fixed right-4 bottom-4'>
          <Link href='/petpost/new' className='w-full flex items-center justify-center gap-1 p-2 bg-gray-200 rounded-full shadow-md font-semibold'><IoAddOutline/><span>post</span></Link>
         </div>
       </div>
     )
}