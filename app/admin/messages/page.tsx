'use client'
import { getMessages } from "@/api/adminService";
import { Card, CardContent } from "@/components/ui/card";

import {Table,TableBody,TableCaption,TableCell,TableFooter,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
import { formatCustomDateTime } from "@/lib/utils";
import { useState, useEffect } from "react";
import { TiMessages } from "react-icons/ti";
import Modal from "@/components/ui/modal";


function Messages(){

    const [message, setMessage] = useState<any>([])
    const [refresh, setRefresh] = useState<boolean>(false)

    const [selectedMessage, setSelectedMessage] = useState<any>(null)
    const [openModal, setOpenModal] = useState<boolean>(false)

    const handleViewMessage = (message:any)=>{
        setSelectedMessage(message)
        setOpenModal(true)
    }



    useEffect(()=>{

        const fetchMessage = async ()=>{
            try {
                const data = await getMessages()
                console.log(data)
                const res = await data.data
                setMessage(res)
            } catch (error:any) {
                console.log(error)
            }
        }
        fetchMessage()

    }, [])

    return(
        <div>
            <div className="mt-5">
                <p className="text-2xl font-semibold text-black ">Client Feedback</p>
                <p className="text-sm text-gray-500 mt-1">View and manage all client feedback and messages here.</p>
            </div>

            <div className="mt-5">
                
                <Card>
                    <CardContent>
                        <Table>
                            <TableCaption>A list of client feedback and messages.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="">ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Date Sent</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {message.length >0 ? (
                                   message.map((item:any, index:any)=>(
                                    <TableRow key={item.id}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell className="flex items-center gap-x-2">
                                        <div className="size-10 rounded-full grid place-content-center glass">
                                            <TiMessages size={30} />
                                        </div>
                                        <span>{item.name}</span>
                                    </TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{formatCustomDateTime(item.createdAt)}</TableCell>
                                    <TableCell>
                                        <button className="px-5 py-2.5 rounded-lg bg-myprimaryColor text-black text-sm" onClick={() => handleViewMessage(item)}>View</button>
                                    </TableCell>
                                </TableRow>
                                   ))
                                ):(
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center text-sm text-red-500">No messages yet</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>


            </div>


            <Modal isOpen={openModal} onClose={()=>setOpenModal(false)} title="Message Details">
                {selectedMessage && (
                    <div className="space-y-4">
                        
                        <p><span className="font-semibold">Name:</span> {selectedMessage.name}</p>
                        <p><span className="font-semibold">Email:</span> {selectedMessage.email}</p>
                        <p><span className="font-semibold">Subject:</span> {selectedMessage.subject}</p>
                        <div className="mt-5">
                            <p><span className="font-semibold">Message:</span></p>
                            <p className="bg-gray-100 p-3 rounded-lg">{selectedMessage.message}</p>
                        </div>
                        
                    </div>
                )}
            </Modal>

        </div>
    )
}



export default Messages;