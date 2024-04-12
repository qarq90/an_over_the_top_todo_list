"use client"

import globals from '@/styles/globals.module.css'
import {useRouter} from "next/navigation.js";
import {currentUserName} from "@/states/userState.js";
import {useAtom} from "jotai";
import {useEffect} from "react";

export default function Home() {

    const router = useRouter()

    const [currentlyLoggedInUser] = useAtom(currentUserName)

    if (currentlyLoggedInUser === "") {
        router.push("/auth/login");
    }

    return (
        <div className={globals.Container}>
            <h1 className={globals.PageHeader}>Welcome Back, {currentlyLoggedInUser}</h1>
        </div>
    );
}
