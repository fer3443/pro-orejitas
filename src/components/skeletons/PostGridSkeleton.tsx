import React from 'react'
import { PostGridItemSkeleton } from './PostGridItemSkeleton';

export const PostGridSkeleton = () => {
  const arraySkeletons = Array.from({ length: 6 }, (_, i) => i + 1);
 
  return (
    // <div className='px-4 md:px-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-10 relative'>
    <div className='col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 w-full max-w-7xl mx-auto'>
         {arraySkeletons.map((post) => (
           <PostGridItemSkeleton key={post}/>
         ))}
       </div>
  )
}
