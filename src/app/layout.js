"use client";

import {Inter} from "next/font/google";
import "./globals.css";
import PagesNav from "@/components/ui/PagesNav";
import {usePathname} from "next/navigation";
import AuthNav from "@/components/ui/AuthNav";

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({children}) {
    const router = usePathname()
    const isAuth = router === "/auth/login" || router === "/auth/signup";
    return (
        <html lang="en">
        <head>
            <title>an_over_the_top_todo_list</title>
            <link rel="icon" href="favicon.ico" sizes="any"/>
        </head>
        <body className={inter.className}>
        <div style={{display: "flex"}}>
            {
                isAuth ? <AuthNav/> : <PagesNav/>
            }
            <div style={{flex: 1}}>{children}</div>
        </div>
        </body>
        </html>
    );
}
