'use client';

import Image from "next/image";
import Hero from "@/components/ui/hero";
import { whyChooseOasis, oasisFeatures, courses, testimonials } from "@/utils/constant";
import {MdKeyboardArrowRight, MdArrowRightAlt, MdStar} from 'react-icons/md'
import Success from "@/components/ui/success";
import CourseSwiper from "@/components/ui/courseSwiper";
import TestimonialSwiper from "@/components/ui/testimonialSwiper";
import Link from "next/link";
import FAQ from "@/components/faq";
import { useState, useEffect } from "react";
import { getAllCourses } from "@/api/userService";
import AOS from 'aos';
import 'aos/dist/aos.css';





export default function Home() {

  const [course, setCourse] = useState<any>([])

  useEffect(()=>{

    const fetchCourses = async()=>{
      try {
        const data = await getAllCourses()
        setCourse(data.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchCourses()

  },[])

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="overflow-hidden">
      <Hero />
      
      <div className=" px-5 lg:px-15 mt-5">
        <div className="flex flex-col items-center justify-center" data-aos="fade-up">
          <p className="text-2xl font-semibold font-poppins">Our Success</p>
            <div className="w-full lg:max-w-[50%] mt-2 text-center">
              <p className="text-md font-poppins text-gray-500 mt-4">Our success is measured by the skills we build and the futures we shape. Through hands-on training, expert guidance, and real-world projects, we have empowered learners to grow into confident tech professionals ready for today's digital world.</p>
            </div>
        </div>

        <div className="mt-14 py-5" data-aos="fade-up" data-aos-delay="200">
          <Success />
        </div>

      </div>


      <div className="px-5 lg:px-15 mt-8">
        <div className="flex flex-col items-center justify-center" data-aos="fade-up">

          <div className="mt-2 mb-4">
            <h1 className="text-2xl font-semibold font-poppins">Why choose <span className=" text-myheroColor">OASIS</span></h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 lg:gap-5 gap-y-10 mt-10" data-aos="fade-up" data-aos-delay="200">
              {whyChooseOasis.map((item, index) => {
                const Icon = item.icon;
                return(
                
                <div key={index} className="w-80 flex flex-col items-center rounded-lg shadow-sm px-8 py-4" data-aos="zoom-in" data-aos-delay={index * 100}>
                  <div className="size-12 rounded-full bg-mygrayColor1 grid place-content-center -mt-10">
                    <Icon size={30} className="text-white" />
                  </div>

                  <h1 className="mt-8 font-poppins text-myheroColor">{item.label}</h1>
                  <div>
                    <p className="text-sm text-gray-500 text-center mt-2">{item.value}</p>
                  </div>

                </div>
                )
       })}
          </div>

        </div>
      </div>

      <div className="px-5 lg:px-15 mt-8 ">
       <div className="flex flex-col items-center py-8" data-aos="fade-up">

          <h1 className="text-2xl font-semibold font-poppins text-mydarkblueColor">What is  <span className=" text-myheroColor">OASIS ?</span></h1>

          <div className="mt-5  w-full lg:max-w-[50%]">
            <p className="text-md text-gray-500 text-center ">
              Oasis is a modern tech institute dedicated to teaching in-demand technology skills through practical learning and real-world projects. From web and mobile development to data science, analytics, and cybersecurity, we prepare learners for success in the digital world
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-8 mt-10 py-2 w-full" data-aos="fade-up" data-aos-delay="200">

            <div className="w-full h-100.75 shadow-sm bg-white rounded-2xl relative" data-aos="fade-right">
              <Image src="/images/smile.png" alt="Smile" width={400} height={300} className="object-cover w-full h-full rounded-2xl" />
              <div className="absolute inset-0 h-full w-full flex flex-col items-center justify-center space-y-4 bg-black/30 rounded-2xl">

              <h1 className=" uppercase font-semibold text-white text-2xl">For Instructors</h1>
 
              <button className="px-8 py-4 rounded-full text-white border-[1.5px] border-white font-poppins cursor-pointer hover:translate-x-2.5 transition-all duration-150 ease-in hover:border-myheaderColor hover:text-black">Start a class today</button>

              </div>
            </div>

            <div className="w-full h-100.75 shadow-sm bg-white rounded-lg relative" data-aos="fade-left">
               <Image src="/images/funs.png" alt="students smiling" width={400} height={300} className="object-cover w-full h-full rounded-2xl" />

               <div className="absolute inset-0 h-full w-full flex flex-col items-center justify-center space-y-4 bg-black/30 rounded-2xl">

              <h1 className=" uppercase font-semibold text-white text-2xl">For Students</h1>
 
              <button className="px-8 py-4 rounded-full text-gray-600 font-poppins cursor-pointer hover:translate-x-2.5 transition-all duration-150 bg-myprimaryColor ease-in hover:border-myheaderColor hover:text-black">Join Class Now</button>

              </div>

            </div>

          </div>

       </div>
      </div>

      <div className="px-5 lg:px-15 mt-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 items-center gap-y-4" data-aos="fade-up">

          <div className="w-full" data-aos="fade-right">

            <div className="relative">
              <div className="absolute -top-3 left-0 opacity-30 size-10 rounded-full bg-myprimaryColor"></div>
             <h3 className="text-mydarkblueColor font-poppins font-semibold text-3xl">Everything you can do in a physical classroom,  <span className="text-myprimaryColor">you can do with OASIS</span></h3>
            </div>

            <div className="text-gray-600 font-poppins mt-5 px-1 text-md">
              <p>OASIS school management software helps traditional and online schools manage scheduling, attendance, payments and virtual classrooms all in one secure cloud-based system.</p>
            </div>


          </div>

          <div className="relative  h-80" data-aos="fade-left">

            <div className="absolute top-0 left-0 size-30 rounded-lg bg-myheroColor"></div>
            <div className="absolute right-0 bottom-0 size-30 rounded-lg bg-myprimaryColor"></div>

             
            <div className="w-full h-full px-5 py-3 rounded-lg absolute inset-0">
              <Image src="/images/students.png" alt="students Image" width={400} height={300} className="object-fit w-full h-full " />
            </div>

          </div>

        </div>

      </div>


      <div className="px-5 lg:px-15 py-8 mt-8">

        <div className="flex flex-col items-center justify-center" data-aos="fade-up">
          <h1 className="text-mydarkblueColor font-poppins font-bold text-2xl">Our <span className="text-myheroColor">Features</span></h1>

          <p className="text-gray-600 font-poppins mt-2 text-center">This very extraordinary feature, can make learning activities more efficient</p>

        </div>

        <div className="flex items-center justify-center">
          <div className="lg:w-[90%] w-full">
          {oasisFeatures.map((feature, index) => (
            <div key={index} className={`flex flex-col lg:justify-self-center items-center px-5  mt-10 lg:flex-row ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`} data-aos={index % 2 === 0 ? "fade-right" : "fade-left"} data-aos-delay={index * 100}>
              
              <div className="w-full ">
                <Image src={feature.img} alt={feature.title} width={400} height={300} className="object-contain " />
              </div>

              <div className="w-full">
                <h1 className="text-mydarkblueColor font-poppins font-semibold text-2xl">{feature.title}</h1>
                
                <div className="lg:max-w-[60%]">
                  <p className="text-gray-600 font-poppins mt-5 text-sm">{feature.content}</p>
                </div>

              </div>

            </div>
          ))}
          </div>
        </div>

      </div>


      <div className="px-5 lg:px-15 py-10 my-10">
          <div className="flex items-center justify-between" data-aos="fade-up">
            <div className="max-w-[50%] lg:w-full">
              <h1 className="text-2xl font-bold text-mydarkblueColor font-poppins">Explore Our Courses</h1>
              <div className="">
                <p className=" mt-1">Enroll now on our courses and start learning today!</p>
              </div>
            </div>

            <div>
              <Link href="/courses">
                <button className="inline-flex items-center gap-x-4 cursor-pointer hover:bg-gray-300 px-4 py-3 rounded-full transition-all duration-150 ease-in">
                  <span className="text-md font-poppins">See All</span>
                  <MdKeyboardArrowRight size={20} className="text-mygreenColor" />
                </button>
              </Link>
            </div>
            
          </div>

          <div className="mt-10 py-4" data-aos="fade-up" data-aos-delay="200">
            <CourseSwiper courses={course} />
          </div>

      </div>

      <div className="px-5 lg:px-15 mt-10">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-5 py-10" data-aos="fade-up">

            <div data-aos="fade-right">
              <div className="flex items-center gap-x-5">
                <div className="w-25 h-0.5 bg-mydarkblueColor"></div>
                <p className="text-mydarkblueColor font-poppins text-lg font-light">Testimonials</p>
              </div>

              <div>

                <h1 className="mt-5 text-3xl font-bold text-myblueColor font-poppins">What they Say?</h1>

                <div className="py-10 text-sm font-poppins text-gray-500 lg:max-w-[70%] space-y-5 ">
                  <p>OASIS has got more than 100k positive ratings from our users around the world. </p>

                  <p>Some of the students and teachers were greatly helped by the Skilline.</p>

                  <p>Are you too? Please give your assessment</p>

                </div>

                <button className="inline-flex items-center gap-x-5 rounded-full border-[1.3px] border-myprimaryColor cursor-pointer">
                  <span className="text-sm font-light px-4 font-poppins text-black">Write your assessment</span>
                  <div className="size-12 rounded-full grid place-content-center border-[1.3px] border-myprimaryColor">
                    <MdArrowRightAlt size={25} className="text-black" />
                  </div>
                </button>

              </div>

            </div>


            <div className="w-full" data-aos="fade-left">
             <TestimonialSwiper testimonials={testimonials} />
            </div>

          </div>


      </div>


      <div className="px-5 lg:px-15 py-10 my-10 max-w-5xl flex-col items-center justify-center mx-auto" data-aos="fade-up">
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-3xl text-center font-bold text-mydarkblueColor font-poppins">Frequently <br /> Asked Questions</h1>
          <div className="mt-2">
            <p className="text-gray-600 font-poppins text-center">Here are some of our FAQs. If you have any other quesitons, please feel free to contact us.</p>
          </div>
        </div>

        <div className=" mt-8" data-aos="fade-up" data-aos-delay="200">
          <FAQ/>
        </div>

      </div>



    </div>
  );
}
