import Link from 'next/link';
import { FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-content">
                    <div className="footer-left">
                        <p className="copyright">© 2026 Lokbhadra Singh. All rights reserved.</p>
                        <p className="developer">Developed by <Link href="https://NoohArk.com" target="_blank">NoohArk.com</Link></p>
                    </div>
                    <div className="footer-right">
                        <div className="social-links">
                            <Link href="#" className="social-icon"><FaYoutube /></Link>
                            <Link href="#" className="social-icon"><FaInstagram /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;