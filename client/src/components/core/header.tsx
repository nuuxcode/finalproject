"use client";

import { Input } from "~/components/ui/input";
import React, { useState } from "react";
import { FaArrowDown, FaBars, FaPlus } from "react-icons/fa6";
import { FaHome, FaSearch } from "react-icons/fa";
import { FaRocket } from "react-icons/fa";
import { Separator } from "~/components/ui/separator";
import { UserButton, useClerk, useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import useSWR from "swr";
import { useFetcher } from "~/hooks/fetcher";
import LogoLight from "../../../public/logo light.png";
import LogoDark from "../../../public/logo dark.png";
import { Sheet, SheetContent } from "~/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import Image from "next/image";

export default function Header() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  const { theme } = useTheme();
  const { allForums } = useFetcher();
  const { data, error } = useSWR("/forums", allForums);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearch: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      console.log(searchValue);
      setSearchValue("");
    }
  };

  const handleShow = () => {
    setOpen(!open);
  };


  return (
    <nav
      className={
        "flex items-center gap-8 dark:text-[#d8dce0] px-4 py-2 bg-[#010409"
      }
    >
      <div className={"flex items-center py-2 gap-3 justify-between w-full"}>
        <Image
          className={""}
          src={theme === "dark" ? LogoDark : LogoLight}
          width={80}
          height={80}
          alt="logo"
        />
        <label className={"relative block md:min-w-[600px]"}>
          <span className={"sr-only"}>Search</span>
          <span className="absolute inset-y-0 left-2 flex items-center pl-2">
            <FaSearch />
          </span>
          <Input
            className={
              "place-self-center border-[#a37f2a] dark:bg-[#2E2B24] text-[#CBD5E1] focus-visible:ring-offset-0 ring-offset-0 rounded-[20px] px-12 placeholder:italic"
            }
            placeholder={"Search posts"}
            onChange={handleChange}
            onKeyUp={handleSearch}
            value={searchValue}
          />
        </label>
        <div className={"lg:hidden flex items-center"}>
          <button type={"button"} className={""} onClick={handleShow}>
            <FaBars className={"text-primary text-2xl"} />
          </button>
        </div>
        <div className={"hidden lg:flex justify-end gap-4"}>
          <UserButton />
          {!isSignedIn && isSignedIn !== undefined && (
            <Button
              className={"bg-primary text-white"}
              variant={"ghost"}
              onClick={() =>
                openSignIn({
                  afterSignInUrl: "/",
                })
              }
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
      <Sheet open={open} onOpenChange={handleShow}>
        <SheetContent
          className={"w-[250px] bg-zinc-950 border-0 overflow-y-scroll"}
        >
          <div className={"flex gap-4 py-8 items-center"}>
            {/* <Image className={'rounded-full'} src={'https://ui-avatars.com/api/?name=jd&background=facc15'}
                               alt={'avatar'} width={48} height={48}/> */}
            <UserButton />
            <div className={"flex flex-col justify-center"}>
              <p>{user?.username}</p>
              <p className={"text-sm text-center"}>Post: 100</p>
            </div>
          </div>
          <div className={"flex flex-col items-end w-full py-8"}>
            <ul className={"flex flex-col gap-1 w-full"}>
              <li
                className={
                  "flex gap-2 items-center text-xl p-4 rounded-lg hover:text-primary cursor-pointer"
                }
              >
                <FaHome />
                <Link className={""} href={"/"} onClick={handleShow}>
                  Home
                </Link>
              </li>
              <li
                className={
                  "flex gap-2 items-center text-xl p-4 hover:text-primary cursor-pointer"
                }
              >
                <FaRocket />
                <Link href={"/trending"}>Trending</Link>
              </li>
            </ul>
            <Separator className={"bg-secondary"} />

            <div className={"py-2 place-self-center"}>
              <Button className={"bg-primary"} variant={"ghost"}>
                <FaPlus className={"mr-2"} /> Create post
              </Button>
            </div>
            <Separator className={"bg-[#403A3A]"} />

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
                    <div key={forum.id} className="flex gap-2 items-center">
                      <Image
                        src={
                          forum.logo ??
                          "https://placehold.co/150/EEE/31343C?font=montserrat&text=No+image"
                        }
                        alt={forum.name}
                        width={32}
                        height={32}
                        className="rounded-full w-[32px] h-[32px]"
                      />
                      <div className="w-[80%]">
                        <Link
                          href={`/forum/${forum.slug}`}
                          className={
                            "text-muted-foreground text-sm hover:text-primary hover:underline font-bold"
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
        </SheetContent>
      </Sheet>
    </nav>
  );
}
