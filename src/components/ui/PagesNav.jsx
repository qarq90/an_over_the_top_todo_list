import React from 'react';
import {navLinks} from "@/lib/libNav.js";
import nav from "@/styles/nav.module.css"
import {usePathname} from "next/navigation.js";

export default function PagesNav() {
    const currentPage = usePathname();

    return (
        <div className={nav.nav}>
            <ul className={nav.navUl}>
                {navLinks.map((link, index) => (
                    <a
                        className={link.path === currentPage ? nav.currentLink : nav.navLink}
                        key={index}
                        href={link.path}
                    >
                        {link.icon}
                        {link.text}
                    </a>
                ))}
            </ul>
        </div>
    )
}