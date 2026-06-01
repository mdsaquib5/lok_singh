"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Brands = () => {
    const logos = [
        '/brands/brand-2.webp',
        '/brands/brand-3.webp',
        '/brands/brand-2.webp',
        '/brands/brand-3.webp',
        '/brands/brand-2.webp',
        '/brands/brand-3.webp',
        '/brands/brand-2.webp',
        '/brands/brand-3.webp',
        '/brands/brand-2.webp',
        '/brands/brand-3.webp',
    ];

    return (
        <div className="brand-bg" id="brands">
            <div className="marque-brands-logo">
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={50}
                    slidesPerView={5}
                    loop={true}
                    speed={3000} // Adjust speed here
                    allowTouchMove={false} // Disables mouse drag/interaction
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        320: { slidesPerView: 2, spaceBetween: 20 },
                        768: { slidesPerView: 4, spaceBetween: 40 },
                        1024: { slidesPerView: 5, spaceBetween: 50 },
                        1440: { slidesPerView: 7, spaceBetween: 50 },
                    }}
                >
                    {logos.map((src, index) => (
                        <SwiperSlide key={index}>
                            <Image src={src} alt={`brand-logo-${index + 1}`} className="brand-logo" width={256} height={140} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default Brands;