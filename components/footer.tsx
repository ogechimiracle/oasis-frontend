'use client'

import { useAuth } from "@/context/authContext";
import Image from "next/image";
import Link from "next/link";



function Footer(){
    return (
        <footer className=" bg-mydarkblueColor text-white mt-12" id="mycurve2">
            <div className="px-5 lg:px-15 py-15 w-full">

                <div className="flex items-center justify-center">
                   <div className="flex items-center gap-x-12">
                        <Image
                            src="/images/logo.png"
                            alt="Oasis Logo"
                            width={50}
                            height={50}
                            className="object-fit w-20 h-20"
                        />

                        <div className="space-y-1 px-5 border-l-[1.3px] border-gray-500 ">
                            <h1 className="text-xl font-poppins">Integrated OASIS</h1>
                            <p className="text-sm font-poppins text-gray-200">Learn and Build Smarter</p>
                        </div>  
                   </div>
                </div>


                <div className="flex items-center justify-center w-full mt-15 font-poppins">
                    <div className="lg:w-[50%] w-full flex flex-col gap-y-2 items-center justify-center">
                        <p className="text-lg font-bold">Subscribe to get our Newsletter</p>

                        <div className="flex items-center justify-between  w-full gap-x-5">
                            <input type="text" className="px-4 py-2.5 rounded-full border-[1.4px] border-gray-500 placeholder-gray-500 font-poppins w-full" placeholder="email@cc.com" />
                            <button className="px-8 py-2.5 rounded-full bg-myprimaryColor text-black text-sm font-semibold cursor-pointer">
                                <span>Subscribe</span>
                            </button>
                        </div>
                    </div>
                </div>

                

            </div>

            <div className="px-5 lg:px-15 w-full py-4">

                <div className="flex items-center gap-x-4 text-gray-400 font-light justify-center">
                    <Link href="">Careers</Link>
                    <Link href="/privacy">Privacy Policy</Link>
                    <Link href="/terms">Terms & Condition</Link>
                </div>

                <div className="flex items-center justify-center">
                    <p suppressHydrationWarning className="font-poppins text-md font-normal text-gray-500">&copy; Integrated OASIS </p>
                </div>
                    
            </div>
        </footer>
    );
}

export default Footer