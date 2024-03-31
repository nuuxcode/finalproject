"use client"
 
import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
 
import { Button } from "~/components/ui/button"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
 
  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-11 h-11 fixed right-5 bottom-5 lg:right-8 lg:bottom-8 z-50 bg-primary text-secondary rounded-full dark:bg-gray-200 dark:text-gray-800 transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-opacity-50 dark:hover:shadow-lg dark:focus:ring-primary-foreground dark:focus:ring-opacity-50"
      variant="outline"
      size="icon"
    >
      {theme === "light" ? <SunIcon className="h-[1.2rem] w-[1.2rem]  rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" /> : <MoonIcon className="absolute h-[1.2rem] b w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />}
    </Button>
  )
}
