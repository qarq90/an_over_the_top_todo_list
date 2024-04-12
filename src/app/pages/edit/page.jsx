"use client";

import {useRouter, useSearchParams} from "next/navigation.js";
import {useEffect, useState} from "react";
import globals from "@/styles/globals.module.css";
import {FaPencil} from "react-icons/fa6";
import form from "@/styles/pages/add/form.module.css";
import {FaPenAlt, FaQuestionCircle, FaTasks} from "react-icons/fa";

export default function EditPage() {

    const router = useRouter();

    const searchParams = useSearchParams();
    const [taskId, setTaskId] = useState("");

    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    useEffect(() => {
        const taskID = searchParams.get("taskId");
        setTaskId(taskID);
        console.log(taskId)
    }, [searchParams, taskId]);

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            const fetchCurrentTasks = async () => {
                const request = {
                    _id: taskId,
                };

                const response = await fetch(`/api/post/tasks/fetchTaskToEdit`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(request),
                });

                const data = await response.json();
                if (data.status) {
                    setTaskTitle(data.result.title);
                    setTaskDescription(data.result.task);
                } else {
                    alert("Failed to update tasks");
                }
            };
            fetchCurrentTasks();
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [taskId]);

    const updateTaskTitle = async () => {

        if (taskTitle === "" || taskDescription === "") {
            console.log("Input Fields are required")
        }

        const request = {
            _id: taskId,
            title: taskTitle,
            task: taskDescription,
        }

        try {

            const response = await fetch(`/api/post/tasks/editTask`, {
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
                alert("Error Updating task")
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className={globals.Container}>
                <h1 className={globals.PageHeader}>
                    <FaPencil/> Edit
                </h1>
                <div className={form.AuthContainer}>
                    <label className={form.Label}>
                        <FaQuestionCircle/> Task Name
                    </label>
                    <input className={form.Input}
                           type="text"
                           value={taskTitle}
                           onChange={(e) => setTaskTitle(e.target.value)}/>
                    <label className={form.Label}>
                        <FaTasks/> Task
                    </label>
                    <textarea className={form.Textarea}
                              value={taskDescription}
                              onChange={(e) => setTaskDescription(e.target.value)}
                    />
                    <button className={form.Submit} onClick={updateTaskTitle}><FaPenAlt/> Update Task</button>
                </div>
            </div>
        </>
    );
}
