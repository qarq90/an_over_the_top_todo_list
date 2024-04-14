"use client"

import React, {useEffect} from 'react'
import globals from "@/styles/globals.module.css"
import Login from "@/components/auth/login/Login.jsx"
import {FaUser} from "react-icons/fa"
import {router} from "next/navigation.js";
import {useAtom} from "jotai";
import {currentUserID} from "@/states/userState.js";

export default function ProfilePage() {

    const [currentLoggedInUserID, setCurrentLoggedInUserID] = useAtom(currentUserID)

    useEffect(() => {

        let storageUserID
        storageUserID = localStorage.getItem("storageUserID") || ""

        if (storageUserID === "") {
            router.push("/auth/login")
        } else {
            setCurrentLoggedInUserID(storageUserID)
        }

    }, []);

    return (
        <>
            <div className={globals.Container}>
                <h1 className={globals.PageHeader}><FaUser/>Login</h1>
                <Login/>
            </div>
        </>
    )
}