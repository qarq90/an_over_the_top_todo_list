"use client"

import {useRouter} from "next/navigation.js";
import form from "@/styles/pages/add/form.module.css"
import {FaPlus, FaQuestionCircle, FaTasks} from "react-icons/fa";
import {currentUserName} from "@/states/userState.js";
import {useAtom} from "jotai";
import {useState} from "react";

const AddTask = () => {

    const router = useRouter()

    const [currentlyLoggedInUser] = useAtom(currentUserName)

    const [taskName, setTaskName] = useState("")
    const [taskContent, setTaskContent] = useState("")

    async function addTaskHandler() {

        if (taskName === "" || taskContent === "") {
            console.log("Input Fields are required")
        }

        const taskDate = new Date()

        const request = {
            user: currentlyLoggedInUser,
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
                router.push("/pages/tasks")
            } else {
                alert("Error adding task")
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
        </div>
    )
}

export default AddTask;