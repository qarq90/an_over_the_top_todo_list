"use client"

import React, {useEffect, useState} from 'react'
import globals from "@/styles/globals.module.css"
import {FaArchive} from "react-icons/fa"
import {useAtom} from "jotai"
import {currentUserName} from "@/states/userState.js"
import {useRouter} from "next/navigation.js"
import {SkeletonTasks} from "@/components/ui/Skeleton.jsx"
import {EmptyResult} from "@/components/ui/EmptyResult.jsx"
import ArchivedTasks from "@/components/pages/archived/ArchivedTasks.jsx"

export default function ArchivedPage() {

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
                    archived: true,
                }

                const response = await fetch(`/api/post/archived/fetchArchived`, {
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
                    alert("Failed to fetch the tasks")
                }
            }
            fetchCurrentTasks()

        }, [currentlyLoggedInUser]
    )

    return (
        <>
            <div className={globals.Container}>
                <h1 className={globals.PageHeader}><FaArchive/> Archived</h1>
                {isTasks ? <SkeletonTasks/> : (
                    tasks.length === 0 ? <EmptyResult isHome={false}/> : (
                        tasks.map((task) => (
                            <div key={task.id}>
                                <ArchivedTasks tasks={task}/>
                            </div>
                        ))
                    )
                )}
            </div>
        </>
    )
}