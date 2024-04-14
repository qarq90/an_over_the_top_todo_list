"use client"

import React, {useEffect} from 'react'
import globals from "@/styles/globals.module.css"
import AddTask from "@/components/pages/add/AddTask.jsx"
import {FaPlus} from "react-icons/fa"
import {useAtom} from "jotai"
import {currentUserID} from "@/states/userState.js"
import {useRouter} from "next/navigation.js"
import PageTransition from "@/app/layouts/PageTransition.jsx";
import Cookies from "js-cookie";

export default function Add() {

    const router = useRouter()

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
        <PageTransition>
            <div className={globals.Container}>
                <h1 className={globals.PageHeader}><FaPlus/> Add Task</h1>
                <div className={globals.SubContainer}>
                    <AddTask/>
                </div>
            </div>
        </PageTransition>
    )
}