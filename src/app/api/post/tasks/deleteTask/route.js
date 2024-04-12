import {NextResponse} from "next/server"
import connect from "@/lib/connection.js"
import Task from "@/models/Task.js";

export const POST = async (request) => {
    try {
        const {_id} = await request.json()

        await connect()

        let res = await Task.deleteOne({_id})

        return NextResponse.json({
            message: 'Tasks Deleted Successfully.',
            status: true,
            res
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({message: 'Error connecting to Database: ' + error, result: false})
    }
}
