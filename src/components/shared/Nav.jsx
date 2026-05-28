import Link from "next/link";

const Nav = () => {
    return (
        <div className="main-nav">
            <nav>
                <ul>
                    <li><Link href={'/'}>Home</Link></li>
                    <li><Link href={'/'}>About</Link></li>
                    <li><Link href={'/'}>Trending</Link></li>
                    <li><Link href={'/'}>Media Insights</Link></li>
                    <li><Link href={'/'}>Brands</Link></li>
                    <li><Link href={'/'}>Press Kit</Link></li>
                    <li><Link href={'/'}>Newsroom</Link></li>
                    <li className="dropdown"><Link href={'/'}>Platforms</Link>
                        <ul className="dropdown-item">
                            <li><Link href={'/'}>Live Media</Link></li>
                            <li><Link href={'/'}>Creator Network</Link></li>
                            <li><Link href={'/'}>Future Studio</Link></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Nav;