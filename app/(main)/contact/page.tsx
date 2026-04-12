'use client'

import Banner from "@/components/ui/banner";
import {MdSend, MdFacebook} from "react-icons/md"
import {BiLogoInstagram, BiLogoTwitter, BiLogoWhatsappSquare} from "react-icons/bi"
import { useState } from "react";
import { useForm } from "@/lib/useForm";
import { contactValidation } from "@/validation/course.schema";
import { formatZodErrors } from "@/lib/helper";
import { sendMessage } from "@/api/userService";
import toast from "react-hot-toast";
import { set } from "zod";



function Contact(){

    const [errors, setErrors] = useState<any>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {formData, handleChange} = useForm({
        name:"",
        email:"",
        subject:"",
        message:""
    })

    const handleFormSubmit = async (e:React.FormEvent)=>{
        e.preventDefault();

        const result = contactValidation.safeParse(formData);
       
        if (!result.success) {
            const errors = formatZodErrors<typeof formData>(result.error);
            setErrors(errors);
            console.log(errors)
            return;
        }

        try {
            setIsLoading(true)
            const result = await sendMessage(formData)
            if(result.success){
                toast.success(result.message)
                formData.name=""
                formData.email=""
                formData.subject=""
                formData.message=""
            }
        } catch (error:any) {
            toast.error(error.response?.data?.message)
        }finally{
            setIsLoading(false)
        }
    }

    return(
        <div>
            <Banner title="Contact Us" pageName="Contact"/>

            <div className="px-8 lg:px-15">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 mt-12 gap-y-5 items-center">

                    <div>
                       <div className="text-lg font-semibold text-black">/get in touch/</div>

                       <div className="mt-8">
                        <p className="lg:text-7xl text-xl text-center lg:text-left font-semibold text-black">We are always ready to help you and and answer your question</p>
                       </div>

                       <div className="mt-4 lg:mt-8 text-gray-500 font-medium text-center lg:text-left ">
                         <p>For more inquiries,questions and other business ideas you can call or <br /> visit our office address beblow</p>
                       </div>

                       <div className="mt-4 lg:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-y-8">

                        <div className="text-center lg:text-left">
                            <div className="font-bold text-2xl">Call Center</div>
                            <ul className="mt-3">
                                <li className="text-gray-500 font-medium">+(234) 9114 243 025</li>
                            </ul>
                        </div>

                        <div className="text-center lg:text-left">
                            <div className="font-bold text-2xl">Our location</div>
                            <ul className="mt-3">
                                <li className="text-gray-500 font-medium">23 Porthacour Road Owerri Imo State, Nigeria</li>
                            </ul>
                        </div>

                        <div className="text-center lg:text-left">
                            <div className="font-bold text-2xl">Email</div>
                            <ul className="mt-3">
                                <li className="text-gray-500 font-medium">info@oasisintech.com</li>
                            </ul>
                        </div>

                        <div className="text-center lg:text-left ">
                            <div className="font-bold text-2xl">Social Networks</div>
                            <ul className="mt-3 flex flex-row lg:justify-start justify-center gap-x-4">
                                <li className="text-black font-medium"><MdFacebook size={25}/></li>
                                <li className="text-black font-medium"><BiLogoInstagram size={25}/></li>
                                <li className="text-black font-medium"><BiLogoTwitter size={25}/></li>
                                <li className="text-black font-medium"><BiLogoWhatsappSquare size={25}/></li>
                            </ul>
                        </div>

                       </div>
                    </div>

                    <div className="w-full">
                        <div className="bg-gray-200 rounded-lg show-md px-5 py-2.5">
                            <p className="text-3xl font-bold font-poppins text-black">Get in Touch</p>
                            <div className="lg:max-w-[65%] w-full text-gray-600 text-sm mt-3">Define your goals and indentify areas where <span className="font-bold text-black">Integrated OASIS </span> can add value to your business and other personal needs </div>

                            <div className="mt-8">
                                <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-8">
                                    <div className="my-2">
                                        <input type="text" value={formData.name} onChange={handleChange} name="name" id="" placeholder="Full Name" className="w-full border-b-2 border-gray-700 placeholder-gray-700 text-sm outline-none py-2 px-2" />
                                        {errors.name &&(
                                            <p className="text-red-500 text-xs">{errors.name}</p>
                                        )}
                                    </div>

                                     <div className="my-2">
                                        <input type="email" value={formData.email} onChange={handleChange} name="email" id="" placeholder="email" className="w-full border-b-2 border-gray-700 placeholder-gray-700 text-sm outline-none py-2 px-2" />
                                        {errors.email &&(
                                            <p className="text-red-500 text-xs">{errors.email}</p>
                                        )}
                                    </div>

                                     <div className="my-2">
                                        <input type="text" value={formData.subject} onChange={handleChange} name="subject" id="" placeholder="Subject" className="w-full border-b-2 border-gray-700 placeholder-gray-700 text-sm outline-none py-2 px-2" />
                                        {errors.subject &&(
                                            <p className="text-red-500 text-xs">{errors.subject}</p>
                                        )}
                                    </div>

                                    <div>
                                        <textarea value={formData.message} onChange={handleChange} name="message" id="" cols={60} className="w-full border-b-2 border-gray-700 placeholder-gray-700 text-sm outline-none py-2 px-2" placeholder="Message"></textarea>
                                        {errors.message &&(
                                            <p className="text-red-500 text-xs">{errors.message}</p>
                                        )}
                                    </div>

                                    <div className="mt-4">
                                        <button className="inline-flex items-center gap-x-4  bg-black text-white rounded-full px-5 py-4">
                                            <MdSend size={22}/>
                                            <span>{isLoading ? "Sending..." : "Send Message"}</span>
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                        
                    </div>

                </div>
            </div>
            
        </div>
    )
}


export default Contact;