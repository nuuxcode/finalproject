"use client";

import React from "react";
import { useFetcher } from "~/hooks/fetcher";
import useSWR from "swr";
import Image from "next/image";
import Post from "~/components/posts/post";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "~/components/ui/button";
import { FaPlus } from "react-icons/fa6";

function Page({ params }: { params: { slug: string } }) {
  const { getForum } = useFetcher();
  const { data, error } = useSWR(params.slug, getForum);
  return (
    <div className="w-full p-2">
      {data && (
        <div
          style={{
            backgroundImage: `url(${data?.banner})`,
          }}
          className="w-full h-[150px] md:h-[200px] bg-cover bg-center bg-no-repeat relative shadow-md rounded-lg"
        >
          <div className="bottom-[-50px] left-4 px- absolute flex">
            <Image
              src={data?.logo}
              width={100}
              height={100}
              alt="logo"
              className="rounded-full w-[80px] h-[80px] md:w-[100px] md:h-[100px]"
            />
            <p className="place-self-end text-sm md:text-2xl">~/{data?.name}</p>
          </div>
          <div className="absolute bottom-[-120px] md:bottom-[-120px] md:right-2 left-3 flex gap-4">
            <Button
              variant={"outline"}
              size={"sm"}
              className="text-sm dark:bg-primary-foreground"
            >
              <FaPlus className="mr-2" />
              Create a post
            </Button>
            <Button size={"sm"} className="text-sm">
              <FaPlus className="mr-2" />
              Subscribe
            </Button>
          </div>
        </div>
      )}
      <div className="grid md:grid-cols-3 gap-4 px-2">
        <div className="flex md:col-span-2 min-h-screen flex-col px-1 md:px-0 py-40 gap-8">
          {data &&
            data?.posts.map((post) => (
              <div key={post.id} className="flex flex-col gap-8">
                <Post post={post} />
                <Separator className="bg-[#64748B] bg-opacity-30 h-[2px]" />
              </div>
            ))}
        </div>
        {data && (
          <div className="hidden md:block md:col-span-1 py-40">
            <div className="bg-secondary rounded-md px-4 py-4">
              <p className="text-lg font-[700] py-2">/{data?.name}</p>
              <p className="text-lg font-[400]">/{data?.description}</p>
              <div className="flex justify-between p-3">
                <div className="">
                  <p className="text-base text-center font-bold text-primary">
                    {data.subscribersCount}
                  </p>
                  <p className="text-sm text-center">Subscribers</p>
                </div>
                <div className="">
                  <p className="text-base text-center font-bold text-primary">
                    {data.postsCount}
                  </p>
                  <p className="text-sm text-center">Posts</p>
                </div>
                <div className="">
                  <p className="text-base text-primary text-center font-bold">
                    {data.viewsCount}
                  </p>
                  <p className="text-sm text-center">Views</p>
                </div>
              </div>
              <div>
                {/* <p>Moderator: {data.}</p> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
