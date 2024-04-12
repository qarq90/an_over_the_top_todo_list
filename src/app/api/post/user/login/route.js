import {NextResponse} from "next/server"
import connect from "@/lib/connection.js"
import Users from "@/models/User.js";

export const POST = async (request) => {
    try {
        const {email_id, password} = await request.json()

        await connect()

        let isEmailAlreadyExists = await Users.findOne({
            email_id: email_id,
            password: password
        })

        if (isEmailAlreadyExists) {
            return NextResponse.json({
                message: 'Login Successful',
                result: "User Logged-in Successful",
                status: true,
                isEmailAlreadyExists
            })
        } else {
            return NextResponse.json({
                message: 'Login Failed',
                result: "Incorrect Email and Password",
                status: false
            })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({message: 'Error connecting to Database: ' + error, result: false})
    }
}
