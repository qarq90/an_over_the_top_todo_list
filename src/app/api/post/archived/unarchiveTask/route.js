import {NextResponse} from "next/server"
import connect from "@/lib/connection.js"
import Task from "@/models/Task.js"

export const POST = async (request) => {
    try {
        const {_id} = await request.json()

        await connect()

        let result = await Task.updateOne(
            {
                _id: _id,
            }, {
                archived: false,
            })

        if (result) {
            return NextResponse.json({
                message: 'Task Unarchived successfully.',
                status: true,
                result: result
            })
        } else {
            return NextResponse.json({
                message: 'Failed to unarchive the task',
                status: false,
                result: result
            })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({message: 'Error connecting to Database: ' + error, result: false})
    }
}
