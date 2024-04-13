"use client"

import React, {useEffect} from 'react'
import globals from "@/styles/globals.module.css"
import AddTask from "@/components/pages/add/AddTask.jsx"
import {FaPlus} from "react-icons/fa"
import {useAtom} from "jotai"
import {currentUserID, currentUserName} from "@/states/userState.js"
import {useRouter} from "next/navigation.js"
import PageTransition from "@/app/layouts/PageTransition.jsx";

export default function Add() {

    const router = useRouter()

    const [currentLoggedInUserID] = useAtom(currentUserID)

    useEffect(() => {

        if (currentLoggedInUserID === "") {
            router.push("/auth/login")
        }

    }, [])

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