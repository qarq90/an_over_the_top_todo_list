"use client"

import {useRouter} from "next/navigation.js";
import form from "@/styles/pages/form.module.css"
import {FaPlus, FaQuestionCircle, FaTasks} from "react-icons/fa";
import {currentUserName} from "@/states/userState.js";
import {useAtom, useAtomValue} from "jotai";
import {useEffect, useState} from "react";

const AddTask = () => {
    const router = useRouter()

    const [taskName, setTaskName] = useState("")
    const [taskContent, setTaskContent] = useState("")

    let userName = useAtomValue(currentUserName)

    async function addTaskHandler() {

        if (taskName === "" || taskContent === "") {
            console.log("Input Fields are required")
        }

        const taskDate = new Date()

        const request = {
            user: userName,
            title: taskName,
            task: taskContent,
            date: taskDate,
            status: "pending",
        }

        try {
            const response = await fetch(`/api/post/addTask`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            })

            const data = await response.json()

            console.log(data.message)
            router.push("/")
        } catch (error) {
            console.log(error)
        }
    }

    const [userN] = useAtom(currentUserName)

    useEffect(() => {
        console.log(userN)
    }, []);

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