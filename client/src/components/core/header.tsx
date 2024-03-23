'use client'

import {Input} from "~/components/ui/input"
import React, {useState} from "react";
import {FaArrowDown, FaBars, FaPlus} from "react-icons/fa6";
import {FaHome, FaSearch} from "react-icons/fa";
import {FaRocket} from "react-icons/fa";
import {Separator} from "~/components/ui/separator"
import { UserButton, useClerk } from "@clerk/nextjs";

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
    const {openSignIn, openSignUp} = useClerk()

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
        <nav className={'flex items-center gap-8 text-secondary px-8 py-2 bg-[#010409'}>
            <div className={'flex items-center py-2 gap-3 justify-between w-full'}>
                <div className={'text-secondary'}>
                    Logo
                </div>
                <label className={'relative block md:min-w-[600px]'}>
                    <span className={'sr-only'}>Search</span>
                    <span className="absolute inset-y-0 left-2 flex items-center pl-2">
                        <FaSearch/>
                    </span>
                    <Input
                        className={'place-self-center border-[#2E2B24] bg-[#2E2B24] text-[#CBD5E1] focus-visible:ring-offset-primary ring-offset-0 rounded-[20px] px-12 placeholder:italic'}
                        placeholder={'Search posts'}
                        onChange={handleChange} onKeyUp={handleSearch} value={searchValue}/>
                </label>
                <div className={'lg:hidden flex items-center'}>
                    <button type={'button'} className={''} onClick={handleShow}>
                        <FaBars className={'text-primary text-2xl'}/>
                    </button>
                </div>
                <div className={'hidden lg:flex justify-end gap-4'}>
                    {/*<Image className={'rounded-full'} src={'https://ui-avatars.com/api/?name=jd&background=facc15'}*/}
                    {/*       alt={'avatar'} width={48} height={48}/>*/}
                    <UserButton />
                    <Button className={'bg-primary'} variant={'ghost'} onClick={() => openSignIn({
                        afterSignInUrl: '/'
                    })}>Sign In</Button>
                    <Button className={'bg-primary'} variant={'ghost'} onClick={() => openSignUp({})}>Sign Up</Button>

                </div>
            </div>
            <Sheet open={open} onOpenChange={handleShow}>
                <SheetContent className={'w-[250px] bg-zinc-950 border-0 text-secondary'}>
                    <div className={'flex gap-4 py-8'}>
                        <Image className={'rounded-full'} src={'https://ui-avatars.com/api/?name=jd&background=facc15'}
                               alt={'avatar'} width={48} height={48}/>
                        <div className={'flex flex-col justify-center text-secondary'}>
                            <p>Username</p>
                            <p className={'text-sm text-center'}>Post: 100</p>
                        </div>
                    </div>
                    <div className={'flex flex-col items-end w-full py-8'}>
                        <ul className={'flex flex-col gap-1 w-full'}>
                            <li className={'flex gap-2 items-center text-xl text-secondary p-4 rounded-lg hover:text-primary cursor-pointer'}>
                                <FaHome/>
                                <Link className={''} href={'/dashboard'}>Home</Link>
                            </li>
                            <li className={'flex gap-2 items-center text-xl p-4 hover:text-primary cursor-pointer'}>
                                <FaRocket/>
                                <Link href={'/trending'}>Trending</Link>
                            </li>
                        </ul>
                        <Separator className={'bg-secondary'}/>

                        <div className={'py-2 place-self-center'}>
                            <Button className={'bg-primary'} variant={'ghost'}>
                                <FaPlus className={'mr-2'}/> Create Channel
                            </Button>
                        </div>
                        <Separator className={'bg-[#403A3A]'}/>

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
