import auth from "@/styles/auth/auth.module.css";
import {FaKey, FaMailBulk, FaPhone, FaUser} from "react-icons/fa";

export const Profile = () => {
    return (<>
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
        </>)
}