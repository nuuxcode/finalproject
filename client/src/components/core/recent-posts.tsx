import {Separator} from "~/components/ui/separator";
import React from "react";

export default function RecentPosts() {
    return (
        <div className={'flex dark:text-[#d8dce0] w-full px- rounded-[12px]'}>
            <Separator orientation={'vertical'} className={''}/>
            <div className={'px-2 py-10'}>
                <h1 className={'text-lg'}>Recent Posts</h1>
            </div>
        </div>
    )
}