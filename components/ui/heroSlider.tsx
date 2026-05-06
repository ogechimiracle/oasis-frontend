
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import SlideText from "./sliderText";
import Image from "next/image";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"



export default function HeroSwiper() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showText, setShowText] = useState(false);

    const handleSlideChange = (swiper: any) => {
        setActiveIndex(swiper.activeIndex); // update immediately
        setShowText(false);

        setTimeout(() => {
            setShowText(true);
        }, 2000);
    };


    const slides = [
        { img: "/images/about/ab3.jpeg", text: "Build Real-World Tech Skills" },
        { img: "/images/about/ab4.jpeg", text: "Learn. Create. Launch." },
        { img: "/images/about/ab1.jpeg", text: "Your Tech Career Starts Here" }
    ]

    return (
        <div>
            <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{
                    nextEl: ".next-btn",
                    prevEl: ".prev-btn",
                }}
                autoplay={{ delay: 5000 }}
                onInit={() => setTimeout(() => setShowText(true), 2000)}
                onSlideChange={handleSlideChange}
            // onSlideChange={handleSlideChange}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="w-full lg:h-120 h-80 relative">
                            <Image
                                src={slide.img}
                                alt="swiper"
                                fill
                                className="object-cover rounded-3xl"
                            />

                            <div className="absolute inset-0 w-full h-full rounded-3xl">
                                <Transition
                                    show={showText && activeIndex === index}
                                    enter="transition duration-500 ease-out"
                                    enterFrom="opacity-0 translate-y-10"
                                    enterTo="opacity-100 translate-y-0"
                                >
                                    <div className="absolute bottom-3 right-0 left-0 p-5 glass">

                                        <Transition
                                            show={showText && activeIndex === index}
                                            enter="transition duration-500 ease-out delay-300"
                                            enterFrom="opacity-0 translate-y-5"
                                            enterTo="opacity-100 translate-y-0"
                                        >
                                            <p className="text-white font-semibold font-poppins">{slide.text}</p>
                                        </Transition>

                                    </div>
                                </Transition>
                            </div>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <button className="next-btn absolute right-4 top-1/2 z-10 bg-blue-600 text-white w-10 h-10 rounded-full grid place-content-center">
                <FiArrowRight />
            </button>

            <button className="prev-btn absolute left-4 top-1/2 z-10 bg-blue-600 text-white w-10 h-10 rounded-full grid place-content-center">
                <FiArrowLeft />
            </button>
        </div>

    );
}