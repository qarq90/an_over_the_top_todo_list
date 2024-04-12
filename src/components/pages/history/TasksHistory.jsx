import styledHistory from "@/styles/pages/history/history.module.css"

const HistoryCard = ({tasks}) => {

    let taskTitle = tasks.title

    let taskDescription = tasks.task

    const chunkSize = 75
    const chunks = []
    for (let i = 0; i < taskDescription.length; i += chunkSize) {
        chunks.push(taskDescription.substring(i, i + chunkSize))
    }

    taskDescription = chunks.join('\n')

    let taskDate = tasks.date.slice(0, 10)

    let isDeleted = tasks.deleted

    let taskStatus = tasks.status

    let isArchived = tasks.archived

    let statusClass

    if (isDeleted && taskStatus === 'pending') {
        statusClass = styledHistory.deleted
    } else if (isDeleted && taskStatus === 'completed' || !isDeleted && taskStatus === 'completed') {
        statusClass = styledHistory.completed
    } else if (isArchived) {
        statusClass = styledHistory.archived
    } else {
        statusClass = styledHistory.active
    }

    return (
        <div className={styledHistory.tasksContainer}>
            <div className={styledHistory.textContainer}>
                <div className={statusClass}></div>
                <h1>Title: {taskTitle}</h1>
                <h4>Task: {taskDescription}</h4>
                <h5>Status: {taskStatus}</h5>
                <h5>Created on: {taskDate}</h5>
            </div>
        </div>
    )
}

export default HistoryCard
