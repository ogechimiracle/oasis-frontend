'use client';
import Image from "next/image";
import { oasisNavLinks } from "@/utils/constant";
import { usePathname } from "next/navigation";
import {RiMenu3Fill, RiCloseFill, RiUser2Fill} from "react-icons/ri"
import { MdKeyboardArrowDown, MdOutlineLogout } from "react-icons/md";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/authContext";


function Nav() {

    const path = usePathname();
    const {user, logout} = useAuth()
    const [nav, setNav] = useState<boolean>(false)

    const setNavHandler = () => {
        setNav(!nav)
    }

    const handleLogout=()=>{
        logout()
    }

    return (  
       <nav className={`relative h-15 ${path === "/" ? "bg-myheroColor" : "bg-white"} `} >

        <div className={`absolute inset-0 py-4  w-full ${path === "/" ? "bg-black/15" : ""}`}>

        <div className="lg:px-15 px-5 flex items-center justify-between">

            <div className="flex items-center gap-x-4">
                <Image src="/images/logo.png" alt="OASIS Logo" width={40} height={40} />
                <span className={`text-lg lg:text-lg font-semibold ${path === "/" ? "text-white" : "text-black"}` }>Integrated Oasis</span>
            </div>

            <div className="hidden lg:block">
                <ul className="flex items-center gap-x-10">
                    {oasisNavLinks.map((link, index) => (
                        <div key={index} className={`flex flex-col items-center gap-y-[0.95px] ${path ==='/'?"text-white":"text-black"} `}>
                            <Link href={link.path} className={`text-md font-poppins font-regular ${path === link.path ? 'text-myprimaryColor' : ' hover:text-myprimaryColor'}`}>{link.name}
                            </Link>
                            {path === link.path && 
                                <div className="w-10 h-[0.95px] rounded-full bg-myprimaryColor"></div>
                            }
                        </div>
                    ))}
                </ul>
            </div>

            <div className="hidden lg:block">
                {user ? 
                <div className="cursor-pointer relative group">
                    <div className="flex items-center gap-x-2">
                        <div className="size-10 rounded-full bg-gray-100 grid place-content-center">
                            <p><RiUser2Fill/></p>
                        </div>
                        <div className="flex items-center gap-x-1.5">
                            <p className="text-xs text-gray-300">{user?.email}</p>
                            <MdKeyboardArrowDown className="group-hover:rotate-180 transition-all ease-in-out duration-150"/>
                        </div>
                    </div>

                    <div className="absolute right-0 mt-2 w-72
                        bg-white rounded-xl shadow-lg border
                        opacity-0 invisible pb-4
                        group-hover:visible group-hover:opacity-100
                        transition-all duration-200
                        z-50">

                        <div className="flex flex-col">
                            <Link href="" className="py-3 px-4 hover:bg-myprimaryColor text-black">Dashboard</Link>
                            <Link href="" className="py-3 px-4 hover:bg-myprimaryColor text-black">Profile</Link>
                            <button onClick={handleLogout} className="text-left px-4 py-2.5 cursor-pointer hover:bg-myprimaryColor text-black inline-flex items-center gap-x-3">
                                <span>Sign Out</span>
                                <MdOutlineLogout/>
                            </button>
                        </div>

                    </div>
                </div> 
                :
                <div className="flex items-center gap-x-4">
                    <Link href="/auth/" className="px-6 py-2 rounded-full text-sm bg-white shadow-sm text-black cursor-pointer">Login</Link>
                    <Link href="/auth/" className="px-6 py-2 rounded-full text-sm bg-myprimaryColor shadow-sm text-black cursor-pointer font-poppins ">Sign Up</Link>
                </div>
                }
                
            </div>

            {/* mobile toggler */}

            <div className="lg:hidden">
                <button onClick={setNavHandler}>
                    <RiMenu3Fill size={30} className="text-5xl" />
                </button>
            </div>

            {/* end of mobile toggler */}

        </div>

        {/* mobile nav */}

            <div
            className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300
                ${nav ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            >
            {/* overlay */}
            <div
                className={`absolute inset-0 bg-black/50 transition-opacity duration-300
                ${nav ? "opacity-100" : "opacity-0"}`}
                onClick={setNavHandler}
            />

            {/* drawer */}
            <div
                className={`absolute top-0 right-0 w-[75%] h-full bg-white
                transform transition-transform duration-300 ease-in-out
                ${nav ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="px-8 py-5 mt-5">
                <ul className="flex flex-col items-center gap-y-4">
                    {oasisNavLinks.map((link, index) => (
                    <li key={index}>
                        <Link
                        href={link.path}
                        className="text-black font-poppins flex flex-col items-center gap-y-1.5"
                        onClick={setNavHandler}
                        >
                        {link.name}
                        {path === link.path && ( 
                            <div className="w-15 h-[0.95px] rounded-full bg-black"></div>
                        )}
                        </Link>
                    </li>
                    ))}
                </ul>
                <div className="flex items-center justify-between w-full mt-5">
                    <Link href="/auth/" className="px-6 py-2 rounded-full text-sm bg-white shadow-sm text-black cursor-pointer">Login</Link>
                    <Link href="/auth/" className="px-6 py-2 rounded-full text-sm bg-myprimaryColor shadow-sm text-black cursor-pointer font-poppins ">Sign Up</Link>
                </div>
                </div>

                {/* close button */}
                <button
                className="absolute top-2 right-2 px-2 py-1.5 hover:bg-gray-300 transition"
                onClick={setNavHandler}
                >
                <RiCloseFill size={30} />
                </button>
            </div>
            </div>



        {/* end of mobile nav */}

        </div>

    
       </nav>    
    );
}

export default Nav;