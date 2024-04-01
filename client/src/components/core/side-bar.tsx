"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowDown, FaPlus } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { FaRocket } from "react-icons/fa";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { useUser } from "@clerk/clerk-react";
import { useFetcher } from "~/hooks/fetcher";
import useSWR from "swr";

export default function SideBar() {
  const { isSignedIn } = useUser();
  const { allForums } = useFetcher();
  const { data, error } = useSWR("/forums", allForums);

  return (
    <div
      className={
        "hidden md:flex dark:text-[#d8dce0] items-start justify-stretch min-h-screen"
      }
    >
      <div className={"flex flex-col items-start gap-4 py-10 px-4 w-full"}>
        <ul className={"flex flex-col gap-1 w-full"}>
          <li
            className={
              "flex gap-2 items-center text-xl p-4 rounded-lg hover:text-primary cursor-pointer"
            }
          >
            <FaHome />
            <Link className={""} href={"/"}>
              Home
            </Link>
          </li>
          <li
            className={
              "flex gap-2 items-center text-xl p-4 hover:text-primary cursor-pointer"
            }
          >
            <FaRocket />
            <Link href={"/trending"}>Popular</Link>
          </li>
        </ul>
        <Separator className={"bg-primary"} />
        <div className={"py-2"}>
          <Button className={"hover:bg-primary"} variant={"ghost"}>
            <FaPlus className={"mr-2"} /> Create Post
          </Button>
        </div>
        <Separator className={"bg-primary"} />
        {/* TODO Make this into a component */}
        <div className={"w-full py-4"}>
          <Collapsible defaultOpen={true} className={""}>
            <CollapsibleTrigger className={`cursor-pointer`} asChild>
              <div className={"flex justify-between"}>
                <p className={"text-muted-foreground"}>Forums</p>
                <FaArrowDown className={""} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className={"py-2"}>
              <div className="flex flex-col gap-4 py-4">
                {data &&
                  data.map((forum) => (
                    <div key={forum.id} className="flex gap-4 items-center">
                      <Image
                        src={
                          forum.logo ??
                          "https://placehold.co/150/EEE/31343C?font=montserrat&text=No+image"
                        }
                        alt={forum.name}
                        width={32}
                        height={32}
                        className="rounded-full w-8 h-8"
                      />
                      <div className="w-[80%]">
                        <Link
                          href={`/forum/${forum.slug}`}
                          className={
                            "text-muted-foreground text-sm hover:text-primary hover:underline truncate font-bold"
                          }
                        >
                          <p className="truncate">{forum.name}</p>
                        </Link>
                        <p className={"text-muted-foreground text-xs"}>
                          {forum.postsCount} posts
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
      <Separator orientation={"vertical"} className={""} />
    </div>
  );
}
