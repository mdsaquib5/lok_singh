"use client";
import React, { useState } from 'react';
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { IoPlayOutline, IoCloseOutline } from 'react-icons/io5';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Post = () => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [currentPoster, setCurrentPoster] = useState(null);

    const posts = [
        { img: "/post-1.jpg", video: "/sample-video.mp4" },
        { img: "/post-1.jpg", video: "/sample-video.mp4" },
        { img: "/post-1.jpg", video: "/sample-video.mp4" },
        { img: "/post-1.jpg", video: "/sample-video.mp4" },
        { img: "/post-1.jpg", video: "/sample-video.mp4" },
        { img: "/post-1.jpg", video: "/sample-video.mp4" },
        { img: "/post-1.jpg", video: "/sample-video.mp4" },
    ];

    const openVideo = (video, poster) => {
        setCurrentVideo(video);
        setCurrentPoster(poster);
        setIsVideoOpen(true);
    };

    const closeVideo = () => {
        setIsVideoOpen(false);
        setCurrentVideo(null);
        setCurrentPoster(null);
    };

    return (
        <section className="post-bg">
            <div className="container">
                <div className='bg-center-heading'>
                    <div className='center-sub-heading'>Latest Coverage</div>
                    <div className='center-main-heading'>Stories From The Ground</div>
                </div>
                <div className="port-container">
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        loop={true}
                        slidesPerView={'auto'}
                        speed={800}
                        // autoplay={{
                        //     delay: 2500,
                        //     disableOnInteraction: false,
                        // }}
                        coverflowEffect={{
                            rotate: 20,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        navigation={true}
                        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                        className="post-slider"
                        style={{ padding: '50px 0' }}
                    >
                        {posts.map((post, index) => (
                            <SwiperSlide key={index} style={{ width: '400px' }}>
                                <div className="post-card">
                                    <Image
                                        width={804}
                                        height={1236}
                                        src={post.img}
                                        alt={`Post ${index + 1}`}
                                    />
                                    <button
                                        onClick={() => openVideo(post.video, post.img)}
                                        className="play-btn"
                                    >
                                        <IoPlayOutline className="play-icon" />
                                    </button>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            {isVideoOpen && (
                <div className="video-modal-overlay">
                    <button
                        onClick={closeVideo}
                        className="close-btn"
                    >
                        <IoCloseOutline />
                    </button>
                    <div className="video-modal-content">
                        <video
                            src={currentVideo}
                            controls
                            autoPlay
                            poster={currentPoster}
                            className="video-player"
                        />
                    </div>
                </div>
            )}
        </section>
    );
}

export default Post;