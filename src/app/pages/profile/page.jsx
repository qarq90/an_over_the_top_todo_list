"use client"

import React, {useEffect} from 'react'
import globals from "@/styles/globals.module.css"
import Profile from "@/components/pages/profile/Profile.jsx"
import {FaUser} from "react-icons/fa"
import {useAtom} from "jotai"
import {currentUserID} from "@/states/userState.js"
import {useRouter} from "next/navigation.js"
import PageTransition from "@/app/layouts/PageTransition.jsx";

export default function ProfilePage() {

    const router = useRouter()

    const [currentLoggedInUserID, setCurrentLoggedInUserID] = useAtom(currentUserID)

    useEffect(() => {
        try {
            setTimeout(() => {
                if (typeof window !== 'undefined' && window.localStorage) {
                    let storageUserID = window.localStorage.getItem("storageUserID") || "";

                    if (storageUserID === "") {
                        router.push("/auth/login");
                    } else {
                        setCurrentLoggedInUserID(storageUserID);
                    }
                }
            }, 1500); // 1500 milliseconds
        } catch (error) {
            console.log(error);
        }
    }, []);


    return (
        <PageTransition>
            <div className={globals.Container}>
                <h1 className={globals.PageHeader}><FaUser/> Profile</h1>
                <Profile/>
            </div>
        </PageTransition>
    )
}
