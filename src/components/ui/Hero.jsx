'use client';
import { useEffect, useState } from "react";
import CountUp from "react-countup";

const roles = [
    "Journalist",
    "Ground Reporter",
    "Public Speaker"
];

const Hero = () => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (isDeleting && subIndex === 0) {
            setIsDeleting(false);
            setIndex((prev) => (prev + 1) % roles.length);
            return;
        }

        if (!isDeleting && subIndex === roles[index].length) {
            const timeout = setTimeout(() => setIsDeleting(true), 1500);
            return () => clearTimeout(timeout);
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [subIndex, isDeleting, index, roles]);

    return (
        <div className="hero-bg">
            <div className="container">
                <div className="hero-container">
                    <div className="hero-content">
                        <div className="hero-title">Hi, I'm Lokbhadra Singh</div>
                        <div className="hero-subtitle">I am a <span className="highlight-text">{roles[index].substring(0, subIndex)}<span className="typing-cursor"></span></span></div>
                        <div className="hero-tagline">Sub Editor at India Today</div>
                        <p className="hero-description">
                            With extensive experience in investigative reporting and storytelling, I am passionate about uncovering the truth and sharing compelling narratives that matter. My work at the Times of India has honed my skills in delivering impactful news to a diverse audience.
                        </p>
                    </div>
                    <div className="hero-image">
                        <div className="floating-img float-1">
                            <img src="/hero-img-2.jpg" alt="Camera" />
                        </div>
                        <div className="floating-img float-2">
                            <img src="/hero-img-3.jpg" alt="News" />
                        </div>
                        <div className="stat-card stat-1">
                            <div className="stat-value"><CountUp end={4} duration={2} suffix="K+" enableScrollSpy scrollSpyOnce /></div>
                            <div className="stat-label">Instagram</div>
                        </div>
                        <div className="stat-card stat-2">
                            <div className="stat-value"><CountUp end={343} duration={2.5} suffix="+" enableScrollSpy scrollSpyOnce /></div>
                            <div className="stat-label">YouTube</div>
                        </div>
                        <div className="stat-card stat-3">
                            <div className="stat-value"><CountUp end={255} duration={3} suffix="+" enableScrollSpy scrollSpyOnce /></div>
                            <div className="stat-label">Post</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero;