"use client"

import React from 'react'
import globals from "@/styles/globals.module.css"
import Login from "@/components/auth/login/Login.jsx"
import {FaUser} from "react-icons/fa"

export default function ProfilePage() {
    return (
        <>
            <div className={globals.Container}>
                <h1 className={globals.PageHeader}><FaUser/>Login</h1>
                <Login/>
            </div>
        </>
    )
}