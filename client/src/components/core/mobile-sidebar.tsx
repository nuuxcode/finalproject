import { useState } from 'react';
import { FaHome, FaRocket, FaPlus, FaArrowDown } from 'react-icons/fa';
import { Sheet, SheetContent } from "~/components/ui/sheet";
import Link from 'next/link';
import Image from 'next/image';
import { UserButton } from "@clerk/nextjs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import CreatePostModal from "~/components/posts/create-post-modal";


interface Forum {
  id: string;
  logo?: string;
  name: string;
  slug: string;
  postsCount: number;
}

const MobileSidebar = ({ open, handleShow, user, data }: { open: boolean, handleShow: () => void, user: any, data?: Forum[] }) => {
  const [openPost, setOpenPost] = useState(false);

  const handleModalOpen = () => {
    setOpenPost(!openPost);
    if (open) handleShow()
  }
  return (
<Sheet open={open} onOpenChange={handleShow}>
  <CreatePostModal open={openPost} setOpen={handleModalOpen} />
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
              <Button className={"bg-primary"} variant={"ghost"} onClick={handleModalOpen}>
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
  );
};

export default MobileSidebar;
