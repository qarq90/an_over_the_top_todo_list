import styledProfile from "@/styles/pages/profile/profile.module.css"
import {FaKey, FaMailBulk, FaPhone, FaUser} from "react-icons/fa";
import {useAtom} from "jotai";
import {currentUserEmail, currentUserName, currentUserPassword, currentUserPhoneNumber} from "@/states/userState.js";
import {useRouter} from "next/navigation.js";

const Profile = () => {
    const router = useRouter();
    const [currentlyLoggedInUser] = useAtom(currentUserName);

    const [email, setEmail] = useAtom(currentUserEmail);
    const [password, setPassword] = useAtom(currentUserPassword);
    const [phone, setPhone] = useAtom(currentUserPhoneNumber);
    const [username, setUsername] = useAtom(currentUserName);

    if (currentlyLoggedInUser === "") {
        router.push("/auth/login");
    }

    const EditHandler = async () => {
        let emailRegex = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/
        let phoneRegex = /^\d{10}$/

        if (email === "" || password === "" || phone === "" || username === "") {
            console.log("StyledInput Fields cannot be Empty")
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
            const response = await fetch(`/api/post/user/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            })

            const data = await response.json()

            if (data.status) {
                alert(data.message)
            } else {
                alert(data.message)
            }

        } catch (error) {
            console.log(error)
        }
    };

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
            </div>
        </>
    )
}

export default Profile;
