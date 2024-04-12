"use client"

import React from "react"
import styledTasks from "@/styles/pages/tasks/tasks.module.css"
import {FaArchive, FaCheckSquare, FaEdit, FaTrash} from "react-icons/fa"
import {useRouter} from "next/navigation.js"

export const TaskCard = ({tasks}) => {

    const router = useRouter()

    let taskTitle = tasks.title
    let taskDescription = tasks.task

    const chunkSize = 75
    const chunks = []
    for (let i = 0; i < taskDescription.length; i += chunkSize) {
        chunks.push(taskDescription.substring(i, i + chunkSize))
    }

    taskDescription = chunks.join('\n')

    let taskDate = tasks.date.slice(0, 10)
    let taskStatus = tasks.status

    const taskID = tasks._id

    const request = {
        _id: taskID,
    }
    const deleteTaskHandler = async () => {

        try {
            const response = await fetch(`/api/post/tasks/deleteTask`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            })

            const data = await response.json()

            if (data.status) {
                router.push("/pages/history")
            } else {
                alert(data.message)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const archiveTaskHandler = async () => {

        try {
            const response = await fetch(`/api/post/archived/archiveTask`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            })

            const data = await response.json()

            if (data.status) {
                router.push("/pages/archived")
            } else {
                alert(data.message)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const editTaskHandler = () => {
        router.push("/pages/edit?taskId=" + taskID)
    }

    const checkTaskHandler = async () => {
        try {
            const response = await fetch(`/api/post/tasks/checkTask`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            })

            const data = await response.json()

            if (data.status) {
                router.push("/pages/history")
            } else {
                alert(data.message)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className={styledTasks.tasksContainer}>
                <div className={styledTasks.textContainer}>
                    <h1>Title: {taskTitle}</h1>
                    <h4>Task: {taskDescription}</h4>
                    <h4>Status: {taskStatus}</h4>
                    <h5>Created on: {taskDate}</h5>
                </div>
                <div className={styledTasks.buttonContainer}>
                    <button onClick={checkTaskHandler}><FaCheckSquare/></button>
                    <button onClick={archiveTaskHandler}><FaArchive/></button>
                    <button onClick={editTaskHandler}><FaEdit/></button>
                    <button onClick={deleteTaskHandler}><FaTrash/></button>
                </div>
            </div>
        </>
    )
}
