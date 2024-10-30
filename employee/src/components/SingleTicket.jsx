import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import pdf from "./../assets/pdf.svg";
import { Button } from "./ui/button";
import { EmployeeContext } from "./context/EmployeeContexr";
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
import PDFViewer from "./PDFviewer";
import axios from "axios";
import { Toaster , toast} from "sonner";
import moment from "moment";

const SingleTicket = () => {
  const { id } = useParams();
  const { singleTicket, getSingleAppliedScheme, employee } =
    useContext(EmployeeContext);

  useEffect(() => {
    getSingleAppliedScheme(id);
  }, []);

  const [pdfUrl, setPdfUrl] = useState(null);
  const [formData, setFormData] = useState({
    password: "",
    empID: "",
    remarks: "",
    initial_status: "",
    scheme_applied_id: id,
    id: localStorage.getItem("id"),
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const [error, setError] = useState(null);

  const handleClickPdf = (url) => {
    setPdfUrl(url);
  };

 

  const handleSubmit = async () => {
    try {
      await axios
        .post("http://localhost:5000/api/v1/employee/changeStatus", formData)
        .then((res) => {
          console.log(res);
          setError(res.data.message);
          if(res.data.success){
            getSingleAppliedScheme(id);
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

  return (
    <div className="">
      <Toaster/>
      <h1 className="p-2 text-2xl text-center text-white bg-green-900 rounded-sm">
        Registration No -{singleTicket?.registration_no}
      </h1>
      <fieldset className="border border-green-900 px-[2vw] rounded-md lg:px-[10vw] lg:mt-10 mt-5">
        <legend className="">
          <h1 className="text-xl">Scheme Applied For</h1>
        </legend>
        <div className="flex flex-col my-4">
          <p className="text-md">
            Scheme Name:
            <span className="text-xl font-normal">
              {singleTicket?.scheme_name}
            </span>
          </p>
          <p className="mt-1 text-md">
            Scheme Code:
            <span className="text-xl font-normal">
              {singleTicket?.scheme_code}
            </span>
          </p>
        </div>
      </fieldset>

      <fieldset className="border border-green-900 px-[2vw] rounded-md lg:px-[10vw] lg:mt-10 mt-5">
        <legend className="">
          <h1 className="text-xl">User Details</h1>
        </legend>
        <div className="flex flex-col items-center justify-start gap-4 my-4 lg:flex-row ">
          <img src={singleTicket?.photo} alt="" className="w-52" />
          <div>
            <p className="text-md">
              Name:{" "}
              <span className="text-xl font-normal">{singleTicket?.name}</span>
            </p>
            <p className="mt-1 text-md">
              Gender:{" "}
              <span className="text-xl font-normal">
                {singleTicket?.gender}
              </span>
            </p>
            <p className="mt-1 text-md">
              DOB: <span className="text-xl font-normal">{moment(singleTicket?.DOB).format("DD-MM-YYYY")}</span>
            </p>
            <p className="mt-1 text-md">
              Email:{" "}
              <span className="text-xl font-normal">{singleTicket?.email}</span>
            </p>
            <p className="mt-1 text-md">
              Phone:{" "}
              <span className="text-xl font-normal">
                {singleTicket?.mobile}
              </span>
            </p>
            <p className="mt-1 text-md">
              Nationality:{" "}
              <span className="text-xl font-normal">
                {singleTicket?.nationality}
              </span>
            </p>
          </div>
        </div>
      </fieldset>

      <fieldset className="border border-green-900 px-[2vw] rounded-md lg:px-[10vw] lg:mt-10 mt-5">
        <legend className="">
          <h1 className="text-xl">Personal Details</h1>
        </legend>
        <div className="my-4">
          <p className="text-md">
            Aadhar Card Number:{" "}
            <span className="text-xl font-normal">
              {singleTicket?.aadharNo}
            </span>
          </p>
          <p className="mt-1 text-md">
            PAN Card Number:{" "}
            <span className="text-xl font-normal">{singleTicket?.panNo}</span>
          </p>
          <p className="mt-1 text-md">
            Address:{" "}
            <span className="text-xl font-normal">{singleTicket?.address}</span>
          </p>
          <p className="mt-1 text-md">
            Occupation:{" "}
            <span className="text-xl font-normal">
              {singleTicket?.occupation}
            </span>
          </p>
          <p className="mt-1 text-md">
            Income:{" "}
            <span className="text-xl font-normal">{singleTicket?.income}</span>
          </p>
          <p className="mt-1 text-md">
            Are you Govt Employee?:{" "}
            <span className="text-xl font-normal">
              {singleTicket?.govt_officials}
            </span>
          </p>
        </div>
      </fieldset>

      <fieldset className="border border-green-900 px-[2vw] rounded-md lg:px-[10vw] lg:mt-10 mt-5">
        <legend className="">
          <h1 className="text-xl">Bank Details</h1>
        </legend>
        <div className="my-4">
          <p className="text-md">
            Bank Name:{" "}
            <span className="text-xl font-normal">
              {singleTicket?.bank_name}
            </span>
          </p>
          <p className="mt-1 text-md">
            Bank Branch:{" "}
            <span className="text-xl font-normal">
              {singleTicket?.bank_branch}
            </span>
          </p>
          <p className="mt-1 text-md">
            Bank IFSC Code:{" "}
            <span className="text-xl font-normal">
              {singleTicket?.ifsc_code}
            </span>
          </p>
          <p className="mt-1 text-md">
            Bank Account Number:{" "}
            <span className="text-xl font-normal">
              {singleTicket?.bank_account_no}
            </span>
          </p>
        </div>
      </fieldset>

      <fieldset className="border border-green-900 px-[2vw] rounded-md lg:px-[10vw] lg:mt-10 mt-5">
        <legend className="">
          <h1 className="text-xl">Uploaded Document</h1>
        </legend>
        <div className="flex flex-col gap-8 my-4 lg:flex-row">
          <p className="flex items-center gap-2 mt-1 text-md">
            Aadhar Card
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleClickPdf(singleTicket?.aadharPhoto);
                  }}
                >
                  <span>
                    <img src={pdf} alt="" className="w-6" />
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Aadhar Card</AlertDialogTitle>
                  <AlertDialogDescription>
                    {pdfUrl ? (
                      <PDFViewer key={pdfUrl} pdfUrl={pdfUrl} />
                    ) : (
                      "Loading pdf"
                    )}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction onClick={() => setPdfUrl("")}>
                    Cancel
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </p>
          <p className="flex items-center gap-2 mt-1 text-md">
            PAN Card
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleClickPdf(singleTicket?.panPhoto);
                  }}
                >
                  <span>
                    <img src={pdf} alt="" className="w-6" />
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Pan Card</AlertDialogTitle>
                  <AlertDialogDescription>
                    {pdfUrl ? (
                      <PDFViewer key={pdfUrl} pdfUrl={pdfUrl} />
                    ) : (
                      "Loading pdf"
                    )}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction onClick={() => setPdfUrl("")}>
                    Cancel
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </p>
          <p className="flex items-center gap-2 mt-1 text-md">
            Bank Passbook
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleClickPdf(singleTicket?.bank_passbook);
                  }}
                >
                  <span>
                    <img src={pdf} alt="" className="w-6" />
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Bank Passbook</AlertDialogTitle>
                  <AlertDialogDescription>
                    {pdfUrl ? (
                      <PDFViewer key={pdfUrl} pdfUrl={pdfUrl} />
                    ) : (
                      "Loading pdf"
                    )}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction onClick={() => setPdfUrl("")}>
                    Cancel
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </p>
        </div>
      </fieldset>

      <fieldset className="border border-green-900 px-[2vw] rounded-md lg:px-[10vw] lg:mt-10 mt-5 mb-10">
        <legend>
          <h1 className="text-xl"> Initial Status</h1>
        </legend>
        <form className="my-4">
          <p className="text-md">
            Initial Status:{" "}
            <span className="text-xl font-normal">
              {singleTicket?.initial_status}
            </span>
          </p>
          <p className="text-md">
            remarks:{" "}
            <span className="text-xl font-normal">{singleTicket?.remarks??"NA"}</span>
          </p>

          {
            singleTicket?.initial_status === "pending" && 
            ( 
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
                          name="initial_status"
                          value={formData.initial_status}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              initial_status: e.target.value,
                            })
                          }
                        >
                          <option>Select Status</option>
                          <option value="Pending">Pending</option>
                          <option value="Sent to Modal Officer">
                            Sent to Modal Officer
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
              </AlertDialog>)
          }

         
        </form>
      </fieldset>
    </div>
  );
};

export default SingleTicket;
