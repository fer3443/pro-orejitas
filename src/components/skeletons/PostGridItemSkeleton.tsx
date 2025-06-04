import React from 'react'

export const PostGridItemSkeleton = () => {
  return (
    <div className="flex flex-col w-full h-full rounded-md overflow-hidden shadow-md animate-pulse bg-white">
      <div className="w-full h-56 bg-gray-200">&nbsp;</div>
      <div className="p-4 flex flex-col gap-y-3 flex-1">
        <div className="w-full h-6 bg-gray-200 rounded-md" />
        <div className="w-full h-4 bg-gray-200 rounded-md" />
        <div className="w-3/4 h-4 bg-gray-200 rounded-md" />
      </div>
    </div>
  )
}
