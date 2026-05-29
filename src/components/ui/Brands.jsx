"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Brands = () => {
    const logos = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <div className="brand-bg">
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
                        1024: { slidesPerView: 7, spaceBetween: 50 },
                    }}
                >
                    {logos.map((item, index) => (
                        <SwiperSlide key={index}>
                            <Image src={'/brand-1.webp'} alt={'brand-logo'} className="brand-logo" width={176} height={108} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default Brands;