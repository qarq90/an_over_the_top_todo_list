import {NextResponse} from "next/server"
import connect from "@/lib/connection.js"
import Task from "@/models/Task.js"

export const POST = async (request) => {
    try {
        const {_id, title, task} = await request.json()

        await connect()

        let result = await Task.updateOne(
            {
                _id: _id,
            }, {
                title: title,
                task: task,
            }
        )

        if (result) {
            return NextResponse.json({
                message: 'Task Updated Successfully',
                status: true,
                result: result
            })
        } else {
            return NextResponse.json({
                message: 'Task to update Account',
                status: false,
                result: result
            })
        }

    } catch
        (error) {
        console.log(error)
        return NextResponse.json({message: 'Error connecting to Database: ' + error, result: false})
    }
}