import {Separator} from "~/components/ui/separator";
import React from "react";

export default function RecentPosts() {
    return (
        <div className={'flex text-secondary w-full px-2 rounded-[12px]'}>
            <Separator orientation={'vertical'} className={'bg-[#403A3A]'}/>
            <div className={'px-2 py-10'}>
                <h1 className={'text-lg'}>Recent Posts</h1>
            </div>
        </div>
    )
}