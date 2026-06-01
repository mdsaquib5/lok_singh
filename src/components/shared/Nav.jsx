"use client";
import Link from "next/link";
import Logo from "./Logo";
import { BsChevronDown } from "react-icons/bs";
import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import MediaButtons from "./MediaButtons";
import { useMediaQuery } from "react-responsive";

const Nav = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isMobile = useMediaQuery({ query: '(max-width: 576px)' });

    const toggleDropdown = (e) => {
        e.preventDefault();
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleMenu = () => {
        setIsMobileMenuOpen(false);
    }

    return (
        <div className={`main-nav ${isMobileMenuOpen ? 'open' : ''}`}>
            <div className="mobile-header-menu">
                <Logo />
                <button className="close-btn" onClick={toggleMenu}>
                    <RxCross2 />
                </button>
            </div>
            <nav>
                <ul>
                    <li><Link href={'/'}>Home</Link></li>
                    <li><Link href={'/#about'}>About</Link></li>
                    <li><Link href={'/#trends'}>Trending</Link></li>
                    <li><Link href={'/#insights'}>Media Insights</Link></li>
                    <li><Link href={'/'}>Press Kit</Link></li>
                    <li><Link href={'/'}>Newsroom</Link></li>
                    <li className="dropdown">
                        <Link href={'/'} onClick={toggleDropdown} className="dropdown-toggle">
                            Platforms <BsChevronDown className={isDropdownOpen ? 'rotate' : ''} />
                        </Link>
                        <ul className={`dropdown-item ${isDropdownOpen ? 'open-dropdown' : ''}`}>
                            <li><Link href={'/'}>Live Media</Link></li>
                            <li><Link href={'/'}>Creator Network</Link></li>
                            <li><Link href={'/'}>Future Studio</Link></li>
                        </ul>
                    </li>
                </ul>
            </nav>
            {mounted && isMobile && <MediaButtons />}
        </div>
    )
}

export default Nav;