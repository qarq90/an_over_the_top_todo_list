import {NextResponse} from "next/server"
import connect from "@/lib/connection.js"
import Task from "@/models/Task.js"

export const POST = async (request) => {
    try {
        const {_id} = await request.json()

        await connect()

        let result = await Task.updateOne({
            _id
        }, {
            deleted: true,
        })

        if (result) {
            return NextResponse.json({
                message: 'Tasks Deleted Successfully.',
                status: true,
                result: result
            })
        } else {
            return NextResponse.json({
                message: 'Failed to delete',
                status: false,
                result: result
            })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({message: 'Error connecting to Database: ' + error, result: false})
    }
}
