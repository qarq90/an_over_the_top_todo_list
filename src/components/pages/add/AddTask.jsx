"use client"

import {useRouter} from "next/navigation.js"
import form from "@/styles/pages/add/form.module.css"
import {FaPlus, FaQuestionCircle, FaTasks} from "react-icons/fa"
import {currentUserID} from "@/states/userState.js"
import {useAtom, useAtomValue} from "jotai"
import {useEffect, useRef, useState} from "react"
import {showCustomToast} from "@/lib/helper.js"
import {Toast} from "primereact/toast"

const AddTask = () => {

    const router = useRouter()

    const [currentLoggedInUserID,setCurrentLoggedInUserID] = useAtom(currentUserID)

    const [taskName, setTaskName] = useState("")
    const [taskContent, setTaskContent] = useState("")

    const toastRef = useRef()

    async function addTaskHandler() {

        if (taskName === "" || taskContent === "") {
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

        const taskDate = new Date()

        const request = {
            user_id: currentLoggedInUserID,
            title: taskName,
            task: taskContent,
            date: taskDate,
            status: "pending",
            archived: false,
            deleted: false,
        }

        try {

            const response = await fetch(`/api/post/tasks/addTask`, {
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
                    "Task Added",
                    "Task Added Successfully",
                    "Task Added Successfully",
                    toastRef,
                    2000
                )
                router.push("/pages/tasks")

            } else {
                showCustomToast(
                    "error",
                    "Error Adding Task",
                    "Something went wrong, could not add tasks.",
                    "Something went wrong, could not add tasks.",
                    toastRef,
                    2000
                )
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={form.AuthContainer}>
            <label className={form.Label}>
                <FaQuestionCircle/> Task Name
            </label>
            <input className={form.Input}
                   type="text"
                   onChange={(e) => setTaskName(e.target.value)}/>
            <label className={form.Label}>
                <FaTasks/> Task
            </label>
            <textarea className={form.Textarea}
                      onChange={(e) => setTaskContent(e.target.value)}
            />
            <button className={form.Submit} onClick={addTaskHandler}><FaPlus/> Add Task</button>
            <Toast ref={toastRef} position="top-right"/>
        </div>
    )
}

export default AddTask