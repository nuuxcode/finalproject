'use client'

import { FaRegHeart } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa6";
import { BiRepost } from "react-icons/bi";
import { PiArrowFatLineUp, PiArrowFatLineDown } from "react-icons/pi";
import { FaEllipsisH } from "react-icons/fa";
import { useUser, useClerk } from "@clerk/clerk-react";

import Image from "next/image";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "~/components/ui/popover";
import { ForumPost } from "~/types/Forum";

interface PostProps {
    post: ForumPost
}

export default function Post({post}: PostProps) {
  const { isSignedIn } = useUser();
  const {openSignIn} = useClerk()


    return (
        <div className="dark:bg-[#212327] dark:text-[#d8dce0] bg-white w-full py-4 px-4 rounded-md shadow border">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center py-2">
              <Image
                className="rounded-full"
                src={post.user.avatarUrl}
                alt="logo"
                width={48}
                height={48}
              />
              <div>
              <p className="dark:text-primary text-sm hover:underline cursor-pointer">{post.forum.name}</p>
              {/* <p className="text-primary text-sm hover:underline cursor-pointer">{post.user.username}</p> */}
              </div>
            </div>
            <Popover>
              <PopoverTrigger>
                <FaEllipsisH className="text-" size={16} />
              </PopoverTrigger>
              <PopoverContent className="dark:bg-[#212327] border-0 max-w-[100px]">
                <div className="flex flex-col gap-2">
                  <button className="text-primary">Report</button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <p className=" py-2 leading-6 text-sm">
            {post.title}
          </p>
          {post.attachments.map((attachment) => (
              <Image
                src={attachment.url}
                key={attachment.id}
                className="rounded-md object-cover place-self-center w-full h-[300px]"
                alt="logo"
                width={500}
                height={500}
              />))}
            
          {/* Not logged in btns */}
          {!isSignedIn && (
            <div className="flex justify-between items-center pt-4 gap-1 px-2">
              <div className="flex gap-1 md:gap-4 items-center">
                <div className="flex items-center gap-2">
                  <FaRegHeart className="" />
                  <p className="py- leading-6 text-sm">
                    {post.votesCount}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <FaCommentDots className="" />
                  <p className="py- leading-6 text-sm">
                    {post.commentsCount}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <BiRepost size={24} className="" />
                  <p className="py- leading-6 text-sm">
                    {post.viewsCount}
                  </p>
                </div>
              </div>
                <div>
                  <button onClick={() => openSignIn({
                            afterSignInUrl: '/'
                        })} className="underline text-sm">
                    Log in to see more
                  </button>
                </div>
            </div>
          )}
          {isSignedIn && <div className="flex justify-between items-center pt-8 px-2">
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2 bg-[#64748B] bg-opacity-30 rounded-[40px] p-1">
                <PiArrowFatLineUp className="text-secondary" />
                <p className="text-secondary leading-6 text-sm">
                  {post.votesCount}
                </p>
                <PiArrowFatLineDown className="text-secondary" />
              </div>
              <div className="flex items-center gap-2 bg-[#64748B] bg-opacity-30 rounded-[40px] p-1 px-2">
                <FaCommentDots className="text-secondary" />
                <p className="text-secondary leading-6 text-sm">
                  {post.commentsCount}
                </p>
              </div>
              <div className="flex items-center gap-1 bg-[#64748B] bg-opacity-30 rounded-[40px] p-1">
                <BiRepost size={24} className="text-secondary" />
                <p className="text-secondary leading-6 text-sm">
                  {post.viewsCount}
                </p>
              </div>
            </div>
          </div>}
        </div>
    )
}