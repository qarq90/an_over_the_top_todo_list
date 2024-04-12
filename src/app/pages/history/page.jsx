"use client"

import React, {useEffect, useState} from 'react';
import globals from "@/styles/globals.module.css";
import {FaHistory} from "react-icons/fa";
import {useAtom} from "jotai";
import {currentUserName} from "@/states/userState.js";
import {useRouter} from "next/navigation.js";
import HistoryCard from "@/components/pages/history/TasksHistory.jsx";

export default function HistoryPage() {

    const router = useRouter()

    const [currentlyLoggedInUser] = useAtom(currentUserName)

    useEffect(() => {
        if (currentlyLoggedInUser === "") {
            router.push("/auth/login");
        }
    }, []);

    const [tasks, setTasks] = useState([]);

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
                    setTasks(data.result)
                } else {
                    alert("Failed to fetch the tasks")
                }
            }
            fetchCurrentTasks()

        }, [currentlyLoggedInUser]
    )

    useEffect(() => {
        console.log(tasks);
    }, [tasks]);

    return (
        <>
            <div className={globals.Container}>
                <h1 className={globals.PageHeader}><FaHistory/> History</h1>
                {
                    tasks.length === 0 ? <></> :
                        <>
                            {
                                tasks.map((task) => (
                                    <div key={task.id}>
                                        <HistoryCard tasks={task}/>
                                    </div>
                                ))
                            }
                        </>
                }
            </div>
        </>
    );
}