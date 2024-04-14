"use client"

import React, {useEffect} from 'react'
import globals from "@/styles/globals.module.css"
import SignUp from "@/components/auth/signup/Signup.jsx"
import {FaUserPlus} from "react-icons/fa"
import {useAtom} from "jotai";
import {currentUserID} from "@/states/userState.js";
import {router} from "next/navigation.js";
import Cookies from "js-cookie";

export default function ProfilePage() {

    const [currentLoggedInUserID, setCurrentLoggedInUserID] = useAtom(currentUserID)

    useEffect(() => {
        const loadStorage = async () => {
            try {
                const storageUserID = Cookies.get("storageUserID") || "";
                if (storageUserID === "") {
                    router.push("/auth/login");
                } else {
                    setCurrentLoggedInUserID(storageUserID);
                }
            } catch (error) {
                console.log(error);
            }
        };

        loadStorage();
    }, []);


    return (
        <>
            <div className={globals.Container}>
                <h1 className={globals.PageHeader}><FaUserPlus/>SignUp</h1>
                <SignUp/>
            </div>
        </>
    )
}