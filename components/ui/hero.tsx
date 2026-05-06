'use client'
import Image from "next/image";

import {FaPlay, FaChartPie, FaCalendarAlt, FaUserAlt} from "react-icons/fa"
import {MdOutlineEmail} from "react-icons/md"
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import HeroSwiper from "./heroSlider";



function Hero(){
    useEffect(() => {
        AOS.init({
          duration: 1000,
          once: true,
          offset: 100,
        });
      }, []);

    return (
        <div className="w-full bg-myheroColor relative lg:h-155.5 h-200.5 " id="mycurve">
            <div className="absolute inset-0 bg-black/15 flex lg:flex-row flex-col lg:items-center lg:px-15 px-5 lg:pt-8 pt-8 h-full w-full ">

                <div className="lg:max-w-[50%]" data-aos="fade-right">
                    <div className="flex flex-col ">
                       
                        <h1 className="lg:text-[50px] text-2xl font-bold text-white text-center lg:text-left" data-aos="fade-up" data-aos-delay="200"> <span className="text-myprimaryColor">Study</span> Online is now <br /> much easier</h1>

                        <div className="mt-8 text-sm text-gray-100 font-poppins text-center lg:text-left lg:max-w-[70%]" data-aos="fade-up" data-aos-delay="400">
                            <h3>Unlock your potential with expert-led online training, immersive in-house programs, and free tutorials from Integrated Oasis.</h3>
                        </div>

                        <div className="flex  flex-col lg:flex-row items-center gap-x-8 mt-8 gap-y-4" data-aos="fade-up" data-aos-delay="600">
                            <button className="bg-myprimaryColor shadow-xs cursor-pointer text-black text-md font-poppins px-5 py-3 rounded-full hover:scale-105 transition-transform duration-300">Join for free</button>

                            <button className="gap-x-5 cursor-pointer hover:translate-x-2 transition-transform duration-300 px-5 py-3 rounded-full border-2 border-white">
                                <span className="text-md font-poppins text-white">Explore All Courses</span>
                            </button>
                        </div>

                    </div>
                </div>



                <div className="relative w-full lg:w-1/2 mt-13 lg:mt-5 min-h-[300px] lg:min-h-[500px]" data-aos="fade-left">
                   <HeroSwiper/>
                </div>


                


        </div>

    </div>
           

    )
}

export default Hero;