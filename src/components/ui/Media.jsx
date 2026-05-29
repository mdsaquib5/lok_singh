import Image from "next/image";
import Link from "next/link";

const Media = () => {

    return (
        <section>
            <div className="container">
                <div className='bg-center-heading'>
                    <div className='center-sub-heading'>MEDIA INSIGHTS</div>
                    <div className='center-main-heading' style={{ color: '#1e293b' }}>Press & Media Coverage</div>
                </div>
                <div className="media-grid">
                    <div className="media-card">
                        <div className="media-image">
                            <Link href={'/'}><Image src={"/post-bg.jpg"} alt={"post-bg"} width={640} height={554} priority /></Link>
                        </div>
                        <div className="media-content">
                            <h3 className="media-title">Featured Interview: Exploring the Future of Immersive Web Experiences and Next-Gen Architecture</h3>
                            <p>Recently sat down with TechWeekly to discuss the evolving landscape of digital experiences. We explored how modern frameworks are bridging the gap between aesthetic design and high-performance applications.</p>
                            <div className="date-author">
                                <div className="author">
                                    <Image src={'/hero-img-3.jpg'} alt={'Profile'} width={256} height={314} priority />
                                    <span className="writer">Lokbhadra Singh</span>
                                </div>
                                <span className="date-text">24 August, 2026</span>
                            </div>
                        </div>
                    </div>
                    <div className="media-card">
                        <div className="media-image">
                            <Link href={'/'}><Image src={"/post-bg.jpg"} alt={"post-bg"} width={640} height={554} priority /></Link>
                        </div>
                        <div className="media-content">
                            <h3 className="media-title">Mastering React: A Comprehensive 30-Day Blueprint for Accelerating Your Frontend Journey</h3>
                            <p>Discover the step-by-step roadmap to accelerating your frontend development skills. In this comprehensive guide, we break down core React concepts, state management, and modern component architecture.</p>
                            <div className="date-author">
                                <div className="author">
                                    <Image src={'/hero-img-3.jpg'} alt={'Profile'} width={256} height={314} priority />
                                    <span className="writer">Lokbhadra Singh</span>
                                </div>
                                <span className="date-text">24 August, 2026</span>
                            </div>
                        </div>
                    </div>
                    <div className="media-card">
                        <div className="media-image">
                            <Link href={'/'}><Image src={"/post-bg.jpg"} alt={"post-bg"} width={500} height={300} priority /></Link>
                        </div>
                        <div className="media-content">
                            <h3 className="media-title">Building Scalable Products from Scratch: An Inside Look at Engineering Robust Applications</h3>
                            <p>An inside look into my development process and the architectural decisions behind building robust, scalable applications that handle real-world traffic while delivering exceptional user experiences.</p>
                            <div className="date-author">
                                <div className="author">
                                    <Image src={'/hero-img-3.jpg'} alt={'Profile'} width={256} height={314} priority />
                                    <span className="writer">Lokbhadra Singh</span>
                                </div>
                                <span className="date-text">24 August, 2026</span>
                            </div>
                        </div>
                    </div>
                    <div className="media-card">
                        <div className="media-image">
                            <Link href={'/'}><Image src={"/post-bg.jpg"} alt={"post-bg"} width={640} height={554} priority /></Link>
                        </div>
                        <div className="media-content">
                            <h3 className="media-title">Why UI/UX is the Ultimate Differentiator in Today's Crowded and Competitive Digital Landscape</h3>
                            <p>In a crowded digital space, functionality alone isn't enough. Read my latest thoughts on why investing in seamless user interfaces and intuitive user journeys is critical for long-term product success.</p>
                            <div className="date-author">
                                <div className="author">
                                    <Image src={'/hero-img-3.jpg'} alt={'Profile'} width={256} height={314} priority />
                                    <span className="writer">Lokbhadra Singh</span>
                                </div>
                                <span className="date-text">24 August, 2026</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Media;