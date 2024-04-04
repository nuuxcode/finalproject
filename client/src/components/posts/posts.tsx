'use client'

import { useFetcher } from "~/hooks/fetcher";
import useSWR from "swr";
import { useUser } from "@clerk/clerk-react";
import Post from "./post";
import { Separator } from "../ui/separator";



export default function Posts() {
  const { allPosts } = useFetcher();
  const { isSignedIn } = useUser();

  const { data, error } = useSWR("desc", allPosts);


    return (
        <main className="flex min-h-screen flex-col items-center justify-between px-4 md:px-8 py-6 gap-8">
            {data && data.map((post) => (
                <>
                    <Post post={post} />
                    <Separator className="bg-[#64748B] bg-opacity-30 h-[2px]" />
                </>
            ))}
        </main>
    )
}
