import type { Metadata } from "next";
import { ThemeProvider } from "~/components/theme-provider";
import { Inter } from "next/font/google";
import Header from "~/components/core/header";
import SideBar from "~/components/core/side-bar";
import RecentPosts from "~/components/core/recent-posts";
import "./globals.css";
import 'react-quill/dist/quill.snow.css';
import { Separator } from "~/components/ui/separator";
import { ClerkProvider } from "@clerk/nextjs";
import ThemeToggle from "~/components/core/dark-mode-toggle";
import { dark } from "@clerk/themes";
import { Toaster } from "~/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WeGotThis Community",
  description: "You are not alone. WeGotThis Community is here to help you.",
  icons: {
    icon: "./wgt.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <Separator className={"hidden md:block"} />
            <div className={"md:grid lg:grid-cols-5 grid-cols-4"}>
              <SideBar />
              <div className={"lg:col-span-3 col-span-3"}>
                {children}
                {/* <Posts/> */}
              </div>
              <div className={"hidden lg:flex justify-center px- w-full"}>
                <Separator orientation={"vertical"} className={""} />

                <RecentPosts />
              </div>
            </div>
            <Toaster />
            <ThemeToggle />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
