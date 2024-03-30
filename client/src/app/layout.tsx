import type {Metadata} from "next";
import { ThemeProvider } from "~/components/theme-provider";
import {Inter} from "next/font/google";
import Header from "~/components/core/header";
import SideBar from "~/components/core/side-bar";
import RecentPosts from "~/components/core/recent-posts";
import "./globals.css";
import {Separator} from "~/components/ui/separator";
import {ClerkProvider} from "@clerk/nextjs";
import ThemeToggle from "~/components/core/dark-mode-toggle";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
            <html lang="en">
            <body className={`${inter.className}`}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Header/>
            <Separator className={'hidden md:block'}/>
            <div className={'md:grid lg:grid-cols-5 grid-cols-4'}>
                <SideBar/>
                <div className={'lg:col-span-3 col-span-3'}>
                    {children}
                    {/* <Posts/> */}
                </div>
                <div className={'hidden lg:flex px-'}>
                    <RecentPosts/>
                </div>
            </div>
            <ThemeToggle />
            </ThemeProvider>
            </body>
            </html>
        </ClerkProvider>
    );
}
