import {NextResponse} from "next/server"
import connect from "@/lib/connection.js"
import User from "@/models/User.js";

export const POST = async (request) => {
    try {
        const {user_id} = await request.json()

        await connect()

        let result = await User.findOne({_id: user_id})

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
