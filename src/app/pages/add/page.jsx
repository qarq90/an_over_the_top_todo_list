"use client"

import React, {useEffect} from 'react';
import globals from "@/styles/globals.module.css";
import AddTask from "@/components/pages/add/AddTask.jsx";
import {FaPlus} from "react-icons/fa";
import {useAtom} from "jotai";
import {currentUserName} from "@/states/userState.js";
import {useRouter} from "next/navigation.js";

export default function Add() {
    const router = useRouter()
    const [currentlyLoggedInUser] = useAtom(currentUserName)
    useEffect(() => {
        if (currentlyLoggedInUser === "") {
            router.push("/auth/login");
        }
    }, []);
    return (
        <>
            <div className={globals.Container}>
                <h1 className={globals.PageHeader}><FaPlus/> Add Task</h1>
                <div className={globals.SubContainer}>
                    <AddTask/>
                </div>
            </div>
        </>
    )
}