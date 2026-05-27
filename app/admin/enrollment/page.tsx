'use client'
import { getEnrollments } from "@/api/adminService";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { useState, useEffect } from "react";

function EnrollmentPage() {

    const [enrollment, setEnrollment] = useState<any>([])

    useEffect(()=>{
        const fetchEnrollment = async()=>{
            try {
                const data = await getEnrollments()
                console.log(data)
                const res = await data.data
                setEnrollment(res.recentPayments)
            } catch (error:any) {
                console.log(error)
            }
        }
        fetchEnrollment()
    },[])

    return(
        <div>
            <p>Enrollemts</p>

            <div className="mt-8  bg-white shadow-sm rounded-lg">
                <Table>
                    <TableCaption>Enrollments</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student</TableHead>
                            <TableHead>Course</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {enrollment.length > 0 ? (
                            enrollment.map((enroll: any) => (
                                <TableRow key={enroll.id}>
                                    <TableCell className="font-medium">
                                        {enroll.user?.profile?.firstName} {enroll.user?.profile?.lastName}
                                        <div className="text-xs text-gray-500">{enroll.user?.email}</div>
                                    </TableCell>
                                    <TableCell>
                                        {/* Accessing course title via the enrollment relation */}
                                        {enroll.enrollment?.course?.title || "Unknown Course"}
                                    </TableCell>
                                    <TableCell>
                                        ₦{enroll.amount.toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(enroll.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${enroll.status === 'successful' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {enroll.status}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                                    No Enrollments found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default EnrollmentPage;