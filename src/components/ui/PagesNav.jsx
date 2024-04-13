import React from 'react'
import {pagesBottomLinks, pagesTopLinks} from "@/lib/libNav.js"
import nav from "@/styles/ui/nav.module.css"
import {usePathname} from "next/navigation.js"
import Link from "next/link"
import {useAtom} from "jotai"
import {currentUserEmail, currentUserName, currentUserPassword, currentUserPhoneNumber} from "@/states/userState.js"

export default function PagesNav() {

    const currentPage = usePathname()

    const [email, setEmail] = useAtom(currentUserEmail)
    const [password, setPassword] = useAtom(currentUserPassword)
    const [phone, setPhone] = useAtom(currentUserPhoneNumber)
    const [username, setUsername] = useAtom(currentUserName)

    function logoutHandler() {
        setEmail("")
        setPassword("")
        setUsername("")
        setPhone("")
    }

    return (
        <div className={nav.nav}>
            <ul className={nav.navUl}>
                {
                    pagesTopLinks.map((link, index) => (
                        <Link
                            className={link.path === currentPage ? nav.currentLink : nav.navLink}
                            key={index}
                            href={link.path}
                        >
                            {link.icon}
                            {link.text}
                        </Link>
                    ))
                }
            </ul>
            <ul className={nav.navUl}>
                {
                    pagesBottomLinks.map((link, index) => (
                        <Link
                            className={link.path === currentPage ? nav.currentLink : nav.navLink}
                            key={index}
                            href={link.path}
                            onClick={link.path === "/auth/login" ? logoutHandler : undefined}
                        >
                            {link.icon}
                            {link.text}
                        </Link>
                    ))
                }
            </ul>
        </div>
    )
}