"use client"

import {useRouter} from "next/navigation.js";
import {FaArchive} from "react-icons/fa";
import styledTasks from "@/styles/pages/tasks/tasks.module.css";

const ArchivedTasks = ({tasks}) => {

    const router = useRouter();

    let taskTitle = tasks.title;
    let taskDescription = tasks.task;

    const chunkSize = 75;
    const chunks = [];
    for (let i = 0; i < taskDescription.length; i += chunkSize) {
        chunks.push(taskDescription.substring(i, i + chunkSize));
    }

    taskDescription = chunks.join('\n');

    let taskDate = tasks.date.slice(0, 10);
    let taskStatus = tasks.status;

    const taskID = tasks._id;

    const request = {
        _id: taskID,
    }

    async function unarchiveTask() {

        try {

            const response = await fetch(`/api/post/archived/unarchiveTask`, {
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
                alert("Error archiving task")
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styledTasks.tasksContainer}>
            <div className={styledTasks.textContainer}>
                <h1>Title: {taskTitle}</h1>
                <h4>Task: {taskDescription}</h4>
                <h4>Status: {taskStatus}</h4>
                <h5>Created on: {taskDate}</h5>
            </div>
            <div className={styledTasks.buttonContainer}>
                <button onClick={unarchiveTask}><FaArchive/></button>
            </div>
        </div>
    )
}

export default ArchivedTasks;