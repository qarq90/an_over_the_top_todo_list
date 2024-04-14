"use client"

import globals from '@/styles/globals.module.css'
import {useRouter} from "next/navigation.js"
import {currentUserID, currentUserName} from "@/states/userState.js"
import {useAtom} from "jotai"
import {useEffect, useRef, useState} from "react"
import styledHome from "@/styles/home/home.module.css"
import {TotalTasks} from "@/components/pages/home/TotalTasks.jsx"
import {ArchivedTasks} from "@/components/pages/home/ArchivedTasks.jsx"
import {ActiveTasks} from "@/components/pages/home/ActiveTasks.jsx"
import {DeletedTasks} from "@/components/pages/home/DeletedTasks.jsx"
import {EmptyResult} from "@/components/ui/EmptyResult.jsx";
import {showCustomToast} from "@/lib/helper.js";
import {Toast} from "primereact/toast";
import PageTransition from "@/app/layouts/PageTransition.jsx";

export default function Home() {

    const router = useRouter()

    const toastRef = useRef()

    const [currentLoggedInUserID, setCurrentLoggedInUserID] = useAtom(currentUserID)
    const [currentLoggedInUserName] = useAtom(currentUserName)

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

        let storageUserID
        storageUserID = localStorage.getItem("storageUserID") || ""

        if (storageUserID === "") {

            router.push("/auth/login")

        } else {

            setCurrentLoggedInUserID(storageUserID)

            const fetchUserID = async () => {

                const request = {
                    user_id: currentLoggedInUserID,
                }

                const response = await fetch(`/api/post/user/fetchID`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(request),
                })

                const data = await response.json()

                if (data.status) {
                    showCustomToast(
                        "success",
                        "Success",
                        "Please enter a valid email address.",
                        "Authentication Successful",
                        toastRef,
                        2000
                    )

                } else {
                    showCustomToast(
                        "success",
                        "Success",
                        "Please enter a valid email address.",
                        "Authentication Successful",
                        toastRef,
                        2000
                    )
                }
            }

            fetchUserID()
        }
    }, [])

    useEffect(() => {
            const fetchCompletedTasks = async () => {

                const request = {
                    user_id: currentLoggedInUserID,
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

            fetchCompletedTasks()

        }, [currentLoggedInUserID]
    )

    useEffect(() => {
            const fetchHistory = async () => {

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
                    setAllTasks(data.result)
                } else {
                    alert("Failed to fetch the tasks")
                }
            }

            fetchHistory()

        }, [currentLoggedInUserID]
    )

    useEffect(() => {
            const fetchArchived = async () => {

                const request = {
                    user_id: currentLoggedInUserID,
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

            fetchArchived()

        }, [currentLoggedInUserID]
    )

    useEffect(() => {
            const fetchActiveTasks = async () => {

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
                    setActiveTask(data.result)
                } else {
                    alert("Failed to fetch tasks")
                }
            }

            fetchActiveTasks()

        }, [currentLoggedInUserID]
    )

    useEffect(() => {
            const fetchDeletedTasks = async () => {

                const request = {
                    user_id: currentLoggedInUserID,
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

            fetchDeletedTasks()

        }, [currentLoggedInUserID]
    )

    useEffect(() => {
        setCompletedTasksLength(completedTasks.length)
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
        <PageTransition>
            <div className={globals.Container} style={{overflowY: "hidden"}}>
                <h1 className={globals.PageHeader}>Welcome Back, {currentLoggedInUserName}</h1>
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
                <Toast ref={toastRef}/>
            </div>
        </PageTransition>
    )
}
