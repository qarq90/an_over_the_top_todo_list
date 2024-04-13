"use client"

import {useRouter} from "next/navigation.js"
import {useEffect, useState} from "react"
import globals from "@/styles/globals.module.css"
import {FaPen, FaPenAlt, FaQuestionCircle, FaTasks} from "react-icons/fa"
import form from "@/styles/pages/add/form.module.css"
import PageTransition from "@/app/layouts/PageTransition.jsx";

export default function EditPage() {
    const router = useRouter()
    const [taskId, setTaskId] = useState("")
    const [taskTitle, setTaskTitle] = useState("")
    const [taskDescription, setTaskDescription] = useState("")

    useEffect(() => {
        const fetchTaskData = async () => {
            try {
                const searchParams = new URLSearchParams(window.location.search)
                const id = searchParams.get("taskId")
                setTaskId(id)
                console.log(id)

                const response = await fetch(`/api/post/tasks/fetchTaskToEdit`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({_id: id}),
                })

                const data = await response.json()
                if (data.status) {
                    setTaskTitle(data.result.title)
                    setTaskDescription(data.result.task)
                } else {
                    alert("Failed to fetch task data")
                }
            } catch (error) {
                console.error("Error fetching task data:", error)
            }
        }

        fetchTaskData()
    }, [])

    const updateTaskHandler = async () => {

        if (taskTitle === "" || taskDescription === "") {
            console.log("Input Fields are required")
            return
        }

        try {

            const response = await fetch(`/api/post/tasks/editTask`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({_id: taskId, title: taskTitle, task: taskDescription}),
            })

            const data = await response.json()

            if (data.status) {
                router.push("/pages/tasks")
            } else {
                alert("Error updating task")
            }

        } catch (error) {
            console.error("Error updating task:", error)
        }
    }

    return (
        <PageTransition>
            <div className={globals.Container}>
                <h1 className={globals.PageHeader}>
                    <FaPen/> Edit
                </h1>
                <div className={form.AuthContainer}>
                    <label className={form.Label}>
                        <FaQuestionCircle/> Task Name
                    </label>
                    <input
                        className={form.Input}
                        type="text"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                    />
                    <label className={form.Label}>
                        <FaTasks/> Task
                    </label>
                    <textarea
                        className={form.Textarea}
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                    />
                    <button className={form.Submit} onClick={updateTaskHandler}>
                        <FaPenAlt/> Update Task
                    </button>
                </div>
            </div>
        </PageTransition>
    )
}
