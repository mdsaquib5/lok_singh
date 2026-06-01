"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import MediaButtons from "../shared/MediaButtons";
import Logo from "../shared/Logo";
import Nav from "../shared/Nav";
import { CiMenuFries } from "react-icons/ci";
import { useMediaQuery } from "react-responsive";

const Header = () => {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isMobile = useMediaQuery({ query: '(max-width: 576px)' });

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    if (pathname && pathname.startsWith('/admin')) {
        return null;
    }

    return (
        <header>
            <div className="container">
                <div className="header-container">
                    <div className="logo-wrap">
                        <Logo />
                    </div>
                    <div className="menu-wrap">
                        <Nav isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
                    </div>
                    <div className="media-wrap">
                        {(!mounted || !isMobile) && <MediaButtons />}
                        <button className='mobile-menu-btn' onClick={toggleMenu}><CiMenuFries /></button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;