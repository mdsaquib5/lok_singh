import Link from 'next/link';

const MediaButtons = () => {
    return (
        <div className="media-box">
            <Link href={'https://www.instagram.com/lok_singh_/'} target='_blank' className="instagram header-btn"><span>Instagram</span> <span>Instagram</span></Link>
            <Link href={'/collaborate'} className="collaborate header-btn"><span>Collaborate</span><span>Collaborate</span></Link>
        </div>
    )
}

export default MediaButtons;