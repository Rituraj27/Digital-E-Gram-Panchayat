import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/UserContext";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";
import pdf from "./../assets/pdf.svg";
import CreatePdfGrievance from "./CreatePdfGrievance";

const GrievancesApplied = () => {
  const { user, id, getUser } = useContext(UserContext);

  useEffect(() => {
    getUser(id);
  }, [id]);

  const handlePdf = async (grievance) => {
    const doc = CreatePdfGrievance(grievance);
    doc.save(`${grievance.grievance_registered_number}.pdf`);
  };
  return (
    <div className="h-screen pt-10 lg:pt-0">
        {
            user?.grievances.length > 0 ? <Table>
            <TableCaption>A list of your recent grievances.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Sl No</TableHead>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Grievance Number</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Applied on</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Download</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {user?.grievances?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="w-[100px]">{index + 1}</TableCell>
                  <TableCell className="w-[200px]">{item.name}</TableCell>
                  <TableCell className="w-[200px]">
                    {item?.grievance_registered_number}
                  </TableCell>
                  <TableCell className="w-[600px]">{item?.description}</TableCell>
                  <TableCell>
                    {moment(item?.createdAt).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell>{item?.status}</TableCell>
                  <TableCell>
                    <img
                      src={pdf}
                      alt=""
                      className="w-10"
                      onClick={() => handlePdf(item)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> :
          <p className="mt-5 text-center">No grievances applied</p>
        }
      
    </div>
  );
};

export default GrievancesApplied;
