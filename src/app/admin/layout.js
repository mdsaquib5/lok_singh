import Link from 'next/link';
import { FiGrid, FiFileText, FiUsers, FiExternalLink } from 'react-icons/fi';
import Logo from '../../components/shared/Logo';

export const metadata = {
  title: 'Admin Dashboard - Lok Portfolio',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({ children }) {
  return (
    <>
      <div className="topbar">
        <div className='container'>
          <div className='header-part'>
            <Logo />
            <nav className="topbarNav">
              <Link href="/admin" className="topbarIcon" title="Dashboard">
                <FiGrid />
              </Link>
              <Link href="/admin/blogs" className="topbarIcon" title="Blogs">
                <FiFileText />
              </Link>
              <Link href="/admin/leads" className="topbarIcon" title="Leads">
                <FiUsers />
              </Link>
              <Link href="/" className="topbarIcon" title="Return to Site">
                <FiExternalLink />
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className='dashboard-bg'>
        <div className='container'>
          {children}
        </div>
      </div>
    </>
  );
}
