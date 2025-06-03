import React from 'react';
import { PetPost } from '@/interface';
import { PetsGridItem } from '../pets/PetsGridItem';

interface Props {
  posts:PetPost[]
}

export const PostGrid = ({posts}:Props) => {
   if(posts.length === 0){
       return (
         <div className='text-center'>
           <h2 className='font-semibold text-2xl'>Ups no pudimos cargar a nuestras mascotas...</h2>
           <h3 className='text-lg'>Pronto lo solucionamos</h3>
         </div>
       )
     }
     return (
       <div className='px-4 md:px-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-10'>
         {posts.map(post => (
           // <span key={pet.id}>{pet.title}</span>
           <PetsGridItem pet={post} key={post.id}/>
         ))}
       </div>
     )
}