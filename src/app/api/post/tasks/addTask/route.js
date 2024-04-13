import {NextResponse} from "next/server"
import connect from "@/lib/connection.js"
import Task from "@/models/Task.js"

export const POST = async (request) => {
    try {
        const {user_id, title, task, date, status, archived, deleted} = await request.json()

        await connect()

        let result = await Task.create(
            {
                user_id: user_id,
                title: title,
                task: task,
                date: date,
                status: status,
                archived: archived,
                deleted: deleted,
            })

        if (result) {
            return NextResponse.json({
                message: 'Task successfully created',
                status: true,
                result: result
            })
        } else {
            return NextResponse.json({
                message: 'Failed to create a task',
                status: false,
                result: result
            })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({message: 'Error connecting to Database: ' + error, result: false})
    }
}
