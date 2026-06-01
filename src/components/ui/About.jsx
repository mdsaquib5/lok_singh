"use client";

import Image from "next/image";
import CountUp from "react-countup";

const About = () => {
    return (
        <section className="about-bg" id="about">
            <div className="container">
                <div className="about-container">
                    <div className="about-image">
                        <Image src={'/about-us.png'} alt="about-image" width={620} height={584} priority />
                    </div>
                    <div className="about-content">
                        <div className="about-subHeading">About me</div>
                        <div className="about-heading">I uncover compelling stories that blend rigorous investigation with impactful narrative</div>
                        <p>I'm a passionate journalist with a knack for turning complex issues into accessible, engaging stories. With expertise in investigative reporting and a commitment to factual accuracy, I specialize in covering topics that resonate with audiences and drive change.
                        </p>
                        <div className="about-stats">
                            <div className="stat">
                                <div className="stat-value">
                                    <CountUp end={3} suffix="+" />
                                </div>
                                <div className="stat-label">Years of Experience</div>
                            </div>
                            <div className="stat">
                                <div className="stat-value">
                                    <CountUp end={4} suffix="+" />
                                </div>
                                <div className="stat-label">Articles Published</div>
                            </div>
                            <div className="stat">
                                <div className="stat-value">
                                    <CountUp end={3} suffix="+" />
                                </div>
                                <div className="stat-label">Award Wins</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;