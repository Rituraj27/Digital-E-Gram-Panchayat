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
import pdf from './../assets/pdf.svg';
import CreatePdfScheme from "./CreatePdfScheme";


const SchemeApplied = () => {
  const { user, id, getUser } = useContext(UserContext);


  useEffect(() => {
    getUser(id);
  }, [id]);

  const handlePdf = async(scheme) =>{
    const doc = CreatePdfScheme(scheme);
    (scheme);
   doc.save(`${scheme.registration_no}.pdf`);
  }
  return (
    <div className="h-screen pt-10 lg:pt-0">
        {
           user?.schemes_applied ?   <Table>
           <TableCaption>A list of your recent invoices.</TableCaption>
           <TableHeader>
             <TableRow>
               <TableHead className="w-[100px]">Sl No</TableHead>
               <TableHead className="w-[100px]">Name</TableHead>
               <TableHead>Scheme Name</TableHead>
               <TableHead>Scheme Code</TableHead>
               <TableHead>Registration Number</TableHead>
               <TableHead >Applied on</TableHead>
               <TableHead >Initial Status</TableHead>
               <TableHead >Download</TableHead>
             </TableRow>
           </TableHeader>
           <TableBody>
             {
                user?.schemes_applied?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="w-[100px]">{index + 1}</TableCell>
                      <TableCell className="w-[200px]">{item.name}</TableCell>
                      <TableCell className="w-[300px]">{item?.scheme_name}</TableCell>
                      <TableCell className="w-[300px]">{item?.scheme_code}</TableCell>
                      <TableCell className="w-[300px]">{item?.registration_no}</TableCell>
                      <TableCell >
                        {moment(item?.created_at).format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell >{item?.initial_status}</TableCell>
                      <TableCell >
                        <img src={pdf} alt=""  className="w-10" onClick={() => handlePdf(item)}/>
                      </TableCell>
                    </TableRow>
                ))
             }
           </TableBody>
         </Table> : 
           <p className="mt-5 text-center">No Schemes Applied</p>
        }
        
     
    </div>
  );
};

export default SchemeApplied;
