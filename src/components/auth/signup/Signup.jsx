"use client";

import {useAtom} from 'jotai';
import {currentUserEmail, currentUserName, currentUserPassword, currentUserPhoneNumber} from "@/states/userState.js"
import {useRouter} from "next/navigation.js";
import {FaKey, FaMailBulk, FaPhone, FaUser} from "react-icons/fa";
import auth from "@/styles/auth/auth.module.css"

const SignUp = () => {

    const router = useRouter()

    const [email, setEmail] = useAtom(currentUserEmail)
    const [password, setPassword] = useAtom(currentUserPassword)
    const [phone, setPhone] = useAtom(currentUserPhoneNumber)
    const [username, setUsername] = useAtom(currentUserName)

    const signupHandler = async () => {

        let emailRegex = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/
        let phoneRegex = /^\d{10}$/

        if (email === "" || password === "" || phone === "" || username === "") {
            console.log("Input Fields cannot be Empty")
            return
        }

        if (!emailRegex.test(email)) {
            console.log("Invalid Email address")
            return
        }

        if (!phoneRegex.test(phone)) {
            console.log("Invalid Phone number")
            return
        }

        const request = {
            email_id: email,
            password: password,
            phone_number: phone,
            user_name: username,
        }

        try {
            const response = await fetch(`/api/post/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            })

            const data = await response.json()

            router.push("/")

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={auth.AuthContainer}>
            <label className={auth.Label}>
                <FaMailBulk/> Email
            </label>
            <input className={auth.Input}
                   type="text"
                   onChange={(e) => setEmail(e.target.value)}/>
            <label className={auth.Label}>
                <FaKey/> Password
            </label>
            <input className={auth.Input}
                   type="text"
                   onChange={(e) => setPassword(e.target.value)}/>
            <label className={auth.Label}>
                <FaPhone/> Phone Number
            </label>
            <input className={auth.Input}
                   type="text"
                   onChange={(e) => setPhone(e.target.value)}/>
            <label className={auth.Label}>
                <FaUser/> Username
            </label>
            <input className={auth.Input}
                   type="text"
                   onChange={(e) => setUsername(e.target.value)}/>
            <button className={auth.Submit} onClick={signupHandler}>Sign Up</button>
        </div>
    )
}

export default SignUp