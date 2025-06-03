"use client";

import React from "react";
import clsx from "clsx";

import { Badge } from "@/components/ui/badge";
import { labelStatus } from "@/constants/type-labels";
import { PostStatus } from "@/interface";
import { getStatusById } from "@/actions";

interface Props {
  id: string;
}
export const StatusBadge = ({ id }: Props) => {
  const [postStatus, setPostStatus] = React.useState<PostStatus>("CLOSED");
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    getStatus();
  }, []);

  const getStatus = async () => {
    const resp = (await getStatusById(id)) as PostStatus;
    setPostStatus(resp);
    setIsLoading(false);
  };
  return (
    <>
      {isLoading ? (
        <div className="bg-gray-200 antialiased animate-pulse w-12 rounded-lg h-6">
          &nbsp;
        </div>
      ) : (
        <Badge
          variant={postStatus === "ACTIVE" ? "default" : "outline"}
          className={clsx("bg-gray-200", {
            "text-green-500": postStatus === "ACTIVE",
            "text-yellow-500": postStatus === "RESOLVED",
          })}
        >
          {labelStatus[postStatus]}
        </Badge>
      )}
    </>
  );
};