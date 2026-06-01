import Image from "next/image";
import Link from "next/link";

const MediaCard = ({ item }) => {
    return (
        <div className="media-card">
            <div className="media-image">
                <Link href={item.link || '/'}><Image src={item.image} alt={item.alt || "post-bg"} width={item.width} height={item.height} priority /></Link>
            </div>
            <div className="media-content">
                <Link href={item.link || '/'} className="media-title">{item.title}</Link>
                <p>{item.description}</p>
                <div className="date-author">
                    <div className="author">
                        <Image src={item.authorImage || '/hero-img-3.jpg'} alt={'Profile'} width={256} height={314} priority />
                        <span className="writer">{item.authorName || 'Lokbhadra Singh'}</span>
                    </div>
                    <span className="date-text">{item.date}</span>
                </div>
            </div>
        </div>
    )
}

export default MediaCard;