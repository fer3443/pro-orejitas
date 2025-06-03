"use client"

import { PaginationComponent, PostGrid } from '@/components';
import { PostGridSkeleton } from '@/components/skeletons/PostGridSkeleton';
import { useUserPosts } from '@/hooks/useUserPosts'
import React from 'react'

interface UserPostsProps {
  page:number;
}
export const UserPosts = ({page}:UserPostsProps) => {
  const { posts, loading, pages } = useUserPosts({page});

  if(loading) return (<PostGridSkeleton/>);

  return (
    <div className="h-full col-span-1 md:col-span-3">
        <div className="col-span-full text-center mb-5">
          <h3 className="text-xl font-semibold text-gray-900">Mis Posts</h3>
        </div>
        <PostGrid posts={posts} />
        {
          (pages as number) > 1 && (
            <PaginationComponent totalPages={pages as number} />
          )
        }
      </div>
  )
}
