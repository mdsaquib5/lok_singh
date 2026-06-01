import MediaCard from "../shared/MediaCard";

const mediaData = [
    {
        title: "Voices from the Ground: The Unseen Impact of the Urban Housing Crisis",
        description: "An in-depth ground report exposing the realities of displacement in rapidly gentrifying neighborhoods, featuring exclusive interviews with affected families and local policy makers.",
        image: "/post/post-1.jpg",
        date: "12 September, 2026",
        link: "/",
        width: 640,
        height: 984,
    },
    {
        title: "Following the Money: Uncovering Corporate Loopholes in Environmental Policies",
        description: "A comprehensive investigative piece detailing how major corporations are bypassing new emission standards, based on months of analyzing public records and whistleblower testimony.",
        image: "/post/post-2.jpg",
        date: "05 October, 2026",
        link: "/",
        width: 640,
        height: 984,
    },
    {
        title: "The Rural Divide: Shifts in Voter Sentiment Ahead of the General Elections",
        description: "Traveling across the heartland to capture the shifting political landscape. This article explores the economic concerns driving unprecedented voter turnout in rural communities.",
        image: "/post/post-3.jpg",
        date: "18 November, 2026",
        link: "/",
        width: 640,
        height: 1006,
    },
    {
        title: "Preserving Heritage: The Artisans Fighting to Keep Ancient Traditions Alive",
        description: "A compelling photo-essay and feature article documenting the daily lives of indigenous craftsmen as they navigate the challenges of modern industrialization.",
        image: "/post/post-4.jpg",
        date: "02 December, 2026",
        link: "/",
        width: 640,
        height: 1006,
    }
];

const Media = () => {

    return (
        <section id="insights">
            <div className="container">
                <div className='bg-center-heading'>
                    <div className='center-sub-heading'>MEDIA INSIGHTS</div>
                    <div className='center-main-heading' style={{ color: '#1e293b' }}>Press & Media Coverage</div>
                </div>
                <div className="media-grid">
                    {mediaData.map((item, index) => (
                        <MediaCard key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Media;