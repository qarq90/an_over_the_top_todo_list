"use client"

import {useRouter} from "next/navigation.js"
import {useEffect, useRef, useState} from "react"
import globals from "@/styles/globals.module.css"
import {FaPen, FaPenAlt, FaQuestionCircle, FaTasks} from "react-icons/fa"
import form from "@/styles/pages/add/form.module.css"
import PageTransition from "@/app/layouts/PageTransition.jsx";
import {Toast} from "primereact/toast";
import {showCustomToast} from "@/lib/helper.js";

export default function EditPage() {

    const router = useRouter()

    const [taskId, setTaskId] = useState("")
    const [taskTitle, setTaskTitle] = useState("")
    const [taskDescription, setTaskDescription] = useState("")

    const toastRef = useRef()

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
                    showCustomToast(
                        "error",
                        "Error Fetching Task",
                        "Something went wrong, could not Fetch tasks.",
                        "Something went wrong, could not Fetch tasks.",
                        toastRef,
                        2000
                    )
                }
            } catch (error) {
                console.error("Error fetching task data:", error)
            }
        }

        fetchTaskData()
    }, [])

    const updateTaskHandler = async () => {

        if (taskTitle === "" || taskDescription === "") {
            showCustomToast(
                "error",
                "Empty Fields",
                "Please fill in all required fields.",
                "Please fill in all required fields.",
                toastRef,
                2000
            )
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
                showCustomToast(
                    "error",
                    "Error Updating Task",
                    "Something went wrong, could not Update tasks.",
                    "Something went wrong, could not Update tasks.",
                    toastRef,
                    2000
                )
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
                <Toast ref={toastRef} position="top-right"/>
            </div>
        </PageTransition>
    )
}
