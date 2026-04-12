'use client'

import { activateCourse, getPendingCourse } from "@/api/adminService";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/helper";
import { formatCustomDateTime } from "@/lib/utils";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";






function Pending(){

    const [pendingCourse, setPendingCourse] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [refresh, setRefresh] = useState<boolean>(false)


    useEffect(()=>{

        const fetchPending = async ()=>{
            try {
                const data = await getPendingCourse()
                console.log(data)
                const res = await data.data
                setPendingCourse(res)
            } catch (error:any) {
                console.log(error)
            }
        }

        fetchPending()

    }, [])

    const hanleActivateCourse = async(id:string)=>{
        try {
            setLoading(true)
            const result = await activateCourse(id)
            if(result.success){
                toast.success(result.message)
                setRefresh(prev => !prev)
            }
        } catch (error:any) {
            toast.error(error.response?.data?.message || "An error occurred while activating the course")
            setLoading(false)
        }
        finally{
            setLoading(false)
        }
    }

    return(
        <div>
            <p className="text-xl text-black font-semibold">All Pending Course</p>

            <div className="mt-8">

                 <Table>
                        <TableCaption>All Courses</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Date Created</TableHead>
                                <TableHead>Course Level</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                           
                        <TableBody>

                            {pendingCourse.length > 0 ? (
                                pendingCourse.map((item:any, index:any)=>(
                                        <TableRow>
                                            <TableCell>{item.title}</TableCell>
                                            <TableCell>{formatCurrency(item.cost)}</TableCell>
                                            <TableCell>{formatCustomDateTime(item.createdAt)}</TableCell>
                                            <TableCell>{item.level}</TableCell>
                                            <TableCell>
                                                <button className="bg-myprimaryColor px-4 py-2.5 text-md font-semibold text-black rounded-lg" onClick={()=>hanleActivateCourse(item.id)}>Activate Course</button>
                                            </TableCell>
                                        </TableRow>
                                   ))
                            ): (
                                <TableRow>
                                    <TableCell colSpan={5} className="w-full text-center text-red-500 font-semibold">No pending course yet</TableCell>
                                </TableRow>
                            )}

                        </TableBody>
                </Table>

            </div>
        </div>
    )
}

export default Pending;