import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmployeeContext } from "./context/EmployeeContexr";
import { Link } from "react-router-dom";
import moment from "moment";

const Grievances = () => {
  const { grievance } = useContext(EmployeeContext);
  return (
   <div className="pt-10 lg:pt-0">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sl No</TableHead>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Mobile</TableHead>
            <TableHead>Grievance No</TableHead>
            <TableHead>Applied On</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Ticket Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {grievance &&
            grievance.map((item, index) => (
              <TableRow className={`${item?.status === 'pending' ? 'text-red-700' : 'text-green-900'}`}>
                <TableCell>{index + 1}</TableCell>
                <Link to={`/grievance/${item._id}`}><TableCell>{item.name}</TableCell></Link>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.grievance_registered_number}</TableCell>
                <TableCell>{moment(item.createdAt).format("DD-MM-YYYY")}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  {item.status === "pending" ? "Open" : "Closed"}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
   </div>
  );
};

export default Grievances;
