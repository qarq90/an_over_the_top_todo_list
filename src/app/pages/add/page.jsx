"use client"

import React from 'react';
import globals from "@/styles/globals.module.css";
import AddTask from "@/components/pages/add/AddTask.jsx";
import {FaPlus} from "react-icons/fa";

export default function Add() {
    return (
        <>
            <div className={globals.Container}>
                <h1 className={globals.PageHeader}><FaPlus/> Add Task</h1>
                <div className={globals.SubContainer}>
                    <AddTask/>
                </div>
            </div>
        </>
    )
}