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
import SearchBox from "~/components/search/search";
import MobileSidebar from "~/components/core/mobile-sidebar";

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

  //console.log(theme);
  return (
    <nav
      className={
        "flex items-center gap-8 dark:text-[#d8dce0] px-4 py-2 bg-[#010409"
      }
    >
      <div className={"flex items-center py-2 gap-3 justify-between w-full"}>
        <Image
          className={""}
          src={theme === "light" ? LogoLight : LogoDark}
          width={120}
          height={120}
          alt="logo"
        />
        <SearchBox />
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
      <MobileSidebar open={open} handleShow={handleShow} user={user} data={data} />
    </nav>
  );
}
