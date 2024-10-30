import React from "react";
import { useLocation } from "react-router-dom";
import success from "./../assets/icons8-success-480.png";
import CreatePdfGrievance from "./CreatePdfGrievance";
import { Button } from "./ui/button";

const GrievanceConfirmation = () => {
  const location = useLocation();
  const { grievance } = location.state || {};
  console.log(grievance);
  const handlePdfDownload = () => {
    const doc = CreatePdfGrievance(grievance);
    doc.save(`${grievance.grievance_registered_number}.pdf`);
  };
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="w-1/2 h-[300px] border border-green-900 border-b-8 rounded flex justify-center items-center flex-col gap-2 p-4">
        {/* <CircleCheckBig className="w-24 h-24 text-green-900" /> */}
        <img src={success} alt="" className="w-28" />
        <p className="text-center">
          Your grievane application titled{" "}
          <span className="font-bold">{grievance.name}</span> has been
          successfully submitted. Your registration number is{" "}
          <span className="font-bold">
            {grievance.grievance_registered_number}
          </span>
          . Thank you for your submission. You can download your submission
          using the link below:
        </p>
        <Button
          className="p-2 mt-5 text-xl bg-green-900 hover:bg-green-800"
          onClick={handlePdfDownload}
        >
          Download
        </Button>
      </div>
    </div>
  );
};

export default GrievanceConfirmation;
