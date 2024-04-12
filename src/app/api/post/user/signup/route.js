import {NextResponse} from "next/server"
import connect from "@/lib/connection.js"
import Users from "@/models/User.js";

export const POST = async (request) => {
    try {
        const {email_id, password, phone_number, user_name} = await request.json()

        await connect()

        let isEmailAlreadyExists = await Users.findOne({
            email_id: email_id,
            password: password,
            phone_number: phone_number,
            user_name: user_name,
        })

        if (isEmailAlreadyExists) {

            return NextResponse.json({
                message: 'Signup Failed',
                result: "Email already Exists",
                status: false
            })

        } else {

            await Users.create({
                email_id: email_id,
                password: password,
                phone_number: phone_number,
                user_name: user_name,
            })

            return NextResponse.json({
                message: 'Signup Successful',
                result: "User Signed-Up Successfully",
                status: true
            })

        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({message: 'Error connecting to Database: ' + error, result: false})
    }
}