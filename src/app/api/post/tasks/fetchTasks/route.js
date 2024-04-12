import {NextResponse} from "next/server"
import connect from "@/lib/connection.js"
import Task from "@/models/Task.js";

export const POST = async (request) => {
    try {
        const {user, status} = await request.json()

        await connect()

        let usersTasks = await Task.find({
            user: user,
            status: status,
            archived: false
        })

        return NextResponse.json({
            message: 'Tasks Fetched Successfully.',
            result: true,
            usersTasks
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({message: 'Error connecting to Database: ' + error, result: false})
    }
}
