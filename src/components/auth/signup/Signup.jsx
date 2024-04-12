"use client"

import {useAtom} from 'jotai'
import {currentUserEmail, currentUserName, currentUserPassword, currentUserPhoneNumber} from "@/states/userState.js"
import {useRouter} from "next/navigation.js"
import {FaKey, FaMailBulk, FaPhone, FaUser} from "react-icons/fa"
import auth from "@/styles/auth/auth.module.css"
import {useRef} from "react"
import {Toast} from "primereact/toast"
import {emailRegex, phoneRegex, showCustomToast} from "@/lib/helper.js"

const SignUp = () => {

    const router = useRouter()

    const [email, setEmail] = useAtom(currentUserEmail)
    const [password, setPassword] = useAtom(currentUserPassword)
    const [phone, setPhone] = useAtom(currentUserPhoneNumber)
    const [username, setUsername] = useAtom(currentUserName)
    const toastRef = useRef()

    const signupHandler = async () => {

        if (email === "" || password === "" || phone === "" || username === "") {
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

        if (!phoneRegex.test(phone)) {
            showCustomToast(
                "error",
                "Invalid Phone Number Format",
                "Please enter a valid phone number.",
                "A Valid Phone Number contains 10 digits",
                toastRef,
                2000
            )
            return
        }

        const request = {
            email_id: email,
            password: password,
            phone_number: phone,
            user_name: username,
        }

        try {
            const response = await fetch(`/api/post/user/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            })

            const data = await response.json()

            if (data.status) {
                router.push("/")
            } else {
                showCustomToast(
                    "error",
                    "Account Exists",
                    "You already have an account with this email address.",
                    "You already have an account with this email address.",
                    toastRef,
                    2000
                )
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
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
                <Toast ref={toastRef} position="top-right"/>
            </div>
        </>
    )
}

export default SignUp