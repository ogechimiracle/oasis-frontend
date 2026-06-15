"use client"

import Banner from "@/components/ui/banner";
import Success from "@/components/ui/success";
import { oasisAboutFeatures } from "@/utils/constant";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';




function About(){
    useEffect(() => {
        AOS.init({
          duration: 1000,
          once: true,
          offset: 100,
        });
      }, []);

    return(
        <div className="">
           
            <Banner title="About Integrated OASIS" pageName="About" image="/images/banner3.jpg"/>
            
            <div className="px-5 lg:px-15">

                <div className="grid grid-cols-1 lg:grid-cols-3 mt-12 gap-x-5 items-center" data-aos="fade-up" data-aos-delay="200">

                    <div data-aos="fade-right">
                        <div className="flex items-center gap-x-3">
                            <div className="bg-myheroColor w-12 h-[3.5px] "></div>
                            <p className="text-lg font-semibold font-poppins text-myheroColor">About Integrated OASIS</p>
                        </div>

                        <div className="mt-2 font-poppins space-y-3 text-gray-500">
                            <p>Integrated Oasis ICT Services is a technology training and digital solutions organisation
                            committed to delivering high-quality ICT education, software development, and innovative
                            technology services.
                            </p>
                            <p>
                                We are dedicated to practical learning, digital innovation, and the development of industryrelevant competencies that empower individuals and organisations.
                            </p>
                        </div>

                        <div className="flex items-center gap-x-3 lg:mt-10" data-aos="fade-up" data-aos-delay="400">
                            <div className="bg-myheroColor w-12 h-[3.5px] "></div>
                            <p className="text-lg font-semibold font-poppins text-myheroColor">Our Vision</p>
                        </div>
                        <div>
                            <p className="mt-2 font-poppins space-y-3 text-gray-500">To become a leading ICT training and innovation hub in Africa, recognised for excellence,integrity, and impact.</p>
                        </div>

                        <div className="flex items-center gap-x-3 lg:mt-10" data-aos="fade-up" data-aos-delay="600">
                            <div className="bg-myheroColor w-12 h-[3.5px] "></div>
                            <p className="text-lg font-semibold font-poppins text-myheroColor">Our Mission</p>
                        </div>
                        <div>
                            <p className="mt-2 font-poppins space-y-3 text-gray-500">To deliver practical, innovative, and industry-aligned ICT training and technology services that empower individuals and organizations to thrive in the digital economy.</p>
                        </div>

                    </div>

                   <div className="lg:col-span-2" data-aos="fade-left">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">

                            <div className="relative w-full h-80" data-aos="zoom-in" data-aos-delay="300">
                            <Image
                                src="/images/about/ab1.jpeg"
                                alt="about"
                                fill
                                className="object-cover rounded-2xl shadow-sm"
                            />
                            </div>

                           
                            <div className="relative w-full h-80" data-aos="zoom-in" data-aos-delay="400">
                            <Image
                                src="/images/about/ab2.jpeg"
                                alt="about"
                                fill
                                className="object-cover rounded-2xl shadow-sm"
                            />
                            </div>

                            <div className="relative w-full h-80" data-aos="zoom-in" data-aos-delay="500">
                            <Image
                                src="/images/about/ab3.jpeg"
                                alt="about"
                                fill
                                className="object-cover rounded-2xl shadow-sm"
                            />
                            </div>

                            <div className="relative w-full h-80" data-aos="zoom-in" data-aos-delay="600">
                            <Image
                                src="/images/about/ab4.jpeg"
                                alt="about"
                                fill
                                className="object-cover rounded-2xl shadow-sm"
                            />
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            <div className="">
                <div className="w-full items-center justify-center">
                    <div className="flex flex-col items-center justify-center" data-aos="fade-up">
                       <div className="flex items-center justify-center gap-x-3 lg:mt-10 mt-5">
                            <p className="text-lg font-semibold font-poppins text-myheroColor">we are different</p>
                        </div> 

                        <div className="font-bold text-4xl font-poppins text-black text-center">What makes us different</div>
                    </div>
                </div>

                <div className="mt-8 px-5 lg:px-15" data-aos="fade-up" data-aos-delay="200">
                    <div className="w-full flex flex-col lg:flex-row items-center justify-evenly">

                        <div className="w-full lg:w-[35%] lg:h-121 h-95 mb-4 lg:mb-0 rounded-lg bg-white shadow-md relative" data-aos="fade-right">
                            <Image fill alt="image_different" src="/images/stud2.jpg" className="object-contain" />
                        </div>

                        <div className="flex justify-start  lg:w-[40%] w-full" data-aos="fade-left">
                            <div className="flex flex-col space-y-3">
                                {oasisAboutFeatures.map((items, index)=>(
                                    <div key={index} className="font-poppins bg-gray-50 rounded-lg p-2" data-aos="fade-up" data-aos-delay={index * 200}>
                                        <div className="text-black font-bold text-lg">{items.title}</div>
                                        <div className="mt-2 text-sm text-gray-500">{items.description}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            <div className="w-full  relative mt-5 lg:mt-12 lg:h-65 h-110" data-aos="fade-up">
                <Image src="/images/bg3.jpg" fill alt="image_banner" className="object-cover" />

                <div className="absolute w-full h-full flex items-center justify-center bg-black/30">
                   <div className="flex" data-aos="zoom-in" data-aos-delay="300">
                        <Success labelColor="text-white"/>
                   </div>
                </div>

            </div>


            <div className="px-5 lg:px-15">
                <div className="mt-8 flex items-center justify-center flex-col" data-aos="fade-up">
                    <p className="text-4xl font-bold text-myheroColor">Join Us Now</p>
                    <p className="text-gray-700 font-semibold">@ Integrated OASIS</p>

                    <Link href="/auth" className="px-8 py-2.5 text-xl rounded-full mt-5 border-2 border-myheroColor cursor-pointer text-myheroColor hover:bg-myheroColor hover:text-white transition-colors duration-300" data-aos="zoom-in" data-aos-delay="200">Register</Link>
                </div>
            </div>


        </div>
    )
}

export default About;