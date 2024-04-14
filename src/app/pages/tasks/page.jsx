"use client"

import React, {useEffect, useState} from 'react'
import globals from '@/styles/globals.module.css'
import {currentUserID} from "@/states/userState.js"
import {useAtom} from "jotai"
import {TaskCard} from "@/components/pages/tasks/TaskCard.jsx"
import {useRouter} from "next/navigation.js"
import {FaListAlt} from "react-icons/fa"
import {SkeletonTasks} from "@/components/ui/Skeleton.jsx"
import {EmptyResult} from "@/components/ui/EmptyResult.jsx"
import PageTransition from "@/app/layouts/PageTransition.jsx";

export default function TasksPage() {

    const router = useRouter()

    const [currentLoggedInUserID, setCurrentLoggedInUserID] = useAtom(currentUserID)
    const [isTasks, setIsTasks] = useState(true)

    useEffect(() => {
        try {
            if (typeof window !== 'undefined' && window.localStorage) {
                let storageUserID = window.localStorage.getItem("storageUserID") || "";

                if (storageUserID === "") {
                    router.push("/auth/login");
                } else {
                    setCurrentLoggedInUserID(storageUserID);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }, []);


    const [tasks, setTasks] = useState([])

    useEffect(() => {
            const fetchCurrentTasks = async () => {

                const request = {
                    user_id: currentLoggedInUserID,
                    status: "pending",
                }

                const response = await fetch(`/api/post/tasks/fetchTasks`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(request),
                })

                const data = await response.json()

                if (data.status) {
                    setTasks(data.result)
                    setTimeout(() => setIsTasks(false), 2000)
                } else {
                    alert("Failed to fetch tasks")
                }

            }
            fetchCurrentTasks()

        }, [currentLoggedInUserID]
    )

    return (
        <PageTransition>
            <div className={globals.Container}>
                <h1 className={globals.PageHeader}><FaListAlt/> Tasks</h1>
                {isTasks ? <SkeletonTasks/> : (
                    tasks.length === 0 ? <EmptyResult isHome={false}/> : (
                        tasks.map((task) => (
                            <div key={task.id}>
                                <TaskCard tasks={task}/>
                            </div>
                        ))
                    )
                )}
            </div>
        </PageTransition>
    )
}