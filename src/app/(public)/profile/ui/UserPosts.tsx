"use client";

import { PaginationComponent, PostGrid } from "@/components";
import { PostGridSkeleton } from "@/components/skeletons/PostGridSkeleton";
import { useUserPosts } from "@/hooks/useUserPosts";
import React from "react";

interface UserPostsProps {
  page: number;
  userId: string;
}
export const UserPosts = ({ page, userId }: UserPostsProps) => {
  const { posts, loading, pages } = useUserPosts({ page, userId });

  if (loading)
    return (
      <div className="h-full col-span-full">
        <div className="text-center mb-5">
          <h3 className="text-xl font-semibold text-gray-900">Posteos</h3>
        </div>
        <PostGridSkeleton />
      </div>
    );

  return (
    <div className="h-full col-span-full">
      <div className="text-center mb-5">
        <h3 className="text-xl font-semibold text-gray-900">Posteos</h3>
      </div>
      <PostGrid posts={posts} />
      {(pages as number) > 1 && (
        <PaginationComponent totalPages={pages as number} />
      )}
    </div>
  );
};
