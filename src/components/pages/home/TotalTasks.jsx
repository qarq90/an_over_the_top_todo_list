import styledHome from "@/styles/home/home.module.css"
export const TotalTasks = ({allTasksLength}) => {
    return (
        <div className={styledHome.container}>
            <h1>Total Number of Tasks Created : {allTasksLength}</h1>
        </div>
    )
}