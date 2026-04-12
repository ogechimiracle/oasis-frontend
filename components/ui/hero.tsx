'use client'
import Image from "next/image";

import {FaPlay, FaChartPie, FaCalendarAlt, FaUserAlt} from "react-icons/fa"
import {MdOutlineEmail} from "react-icons/md"
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Badge } from "./badge";



function Hero(){
    useEffect(() => {
        AOS.init({
          duration: 1000,
          once: true,
          offset: 100,
        });
      }, []);

    return (
        <div className="w-full bg-myheroColor relative lg:h-155.5 h-185.5 " id="mycurve">
            <div className="absolute inset-0 bg-black/15 flex lg:flex-row flex-col lg:items-center lg:px-15 px-5 lg:pt-8 pt-10 h-full w-full ">

                <div className="lg:max-w-[50%]" data-aos="fade-right">
                    <div className="flex flex-col ">
                       <Badge className="mb-5">Integrated OASIS</Badge>
                        <h1 className="lg:text-[50px] text-2xl font-bold text-white text-center lg:text-left" data-aos="fade-up" data-aos-delay="200"> <span className="text-myprimaryColor">Study</span> Online is now <br /> much easier</h1>

                        <div className="mt-8 text-sm text-gray-100 font-poppins text-center lg:text-left lg:max-w-[70%]" data-aos="fade-up" data-aos-delay="400">
                            <h3>Unlock your potential with expert-led online training, immersive in-house programs, and free tutorials from Integrated Oasis.</h3>
                        </div>

                        <div className="flex flex-col lg:flex-row items-center gap-x-8 mt-8 space-y-3" data-aos="fade-up" data-aos-delay="600">
                            <button className="bg-myprimaryColor shadow-xs cursor-pointer text-black text-md font-poppins px-5 py-4 rounded-full hover:scale-105 transition-transform duration-300">Join for free</button>

                            <button className="inline-flex items-center gap-x-5 cursor-pointer hover:translate-x-2 transition-transform duration-300 px-5 py-2 rounded-full border-2 border-white">
                                <div className="size-10 grid place-content-center rounded-full bg-white">
                                    <FaPlay className="text-[#23BDEE] animate-pulse" size={20} />
                                </div>
                                <span className="text-md font-poppins text-white">Watch how it works</span>
                            </button>
                        </div>

                    </div>
                </div>



                <div className="relative lg:max-w-[50%] mt-13 lg:mt-10">
                   <Image src="/images/hr.png" alt="Hero Image" width={600} height={600} className="object-contain" data-aos="zoom-in"/>


                   <span className="absolute lg:top-15 top-5 -right-10 glass px-1.5 py-2 lg:px-4 lg:py-5 rounded-xl text-xs lg:text-sm font-poppins text-white" data-aos="fade-up" data-aos-delay="200">Study at your comfort zone</span>

                    <span className="absolute lg:top-45 top-25  -left-10 glass px-1.5 py-2 lg:px-4 lg:py-5 rounded-xl text-xs lg:text-sm font-poppins text-white" data-aos="fade-up" data-aos-delay="400">Digital Marketing Class by 2pm</span>

                    <span className="absolute lg:top-60 top-45 -right-10 glass px-1.5 py-2 lg:px-4 lg:py-5 rounded-xl text-xs lg:text-sm font-poppins text-white" data-aos="fade-up" data-aos-delay="600">Join our community of learners</span>

                    <span className="absolute lg:bottom-20 bottom-1 -left-10 glass px-1.5 py-2 lg:px-4 lg:py-5 rounded-xl text-xs lg:text-sm font-poppins text-white" data-aos="fade-up" data-aos-delay="800">Get certified in your field</span>

                </div>


                


        </div>

    </div>
           

    )
}

export default Hero;