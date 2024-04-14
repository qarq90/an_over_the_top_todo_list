import styledProfile from "@/styles/pages/profile/profile.module.css"
import {FaKey, FaMailBulk, FaPhone, FaUser} from "react-icons/fa"
import {useAtom} from "jotai"
import {
    currentUserEmail,
    currentUserID,
    currentUserName,
    currentUserPassword,
    currentUserPhoneNumber
} from "@/states/userState.js"
import {Toast} from "primereact/toast"
import {emailRegex, phoneRegex, showCustomToast} from "@/lib/helper.js"
import {useEffect, useRef} from "react"
import Cookies from "js-cookie";

const Profile = () => {

    const [currentLoggedInUserID, setCurrentLoggedInUserID] = useAtom(currentUserID)

    const storageUserID = Cookies.get("storageUserID") || "";

    const [email, setEmail] = useAtom(currentUserEmail)
    const [password, setPassword] = useAtom(currentUserPassword)
    const [phone, setPhone] = useAtom(currentUserPhoneNumber)
    const [username, setUsername] = useAtom(currentUserName)
    const toastRef = useRef()

    useEffect(() => {
        const fetchCurrentTasks = async () => {

            const request = {
                user_id: storageUserID,
            }

            const response = await fetch(`/api/post/user/fetchID`, {
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

                showCustomToast(
                    "success",
                    "Success",
                    "Please enter a valid email address.",
                    "Profile Found",
                    toastRef,
                    2000
                )

            } else {
                showCustomToast(
                    "success",
                    "Success",
                    "Please enter a valid email address.",
                    "Authentication Successful",
                    toastRef,
                    2000
                )
            }
        }

        fetchCurrentTasks()

    }, [])

    const EditHandler = async () => {

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
            const response = await fetch(`/api/post/user/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            })

            const data = await response.json()

            if (data.status) {
                showCustomToast(
                    "success",
                    "Account Updated",
                    "Account Details Updated Successfully.",
                    "Account Details Updated Successfully.",
                    toastRef,
                    2000
                )
            } else {
                alert(data.message)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className={styledProfile.AuthContainer}>
                <label className={styledProfile.Label}>
                    <FaMailBulk/> Email
                </label>
                <input
                    disabled
                    className={styledProfile.Input}
                    type="text"
                    value={email}
                />
                <label className={styledProfile.Label}>
                    <FaKey/> Password
                </label>
                <input
                    className={styledProfile.Input}
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label className={styledProfile.Label}>
                    <FaPhone/> Phone Number
                </label>
                <input
                    className={styledProfile.Input}
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <label className={styledProfile.Label}>
                    <FaUser/> Username
                </label>
                <input
                    className={styledProfile.Input}
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button className={styledProfile.Submit} onClick={EditHandler}>Update</button>
                <Toast ref={toastRef} position="top-right"/>
            </div>
        </>
    )
}

export default Profile
