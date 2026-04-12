'use client'

import { statistics } from "@/api/adminService"
import AdminStaticsCard from "@/components/admin/adminStaticsCard"
import RevenueChart from "@/components/charts/revenueChart"
import StudentEnrollmentChart from "@/components/charts/studentErrollment"
import { useState, useEffect } from "react"
import {FiBookOpen, FiClock, FiDollarSign, FiUsers} from 'react-icons/fi'





function AdminDashboard(){

    const [stats, setStats] = useState<any>([])

    useEffect(()=>{

        const fetchStats = async ()=>{
            try {
                const data = await statistics()
                console.log(data.stats)
                setStats(data.stats)
            } catch (error:any) {
                console.log(error)
            }
        }

        fetchStats()

    }, [])

    return(
        <div className="">
            
            <h1 className="text-xl font-bold text-black">Overview</h1>

            <div className="grid grid-col-1 lg:grid-cols-4 gap-x-4 gap-y-2 mt-4">
                  <AdminStaticsCard
                    title="Total Users"
                    value={stats.totalUsers || 0}
                    percentage={5}
                    icon={FiUsers}
                />
                 <AdminStaticsCard
                    title="Active Courses"
                    value={stats.totalCourses || 0}
                    percentage={3}
                    icon={FiBookOpen}
                />

                <AdminStaticsCard
                    title="Revenue"
                    value="₦2,450,000"
                    percentage={8}
                    icon={FiDollarSign}
                />

                <AdminStaticsCard
                    title="Pending Payments"
                    value={17}
                    percentage={-2}
                    icon={FiClock}
                />
            </div>

            <h1 className="mt-8 text-xl font-semibold">Analytics</h1>

            <div className="mt-4">
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-4">

                    <div className="col-span-2 bg-white shadow-sm rounded-xl">
                        <StudentEnrollmentChart/>
                    </div>

                    <div>
                        <RevenueChart/>
                    </div>

                </div>

            </div>



        </div>
    )
}

export default AdminDashboard 