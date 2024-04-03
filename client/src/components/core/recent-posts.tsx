"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { useFetcher } from "~/hooks/fetcher";

export default function RecentPosts() {
  const { allPosts } = useFetcher();
  const { data, error } = useSWR("/posts", allPosts);
  return (
    <div className={"flex dark:text-[#d8dce0] xl:px-4 w-full font-[500]"}>
      <div className={"p-4 w-full rounded-[12px]"}>
        <h1 className={"text-lg"}>Recent Posts</h1>
        <div className="flex flex-col gap-4">
          {data &&
            data.map((post) => (
              <div
                key={post.id}
                className="flex flex-col gap-4 py-2 dark:bg-secondary rounded-md px-2 border-[2px] dark:border-primary-foreground shadow"
              >
                <div className={"flex gap-2 items-center"}>
                  <Link href={`/${post.user.username}`}>
                    <Image
                      src={post?.user?.avatarUrl || `https://eu.ui-avatars.com/api/?name=${encodeURIComponent(post?.user?.username)}&size=250`}
                      alt="avatar"
                      className={"rounded-full w-8 h-8"}
                      width={32}
                      height={32}
                    />
                  </Link>
                  <div className="flex flex-col justify-center">
                    <Link
                      href={`/forum/${post.forum.slug}`}
                      className={
                        "dark:text-primary text-xs hover:underline cursor-pointer"
                      }
                    >
                      {post.forum.name}
                    </Link>
                    <Link
                      href={`/${post.user.username}`}
                      className={
                        "dark:text-primary hover:text-primary font-[500] text-xs hover:underline cursor-pointer"
                      }
                    >
                      {post.user.username}
                    </Link>
                  </div>
                </div>

                <p className={"text-xs"}>{post.title}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
