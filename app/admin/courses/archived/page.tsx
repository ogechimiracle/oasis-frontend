'use client'

import {  getArchivedCourse } from "@/api/adminService";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState, useEffect } from "react";




function Archived(){

    const [pendingCourse, setPendingCourse] = useState<any>([])


    useEffect(()=>{

        const fetchArchived = async ()=>{
            try {
                const data = await getArchivedCourse()
                console.log(data)
                const res = await data.data
                setPendingCourse(res)
            } catch (error:any) {
                console.log(error)
            }
        }

        fetchArchived()

    }, [])

    return(
        <div>
            <p className="text-xl text-black font-semibold">All Archived Course</p>

            <div className="mt-8">

                 <Table>
                        <TableCaption>Archived Courses</TableCaption>
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
                                <TableRow>
                                    <TableCell>there is </TableCell>
                                </TableRow>
                            ): (
                                <Table>
                                    <TableCell colSpan={5} className="text-center text-sm text-red-500">No Archived Course yet</TableCell>
                                </Table>
                            )}

                        </TableBody>
                </Table>

            </div>
        </div>
    )
}

export default Archived;