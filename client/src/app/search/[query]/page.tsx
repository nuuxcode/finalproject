"use client";

import React from "react";
import { useFetcher } from "~/hooks/fetcher";
import useSWR from "swr";
import Post from "~/components/posts/post";
import { Separator } from "@radix-ui/react-separator";


function SearchPage({ params }: { params: { query: string } }) {
  const { searchPosts } = useFetcher();
  const { data: results, error } = useSWR(`searchPosts/${params.query}`, searchPosts);

  if (error) return <div>Failed to load</div>
  if (!results) return <div>Loading...</div>

  return (
    <div>
      {results.map((post: any) => (
        <div key={post.id} className="flex flex-col gap-8">
          <Post post={post} />
          <Separator className="bg-[#64748B] bg-opacity-30 h-[2px]" />
        </div>
      ))}
    </div>
  );
};

export default SearchPage;
