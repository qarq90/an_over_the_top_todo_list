"use client"

import globals from '@/styles/globals.module.css'
import {useRouter} from "next/navigation.js";
import {currentUserName} from "@/states/userState.js";
import {useAtom} from "jotai";
import {useEffect, useState} from "react";
import styledHome from "@/styles/home/home.module.css"
import {TotalTasks} from "@/components/pages/home/TotalTasks.jsx";
import {ArchivedTasks} from "@/components/pages/home/ArchivedTasks.jsx";
import {ActiveTasks} from "@/components/pages/home/ActiveTasks.jsx";
import {DeletedTasks} from "@/components/pages/home/DeletedTasks.jsx";

export default function Home() {

    const router = useRouter()

    const [currentlyLoggedInUser] = useAtom(currentUserName)
    const [allTasks, setAllTasks] = useState([]);
    const [allTasksLength, setAllTasksLength] = useState(0);
    const [archivedTasks, setAllArchivedTasks] = useState([]);
    const [archivedLength, setArchivedLength] = useState(0);
    const [activeTask, setActiveTask] = useState([]);
    const [activeTaskLength, setActiveTaskLength] = useState(0);
    const [deletedTasks, setDeletedTasks] = useState([]);
    const [deletedTasksLength, setDeletedTasksLength] = useState(0);

    useEffect(() => {
        if (currentlyLoggedInUser === "") {
            router.push("/auth/login");
        }
    }, []);

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
        setDeletedTasksLength(deletedTasks.length)
    }, [deletedTasks]);

    useEffect(() => {
        setActiveTaskLength(activeTask.length)
    }, [activeTask]);

    useEffect(() => {
        setArchivedLength(archivedTasks.length)
    }, [archivedTasks]);

    useEffect(() => {
        setAllTasksLength(allTasks.length)
    }, [allTasks]);

    return (
        <div className={globals.Container}>
            <h1 className={globals.PageHeader}>Welcome Back, {currentlyLoggedInUser}</h1>
            <div className={styledHome.dashboardContainer}>
                <TotalTasks allTasksLength={allTasksLength}/>
                <ArchivedTasks archivedLength={archivedLength} allTasksLength={allTasksLength}
                               activeTaskLength={activeTaskLength}/>
                <ActiveTasks allTasksLength={allTasksLength} activeTaskLength={activeTaskLength}/>
                <DeletedTasks allTasksLength={allTasksLength} deletedTasksLength={deletedTasksLength}/>
            </div>
        </div>
    );
}
