"use client"

import {useRouter} from "next/navigation.js";
import {useAtom} from 'jotai';
import {currentUserEmail, currentUserName, currentUserPassword, currentUserPhoneNumber} from "@/states/userState.js";
import {FaKey, FaMailBulk} from "react-icons/fa";
import auth from "@/styles/auth/auth.module.css"

const Login = () => {

    const router = useRouter()

    const [email, setEmail] = useAtom(currentUserEmail)
    const [password, setPassword] = useAtom(currentUserPassword)
    const [phone, setPhone] = useAtom(currentUserPhoneNumber)
    const [username, setUsername] = useAtom(currentUserName)

    const loginHandler = async () => {

        let emailRegex = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/

        if (email === "" || password === "") {
            alert("Input Fields cannot be Empty")
            return
        }

        if (!emailRegex.test(email)) {
            alert("Invalid Email address")
            return
        }

        const request = {
            email_id: email,
            password: password,
        }

        try {

            const response = await fetch(`/api/post/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            })

            const data = await response.json()

            if (data.status) {
                setEmail(data.result.email_id)
                setPassword(data.result.password)
                setPhone(data.result.phone_number)
                setUsername(data.result.user_name)
                router.push("/")
            } else {
                alert("Incorrect email or password")
            }

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
            <button className={auth.Submit} onClick={loginHandler}>Login</button>
        </div>
    )
}

export default Login;