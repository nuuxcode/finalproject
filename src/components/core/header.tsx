'use client'

import {Input} from "~/components/ui/input"
import React, {useState} from "react";
import {FaArrowDown, FaBars, FaPlus} from "react-icons/fa6";
import {FaHome} from "react-icons/fa";
import {FaRocket} from "react-icons/fa";
import {Separator} from "~/components/ui/separator"

// import {Button} from "~/components/ui/button";
import {
    Sheet,
    SheetContent,
} from "~/components/ui/sheet"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "~/components/ui/collapsible"

import Link from "next/link";
import {Button} from "~/components/ui/button";
import Image from "next/image";


export default function Header() {
    const [searchValue, setSearchValue] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }

    const handleSearch: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Enter') {
            console.log(searchValue)
            setSearchValue('')
        }
    }

    const handleShow = () => {
        setOpen(!open)
    }
    return (
        <nav className={'flex items-center justify-between px-2 py-2 bg-secondary'}>
            <div>
                Logo
            </div>
            <div className={'flex items-center gap-3 justify-center'}>
                <Input placeholder={'Search posts'} onChange={handleChange} onKeyUp={handleSearch} value={searchValue}/>
                <button type={'button'} className={'lg:hidden'} onClick={handleShow}>
                    <FaBars className={'text-primary text-2xl'}/>
                </button>
                <Image className={'rounded-full'} src={'https://ui-avatars.com/api/?name=jd&background=facc15'}
                       alt={'avatar'} width={48} height={48}/>
            </div>
            <Sheet open={open} onOpenChange={handleShow}>
                <SheetContent className={'w-[200px]'}>
                    <div className={'flex flex-col items-end w-full'}>
                        <ul className={'flex flex-col items-end py-5 gap-4 w-full'}>
                            <li className={'flex gap-3 items-center w-full bg-secondary py-4 px-2 rounded-lg'}>
                                <FaHome/>
                                {/*TODO We check if user is logged in and send the link somewhere*/}
                                <Link href={'/dashboard'}>Home</Link>
                            </li>
                            <li className={'flex gap-3 items-center w-full py-4 px-2 rounded-lg'}>
                                <FaRocket/>
                                <Link href={'/trending'}>Trending</Link>
                            </li>
                        </ul>
                        <Separator/>
                        <div className={'py-2'}>
                            <Button className={'p-0'} variant={'ghost'}>
                                <FaPlus className={'mr-2'}/> Create Channel
                            </Button>
                        </div>
                        <Separator/>
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
                </SheetContent>
            </Sheet>

        </nav>
    )
}
