"use client"

import React from 'react';
import globals from "@/styles/globals.module.css";
import Profile from "@/components/pages/profile/Profile.jsx";
import {FaUser} from "react-icons/fa";

export default function ProfilePage() {
    return (
        <>
            <div className={globals.Container}>
                <h1 className={globals.PageHeader}><FaUser/> Profile</h1>
                <Profile/>
            </div>
        </>
    );
}
