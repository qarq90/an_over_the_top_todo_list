import React from 'react'
import {authLinks} from "@/lib/libNav.js"
import nav from "@/styles/ui/nav.module.css"
import {usePathname} from "next/navigation.js"
import Link from "next/link"

export default function AuthNav() {
    const currentPage = usePathname()

    return (
        <div className={nav.nav}>
            <ul className={nav.navUl}>
                {authLinks.map((link, index) => (
                    <Link
                        className={link.path === currentPage ? nav.currentLink : nav.navLink}
                        key={index}
                        href={link.path}
                    >
                        {link.icon}
                        {link.text}
                    </Link>
                ))}
            </ul>
        </div>
    )
}