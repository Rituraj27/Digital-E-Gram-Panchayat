import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EmployeeContext } from './context/EmployeeContexr'
import { Link } from 'react-router-dom'


const Tickets = () => {
  const {tickets , getAllSchemes} = useContext(EmployeeContext)

  console.log("tickets" , tickets)

  useEffect(()=>{
    getAllSchemes()
  },[])
  
  return (
    <Table>
    <TableCaption>A list of your recent tickets.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Mobile</TableHead>
        <TableHead>Scheme Name</TableHead>
        <TableHead>Registration No</TableHead>
        <TableHead>Action</TableHead>
        <TableHead>Ticket Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
     {
        tickets && tickets?.map((ticket,index)=>{
           return(
            <TableRow key={index} className={`${ticket?.initial_status === 'pending' ? 'text-red-700' : 'text-green-700'}`}>

            <TableCell className="w-[300px]"><Link to={`/ticket/${ticket?._id}`} className='hover:underline'>{ticket?.name}</Link></TableCell>
            <TableCell>{ticket?.email}</TableCell>
            <TableCell>{ticket?.mobile}</TableCell>
            <TableCell>{ticket?.scheme_name}</TableCell>
            <TableCell>{ticket?.registration_no}</TableCell>
            <TableCell>{ticket?.initial_status}</TableCell>
            <TableCell>{ticket?.initial_status === 'pending' ? <span className='font-bold text-red-900'>Open</span> : <span className='font-bold text-green-900'>Closed</span>}</TableCell>
        </TableRow>
           )
        })
     }
    </TableBody>
  </Table>
  
  )
}

export default Tickets
