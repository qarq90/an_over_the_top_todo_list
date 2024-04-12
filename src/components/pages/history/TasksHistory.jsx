"use client"

import {useAtom} from "jotai";
import {currentUserName} from "@/states/userState.js";
import {useRouter} from "next/navigation.js";
import styledTasks from "@/styles/pages/tasks/tasks.module.css";

const HistoryCard = ({tasks}) => {

    const router = useRouter();

    const [currentlyLoggedInUser] = useAtom(currentUserName)

    if (currentlyLoggedInUser === "") {
        router.push("/auth/login");
    }

    let taskTitle = tasks.title;
    let taskDescription = tasks.task;
    const chunkSize = 75;
    const chunks = [];
    for (let i = 0; i < taskDescription.length; i += chunkSize) {
        chunks.push(taskDescription.substring(i, i + chunkSize));
    }

    taskDescription = chunks.join('\n');
    let taskDate = tasks.date.slice(0, 10);

    return (
        <>
            <div className={styledTasks.tasksContainer}>
                <div className={styledTasks.textContainer}>
                    <h1>Title: {taskTitle}</h1>
                    <h4>Task: {taskDescription}</h4>
                    <h5>Created on: {taskDate}</h5>
                </div>
            </div>
        </>
    )
}

export default HistoryCard;