'use client'

import {Input} from "~/components/ui/input"
import React, {useState} from "react";
import {FaBars} from "react-icons/fa6";
// import {Button} from "~/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    // SheetTrigger,
} from "~/components/ui/sheet"


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
            </div>
            <Sheet open={open} onOpenChange={handleShow}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Menu items</SheetTitle>
                        <SheetDescription>
                            Some links here
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>

        </nav>
    )
}
