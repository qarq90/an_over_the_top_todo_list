import styledHome from "@/styles/home/home.module.css"
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js"
import {Doughnut} from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)
export const DeletedTasks = ({allTasksLength, deletedTasksLength}) => {

    const data = {
        labels: ['Total Tasks', 'Deleted Tasks'],
        datasets: [
            {
                label: '# of Tasks',
                data: [allTasksLength - deletedTasksLength, deletedTasksLength],
                backgroundColor: [
                    'rgba(133, 96, 136, 0.65)',
                    'rgba(86, 60, 92, 0.65)',
                ],
                borderColor: [
                    'rgba(133, 96, 136, 1)',
                    'rgba(86, 60, 92, 1)',
                ],
                borderWidth: 2,
            },
        ],
    }

    return (
        <div className={styledHome.container}>
            <h1>Deleted Tasks : {deletedTasksLength}/{allTasksLength}</h1>
            <Doughnut data={data}/>
        </div>
    )
}