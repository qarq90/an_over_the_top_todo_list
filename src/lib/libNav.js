import {FaArchive, FaDoorOpen, FaHistory, FaHome, FaListAlt, FaPlus, FaUser, FaUserPlus} from "react-icons/fa"

export const authLinks = [
    {
        icon: <FaUser/>,
        path: "/auth/login",
        text: "Login",
    },
    {
        icon: <FaUserPlus/>,
        path: "/auth/signup",
        text: "SignUp",
    },
]

export const pagesTopLinks = [
    {
        icon: <FaHome/>,
        path: "/",
        text: "Home",
    },
    {
        icon: <FaPlus/>,
        path: "/pages/add",
        text: "Add Task",
    },
    {
        icon: <FaListAlt/>,
        path: "/pages/tasks",
        text: "Your Tasks",
    },
    {
        icon: <FaArchive/>,
        path: "/pages/archived",
        text: "Archived",
    },
    {
        icon: <FaHistory/>,
        path: "/pages/history",
        text: "History",
    },
]

export const pagesBottomLinks = [
    {
        icon: <FaUser/>,
        path: "/pages/profile",
        text: "Profile",
    },
    {
        icon: <FaDoorOpen/>,
        path: "/auth/login",
        text: "Log Out",
    },
]