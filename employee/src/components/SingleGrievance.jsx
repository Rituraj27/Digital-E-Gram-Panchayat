import React, { useContext, useEffect, useState } from "react";
import { EmployeeContext } from "./context/EmployeeContexr";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast, Toaster } from "sonner";
import axios from "axios";

const SingleGrievance = () => {
  const { singleGrievance, getSingleGrievance , employee} = useContext(EmployeeContext);
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    password: "",
    empID: "",
    remarks: "",
    status: "",
    grievance_id: id,
    id: localStorage.getItem("id"),
  });


  const handleSubmit = async () => {
    try {
      await axios
        .post("http://localhost:5000/api/v1/employee/changeGrievanceStatus", formData)
        .then((res) => {
          console.log(formData)
          console.log(res);
          setError(res.data.message);
          if(res.data.success){
            getSingleGrievance(id);
            handleClose();
            toast(
              <div className='w-full p-4 text-white bg-green-900 rounded-lg'>
                <h1 className="text-md">Status changed successfully</h1>
              </div>
            )
          }
        
        });
    } catch (error) {
      console.log(error)
    }
  };
  

  useEffect(() => {
    getSingleGrievance(id);
  }, [id]);

  

  
  return (
    <div>
      <Toaster/>
      <h1 className="p-2 text-2xl text-center text-white bg-green-900 rounded-sm">
        Registration No -{singleGrievance?.grievance_registered_number}
      </h1>
      <fieldset className="border border-green-900 px-[2vw] rounded-md lg:px-[10vw] lg:mt-10 mt-5 ">
        <legend>Details</legend>
        <p className="text-md">
          Name:
          <span className="text-xl font-normal">{singleGrievance?.name}</span>
        </p>
        <p className="mt-1 text-md">
          DOB:
          <span className="text-xl font-normal">
            {moment(singleGrievance?.DOB).format("DD-MM-YYYY")}
          </span>
        </p>
        <p className="mt-1 text-md">
          Gender:
          <span className="text-xl font-normal">{singleGrievance?.gender}</span>
        </p>
        <p className="mt-1 text-md">
          Email:
          <span className="text-xl font-normal">{singleGrievance?.email}</span>
        </p>
        <p className="mt-1 text-md">
          Mobile:
          <span className="text-xl font-normal">{singleGrievance?.mobile}</span>
        </p>
        <p className="mt-1 text-md">
          Address:
          <span className="text-xl font-normal">
            {singleGrievance?.address}
          </span>
        </p>
        <p className="mt-1 text-md">
          Country:
          <span className="text-xl font-normal">
            {singleGrievance?.country}
          </span>
        </p>
        <p className="mt-1 text-md">
          State:
          <span className="text-xl font-normal">{singleGrievance?.state}</span>
        </p>
        <p className="mt-1 text-md">
          District:
          <span className="text-xl font-normal">
            {singleGrievance?.district}
          </span>
        </p>
        <p className="mt-1 text-md">
          Grievance Type:
          <span className="text-xl font-normal">
            {singleGrievance?.grievance_type}
          </span>
        </p>
        <p className="mt-1 text-md">
          Grievance Category:
          <span className="text-xl font-normal">
            {singleGrievance?.grievance_category}
          </span>
        </p>
        <p className="mt-1 text-md">
          Document:
          <span className="text-xl font-normal">
            {singleGrievance?.grievance_category}
          </span>
        </p>
        <p className="mt-1 text-md">
          Description:
          <span className="text-xl font-normal">
            {singleGrievance?.description}
          </span>
        </p>
        <p className="mt-1 text-md">
          Applied On:
          <span className="text-xl font-normal">
            {moment(singleGrievance?.createdAt).format("DD-MM_YYYY")}
          </span>
        </p>
        <p className="mt-1 text-md">
          Status:
          <span className="text-xl font-normal">{singleGrievance?.status}</span>
        </p>
        {singleGrievance?.status === "pending" ? (
           <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
           <AlertDialogTrigger asChild>
             <Button
               variant="outline"
               className="mt-5 text-xl text-white bg-green-900 w hover:bg-green-800 hover:text-white"
             >
               Change Status
             </Button>
           </AlertDialogTrigger >
           <AlertDialogContent>
             <AlertDialogHeader>
               <AlertDialogTitle>
                 Need to login to change status
               </AlertDialogTitle>
               <AlertDialogDescription className="flex flex-col">
                 <input
                   type="text"
                   placeholder="Enter your Email"
                   className="p-2 border border-gray-500 rounded-md"
                   value={employee.email}
                   readOnly
                 />
                 <input
                   type="password"
                   required
                   placeholder="Enter your Password"
                   name="password"
                   value={formData.password}
                   onChange={(e) =>
                     setFormData({ ...formData, password: e.target.value })
                   }
                   className="p-2 mt-2 border border-gray-500 rounded-md"
                 />
                 <input
                   type="text"
                   placeholder="Enter your Employee ID"
                   required
                   name="empId"
                   value={formData.empID}
                   onChange={(e) =>
                     setFormData({ ...formData, empID: e.target.value })
                   }
                   className="p-2 mt-2 border border-gray-500 rounded-md"
                 />
                 <p className="flex items-center justify-start mt-2 text-md">
                   <span className="w-40">Change Status :</span>
                   <select
                     className="w-full p-2 mt-2 border border-gray-500 rounded-md"
                     name="status"
                     value={formData.status}
                     onChange={(e) =>
                       setFormData({
                         ...formData,
                         status: e.target.value,
                       })
                     }
                   >
                     <option>Select Status</option>
                     <option value="Pending">Pending</option>
                     <option value="closed">
                       Closed
                     </option>
                   </select>
                 </p>
                 <p className="flex items-center justify-start mt-2 text-md">
                   <span className="w-40">Remark :</span>
                   <input
                     type="text"
                     name="remark"
                     value={formData.remarks}
                     onChange={(e) =>
                       setFormData({ ...formData, remarks: e.target.value })
                     }
                     className="w-full p-2 mt-2 border border-gray-500 rounded-md"
                     placeholder="Enter remark..."
                     required
                   />
                 </p>
                 <p className="flex items-center justify-start mt-4 text-md">
                   <span className="w-32">Verified by :</span>
                   <span className="font-normal jost">{employee.name}</span>
                 </p>
                 <p className="my-2 text-center text-red-500 text-md">{error}</p>
               </AlertDialogDescription>
             </AlertDialogHeader>
             <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <Button type="submit" onClick={handleSubmit}>
                 Submit
               </Button>
             </AlertDialogFooter>
           </AlertDialogContent>
         </AlertDialog>
        ) : (
          <></>
        )}
      </fieldset>
    </div>
  );
};

export default SingleGrievance;
