"use client";

import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import { MdStar } from "react-icons/md";

import "swiper/css";

export interface Testimonial {
  id: string;
  name: string;
  message: string;
  image: string;
  rating: number;
}

interface TestimonialSwiperProps {
  testimonials: Testimonial[];
}

export default function TestimonialSwiper({
  testimonials,
}: TestimonialSwiperProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000 }}
        loop
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        slidesPerView={1}
      >
        {testimonials.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative w-full h-full">

              {/* Background Image */}
              <Image
                src={item.image}
                alt={item.name}
                width={400}
                height={300}
                className="object-contain h-120 rounded-3xl "
              />

              {/* Floating Card */}
              <div className="absolute bottom-0 lg:-bottom-10 lg:right-0 h-[200px] lg:w-[440px] w-full rounded-2xl border-l-8 border-myredColor bg-white shadow-sm">
                <div className="flex flex-col w-full h-full justify-center items-center py-5 px-4">

                  <div className="px-8 border-l-2 border-gray-200">
                    <p className="font-poppins text-sm text-gray-500">
                      "{item.message}"
                    </p>
                  </div>

                  <div className="flex justify-between items-center w-full px-8 mt-4">

                    <p className="font-poppins text-gray-700 text-sm font-semibold">
                      {item.name}
                    </p>

                    <div className="space-y-1 text-right">
                      <div className="flex gap-1 justify-end">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <MdStar
                            key={i}
                            size={18}
                            className="text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 font-light">
                        {item.rating}.0 Rating
                      </p>
                    </div>

                  </div>
                </div>
              </div>

              {/* Custom Buttons */}
              <div className="absolute lg:right-20 lg:top-1/2 top-[30%] flex justify-between lg:justify-end w-full lg:space-x-10 px-4">

                <button
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm text-white cursor-pointer"
                >
                  Prev
                </button>

                <button
                  onClick={() => swiperRef.current?.slideNext()}
                  className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm text-white cursor-pointer"
                >
                  Next
                </button>

              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
