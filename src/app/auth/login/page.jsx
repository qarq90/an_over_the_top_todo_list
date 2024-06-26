"use client"

import React, { useEffect } from 'react';
import globals from "@/styles/globals.module.css";
import Login from "@/components/auth/login/Login.jsx";
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation.js";
import { useAtom } from "jotai";
import { currentUserID } from "@/states/userState.js";
import Cookies from 'js-cookie';

export default function LoginPage() {
    const router = useRouter();
    const [currentLoggedInUserID, setCurrentLoggedInUserID] = useAtom(currentUserID);

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
        <div className={globals.Container}>
            <h1 className={globals.PageHeader}><FaUser />Login</h1>
            <Login />
        </div>
    );
}
