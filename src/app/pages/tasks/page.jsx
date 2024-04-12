"use client"

import React, {useEffect, useState} from 'react'
import globals from '@/styles/globals.module.css'
import {currentUserName} from "@/states/userState.js"
import {useAtom} from "jotai"
import {TaskCard} from "@/components/pages/tasks/TaskCard.jsx"
import {useRouter} from "next/navigation.js"
import {FaListAlt} from "react-icons/fa"
import {SkeletonTasks} from "@/components/ui/Skeleton.jsx"
import {EmptyResult} from "@/components/ui/EmptyResult.jsx"

export default function TasksPage() {

    const router = useRouter()

    const [currentlyLoggedInUser] = useAtom(currentUserName)
    const [isTasks, setIsTasks] = useState(true)

    useEffect(() => {
        if (currentlyLoggedInUser === "") {
            router.push("/auth/login")
        }
    }, [])

    const [tasks, setTasks] = useState([])

    useEffect(() => {
            const fetchCurrentTasks = async () => {

                const request = {
                    user: currentlyLoggedInUser,
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

        }, [currentlyLoggedInUser]
    )

    return (
        <>
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
        </>
    )
}