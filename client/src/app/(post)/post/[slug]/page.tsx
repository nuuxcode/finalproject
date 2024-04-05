"use client";

import React from "react";
import { useFetcher } from "~/hooks/fetcher";
import useSWR from "swr";
import Image from "next/image";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "~/components/ui/button";
import { FaPlus } from "react-icons/fa6";
import FullPost from "~/components/posts/fullpost";
import Comment from "~/components/comment/comment";
import CommentInput from "~/components/comment/commentInput";
function Page({ params }: { params: { slug: string } }) {
  const { getPost, getComments } = useFetcher();
  const { data: postData, error: postError } = useSWR(`getPost/${params.slug}`, getPost);
  const { data: commentsData, error: commentsError } = useSWR(`getComments/${params.slug}`, getComments);
  //console.log("postData", postData)
  //console.log("commentsData", commentsData)
  return (
    <div className="w-full p-2">
      {postData && (
        <div>
          <FullPost post={postData} />
          <CommentInput postId={postData.id} />
          <Comment comments={commentsData} />
        </div>
      )}
    </div>
  );
}

export default Page;
