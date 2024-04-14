"use client"

import {useRouter} from "next/navigation.js"
import {useAtom, useAtomValue} from 'jotai'
import {
    currentUserEmail,
    currentUserID,
    currentUserName,
    currentUserPassword,
    currentUserPhoneNumber
} from "@/states/userState.js"
import {FaKey, FaMailBulk} from "react-icons/fa"
import auth from "@/styles/auth/auth.module.css"
import {showCustomToast} from "@/lib/helper.js"
import {Toast} from "primereact/toast"
import {useRef} from "react"

const Login = () => {

    let storageUserID
    storageUserID = localStorage.getItem("storageUserID") || ""

    const router = useRouter()

    const [email, setEmail] = useAtom(currentUserEmail)
    const [password, setPassword] = useAtom(currentUserPassword)
    const [phone, setPhone] = useAtom(currentUserPhoneNumber)
    const [username, setUsername] = useAtom(currentUserName)
    const [currentLoggedInUserID, setCurrentLoggedInUserID] = useAtom(currentUserID)
    const toastRef = useRef()
    let id = useAtomValue(currentUserID)

    const loginHandler = async (e) => {

        let emailRegex = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/

        if (email === "" || password === "") {
            showCustomToast(
                "error",
                "Empty Fields",
                "Please fill in all required fields.",
                "Please fill in all required fields.",
                toastRef,
                2000
            )
            return
        }

        if (!emailRegex.test(email)) {
            showCustomToast(
                "error",
                "Invalid Email Format",
                "Please enter a valid email address.",
                "Valid email address format is yourname@example.com.",
                toastRef,
                2000
            )
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
                setCurrentLoggedInUserID(data.result._id)

                e.preventDefault()
                localStorage.setItem("storageUserID", data.result._id)

                router.push("/")

            } else {
                showCustomToast(
                    "error",
                    "Incorrect Credentials",
                    "Email and Password are Incorrect.",
                    "Email and Password are Incorrect.",
                    toastRef,
                    2000
                )
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
                   type="password"
                   onChange={(e) => setPassword(e.target.value)}/>
            <button className={auth.Submit} onClick={loginHandler}>Login</button>
            <Toast ref={toastRef} position="top-right"/>
        </div>
    )
}

export default Login