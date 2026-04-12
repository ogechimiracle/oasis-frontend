'use client'

import {MdOutlineSearch, MdOutlineNotifications} from 'react-icons/md'
import {CiUser, } from "react-icons/ci"
import Link from 'next/link'
import { useAuth } from '@/context/authContext'


function TopBar (){

    const {logout} = useAuth()

   const handleLogout = async()=>{
    logout()
   }

    return(
          <div className="w-full flex items-center  justify-between px-5 lg:px-0">

            <div className='w-full lg:w-[40%]'>
              <h1 className='font-poppins font-semibold text-lg'>Admiminstrator</h1>
              <small className='text-gray-500 hidden lg:block'>Integrated OASIS Admiministrator</small>
            </div>

            <div className="w-full flex items-end justify-between gap-4 ">

              <div className="hidden lg:flex items-center justify-between w-full rounded-full px-5 py-3.5 outline-1 ">
                <input type="search" className="outline-none" placeholder="Search" />
                <button>
                    <MdOutlineSearch size={25} className='' />
                </button>
              </div>

              <div className='w-full'>
                <div className='flex items-center justify-end gap-x-8'>
                    
                   <div className="relative cursor-pointer group">

                    <div className="absolute -right-2 -top-2 bg-myprimaryColor size-5 rounded-full text-black text-xs grid place-content-center z-20">
                        2
                    </div>

                    <MdOutlineNotifications size={25} />

                    {/* Dropdown */}
                    <div className="
                        absolute right-0 mt-3 w-72
                        bg-white rounded-xl shadow-lg border
                        opacity-0 invisible
                        group-hover:visible group-hover:opacity-100
                        transition-all duration-200
                        z-50
                    ">
                        <div className="p-4">
                            <p className="font-semibold mb-2">Notifications</p>

                            <div className="text-sm text-gray-600">

                                <div className='flex items-center justify-between '>
                                    <div>
                                        <p className='font-semibold'>Reminder</p>
                                        <small>There will be a staff meeting</small>
                                    </div>
                                    <div>
                                        <p className='text-xs'>2days ago</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    </div>

                    <div className='flex items-center gap-x-4 cursor-pointer relative group'>
                        <p className='text-xs'>Smith Doe</p>
                        <div className='lg:size-12 size-10 rounded-full bg-gray-200 grid place-content-center'>
                            <CiUser size={25} className='object-contain' />
                        </div>

                        <div className=' absolute right-0 top-10 mt-3 w-72
                        bg-white shadow-lg
                        opacity-0 invisible
                        group-hover:visible group-hover:opacity-100
                        transition-all duration-200
                        z-50'>

                            <div className='flex flex-col text-sm'>
                                <Link href="" className='px-4 py-2.5 hover:bg-myprimaryColor transition-colors ease-in duration-200'>Profile</Link>
                                <button onClick={handleLogout}  className='px-4 py-2.5 hover:bg-myprimaryColor transition-colors ease-in duration-200 text-left cursor-pointer'>Log Out</button>
                            </div>

                        </div>
                    </div>


                </div>


              </div>
              
            </div>
              
          </div>
    )
}

export default TopBar;