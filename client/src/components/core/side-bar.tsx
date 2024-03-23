import React from "react";
import Link from "next/link";
import {FaArrowDown, FaPlus} from "react-icons/fa6";
import {FaHome} from "react-icons/fa";
import {FaRocket} from "react-icons/fa";
import {Separator} from "~/components/ui/separator"
import {Button} from "~/components/ui/button";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "~/components/ui/collapsible";

export default function SideBar() {
    return (
        <div className={'hidden md:flex text-secondary items-start justify-stretch min-h-screen'}>
            <div className={'flex flex-col items-start gap-4 py-10 px-4 w-full'}>
                <ul className={'flex flex-col gap-1 w-full'}>
                    <li className={'flex gap-2 items-center text-xl text-secondary p-4 rounded-lg hover:text-primary cursor-pointer'}>
                        <FaHome/>
                        <Link className={''} href={'/dashboard'}>Home</Link>
                    </li>
                    <li className={'flex gap-2 items-center text-xl p-4 hover:text-primary cursor-pointer'}>
                        <FaRocket/>
                        <Link href={'/trending'}>Popular</Link>
                    </li>
                </ul>
                <Separator className={'bg-primary'} />
                <div className={'py-2'}>
                    <Button className={'hover:bg-primary'} variant={'ghost'}>
                        <FaPlus className={'mr-2'}/> Create Channel
                    </Button>
                </div>
                <Separator className={'bg-primary'} />
                <div className={'w-full py-4'}>
                    <Collapsible className={''}>
                        <div className={'flex justify-between'}>
                            <p className={'text-muted-foreground'}>Channels</p>
                            <CollapsibleTrigger className={``} asChild>
                                <FaArrowDown className={''}/>
                            </CollapsibleTrigger>

                        </div>
                        <CollapsibleContent className={'py-2'}>
                            {/*TODO Top communities */}
                            <Link href={'/channel/python'}>Python</Link>
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            </div>
            <Separator orientation={'vertical'} className={'bg-[#403A3A]'}/>

        </div>

    )
}
