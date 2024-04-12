import {NextResponse} from "next/server"
import connect from "@/lib/connection.js"
import Task from "@/models/Task.js";

export const POST = async (request) => {
    try {
        const {user, status} = await request.json()

        await connect()

        let result = await Task.find({
            user: user,
            status: status,
            archived: false,
            deleted: false
        })

        if (result) {
            return NextResponse.json({
                message: 'Tasks Fetched Successfully.',
                status: true,
                result: result
            })
        } else {
            return NextResponse.json({
                message: 'Failed to fetch tasks.',
                status: false,
                result: result
            })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({message: 'Error connecting to Database: ' + error, result: false})
    }
}