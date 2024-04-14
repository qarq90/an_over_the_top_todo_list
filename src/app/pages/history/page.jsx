"use client"

import React, {useEffect, useState} from 'react'
import globals from "@/styles/globals.module.css"
import {FaHistory} from "react-icons/fa"
import {useAtom} from "jotai"
import {currentUserID} from "@/states/userState.js"
import {useRouter} from "next/navigation.js"
import HistoryCard from "@/components/pages/history/TasksHistory.jsx"
import styledTasks from "@/styles/pages/tasks/tasks.module.css"
import {SkeletonTasks} from "@/components/ui/Skeleton.jsx"
import {EmptyResult} from "@/components/ui/EmptyResult.jsx"
import PageTransition from "@/app/layouts/PageTransition.jsx";

export default function HistoryPage() {

    const router = useRouter()

    const [currentLoggedInUserID, setCurrentLoggedInUserID] = useAtom(currentUserID)

    const [tasks, setTasks] = useState([])
    const [isTasks, setIsTasks] = useState(true)

    useEffect(() => {
        try {
            if (typeof window !== 'undefined' && window.localStorage) {
                let storageUserID = localStorage.getItem("storageUserID") || "";

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


    useEffect(() => {
        const fetchCurrentTasks = async () => {

            const request = {
                user_id: currentLoggedInUserID,
            }

            const response = await fetch(`/api/post/history`, {
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
    }, [])

    return (
        <PageTransition>
            <div className={globals.Container}>
                <h1 className={globals.PageHeader}><FaHistory/> History</h1>
                <div className={styledTasks.infoContainer}>
                    <div className={styledTasks.info}>
                        <div className={styledTasks.active}></div>
                        <p>Active</p>
                    </div>
                    <div className={styledTasks.info}>
                        <div className={styledTasks.completed}></div>
                        <p>Completed</p>
                    </div>
                    <div className={styledTasks.info}>
                        <div className={styledTasks.archived}></div>
                        <p>Archived</p>
                    </div>
                    <div className={styledTasks.info}>
                        <div className={styledTasks.deleted}></div>
                        <p>Deleted</p>
                    </div>
                </div>
                {isTasks ? <SkeletonTasks/> : (
                    tasks.length === 0 ? <EmptyResult isHome={false}/> : (
                        tasks.map((task) => (
                            <div key={task.id}>
                                <HistoryCard tasks={task}/>
                            </div>
                        ))
                    )
                )}
            </div>
        </PageTransition>
    )
}
