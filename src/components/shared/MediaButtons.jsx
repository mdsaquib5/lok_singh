import Link from 'next/link';

const MediaButtons = () => {
    return (
        <div className="media-box">
            <Link href={'/'} className="instagram header-btn"><span>Instagram</span> <span>Instagram</span></Link>
            <Link href={'/'} className="collaborate header-btn"><span>Collaborate</span><span>Collaborate</span></Link>
        </div>
    )
}

export default MediaButtons;