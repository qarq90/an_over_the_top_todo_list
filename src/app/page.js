"use client"

import globals from '@/styles/globals.module.css'
import {useRouter} from "next/navigation.js"
import {currentUserName} from "@/states/userState.js"
import {useAtom} from "jotai"
import {useEffect, useState} from "react"
import styledHome from "@/styles/home/home.module.css"
import {TotalTasks} from "@/components/pages/home/TotalTasks.jsx"
import {ArchivedTasks} from "@/components/pages/home/ArchivedTasks.jsx"
import {ActiveTasks} from "@/components/pages/home/ActiveTasks.jsx"
import {DeletedTasks} from "@/components/pages/home/DeletedTasks.jsx"
import {EmptyResult} from "@/components/ui/EmptyResult.jsx";

export default function Home() {

    const router = useRouter()

    const [currentlyLoggedInUser] = useAtom(currentUserName)
    const [allTasks, setAllTasks] = useState([])
    const [allTasksLength, setAllTasksLength] = useState(0)
    const [archivedTasks, setAllArchivedTasks] = useState([])
    const [archivedLength, setArchivedLength] = useState(0)
    const [activeTask, setActiveTask] = useState([])
    const [activeTaskLength, setActiveTaskLength] = useState(0)
    const [deletedTasks, setDeletedTasks] = useState([])
    const [deletedTasksLength, setDeletedTasksLength] = useState(0)
    const [completedTasks, setCompletedTasks] = useState([])
    const [completedTasksLength, setCompletedTasksLength] = useState(0)

    useEffect(() => {
        if (currentlyLoggedInUser === "") {
            router.push("/auth/login")
        }
    }, [])

    useEffect(() => {
            const fetchCurrentTasks = async () => {

                const request = {
                    user: currentlyLoggedInUser,
                }

                const response = await fetch(`/api/post/tasks/fetchCompleted`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(request),
                })

                const data = await response.json()
                if (data.status) {
                    setCompletedTasks(data.result)
                } else {
                    alert("Failed to fetch the tasks")
                }
            }
            fetchCurrentTasks()

        }, [currentlyLoggedInUser]
    )

    useEffect(() => {
            const fetchCurrentTasks = async () => {

                const request = {
                    user: currentlyLoggedInUser,
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
                    setAllTasks(data.result)
                } else {
                    alert("Failed to fetch the tasks")
                }
            }
            fetchCurrentTasks()

        }, [currentlyLoggedInUser]
    )

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
                    setAllArchivedTasks(data.result)
                } else {
                    alert("Failed to fetch the tasks")
                }
            }
            fetchCurrentTasks()

        }, [currentlyLoggedInUser]
    )

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
                    setActiveTask(data.result)
                } else {
                    alert("Failed to fetch tasks")
                }
            }
            fetchCurrentTasks()

        }, [currentlyLoggedInUser]
    )

    useEffect(() => {
            const fetchCurrentTasks = async () => {

                const request = {
                    user: currentlyLoggedInUser,
                }

                const response = await fetch(`/api/post/tasks/fetchDeleted`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(request),
                })

                const data = await response.json()
                if (data.status) {
                    setDeletedTasks(data.result)
                } else {
                    alert("Failed to fetch tasks")
                }
            }
            fetchCurrentTasks()

        }, [currentlyLoggedInUser]
    )

    useEffect(() => {
        setCompletedTasksLength(completedTasks.length)
        console.log(completedTasks)
    }, [completedTasks])

    useEffect(() => {
        setDeletedTasksLength(deletedTasks.length)
    }, [deletedTasks])

    useEffect(() => {
        setActiveTaskLength(activeTask.length)
    }, [activeTask])

    useEffect(() => {
        setArchivedLength(archivedTasks.length)
    }, [archivedTasks])

    useEffect(() => {
        setAllTasksLength(allTasks.length)
    }, [allTasks])

    return (
        <div className={globals.Container}>
            <h1 className={globals.PageHeader}>Welcome Back, {currentlyLoggedInUser}</h1>
            <div className={styledHome.dashboardContainer}>
                {
                    completedTasks.length > 0 ?
                        <>
                            <TotalTasks
                                completedTasksLength={completedTasksLength}
                                allTasksLength={allTasksLength}
                            />
                        </> : <EmptyResult isHome={true} content={"Create some goals to accomplish..."}/>
                }
                {
                    archivedTasks.length > 0 ?
                        <>
                            <ArchivedTasks
                                archivedLength={archivedLength}
                                allTasksLength={allTasksLength}
                                activeTaskLength={activeTaskLength}
                            />
                        </> : <EmptyResult isHome={true} content={"Forgot to archive some tasks?"}/>
                }
                {
                    activeTask.length > 0 ?
                        <>
                            <ActiveTasks
                                allTasksLength={allTasksLength}
                                activeTaskLength={activeTaskLength}
                            />
                        </> : <EmptyResult isHome={true} content={"You forgot to create tasks."}/>
                }
                {
                    deletedTasks.length > 0 ?
                        <>
                            <DeletedTasks
                                allTasksLength={allTasksLength}
                                deletedTasksLength={deletedTasksLength}
                            />
                        </> : <EmptyResult isHome={true} content={"You haven't deleted any tasks..."}/>
                }
            </div>
        </div>
    )
}
