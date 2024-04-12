"use client"

import styledTasks from "@/styles/pages/tasks/tasks.module.css";

const HistoryCard = ({tasks}) => {

    let taskTitle = tasks.title;
    let taskDescription = tasks.task;
    const chunkSize = 75;
    const chunks = [];
    for (let i = 0; i < taskDescription.length; i += chunkSize) {
        chunks.push(taskDescription.substring(i, i + chunkSize));
    }

    taskDescription = chunks.join('\n');
    let taskDate = tasks.date.slice(0, 10);
    let isDeleted = tasks.deleted

    return (
        <>
            <div className={styledTasks.tasksContainer}>
                <div className={styledTasks.textContainer}>
                    <div className={!isDeleted ? styledTasks.alive : styledTasks.killed}>
                    </div>
                    <h1>Title: {taskTitle}</h1>
                    <h4>Task: {taskDescription}</h4>
                    <h5>Created on: {taskDate}</h5>
                </div>
            </div>
        </>
    )
}

export default HistoryCard;