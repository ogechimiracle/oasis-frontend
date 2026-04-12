"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getCourseImageUrl, truncateText, formatCurrency } from "@/lib/helper";


export interface Course {
  id: string;
  title: string;
  briefDefinition: string;
  thumbnail: string;
  cost: number;
}

interface CourseSwiperProps {
  courses: Course[];
}

export default function CourseSwiper({ courses }: CourseSwiperProps) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={24}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        320: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }, // 3 per row on desktop
      }}
    >
      {courses.map((course,index) => (
        <SwiperSlide key={index}>
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <img
              src={getCourseImageUrl(course.thumbnail)}
              alt={course.title}
              className="w-full h-52 object-cover"
            />
            <div className="py-8 px-5">
              <h3 className="text-lg font-semibold mb-2">
                {course.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {truncateText(course.briefDefinition, 100)}
              </p>
              <span className="font-bold text-primary">
                {course.cost === 0 ? "Free" : formatCurrency(course.cost)}
              </span>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
