"use client"

import React from 'react'
import globals from "@/styles/globals.module.css"
import SignUp from "@/components/auth/signup/Signup.jsx"
import {FaUserPlus} from "react-icons/fa"

export default function ProfilePage() {
    return (
        <>
            <div className={globals.Container}>
                <h1 className={globals.PageHeader}><FaUserPlus/>SignUp</h1>
                <SignUp/>
            </div>
        </>
    )
}