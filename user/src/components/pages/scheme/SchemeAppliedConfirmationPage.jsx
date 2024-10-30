// import CreatePdfScheme from "@/components/CreatePdfScheme";
import CreatePdfScheme from "@/components/CreatePdfScheme";
import { Button } from "@/components/ui/button";
import { CircleCheckBig } from "lucide-react";
import React from "react";
import { useLocation } from "react-router-dom";
import success from './../../../assets/icons8-success-480.png';



const SchemeAppliedConfirmationPage = () => {
  const location = useLocation();
  const { scheme } = location.state || {};
  console.log(scheme);

  const handlePdfDownload = () =>{
     const doc = CreatePdfScheme(scheme);
     (scheme);
    doc.save(`${scheme.registration_no}.pdf`);
  }

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="lg:w-1/2 lg:h-[300px] border border-green-900 border-b-8 rounded flex justify-center items-center flex-col gap-2 p-4 w-full h-[350px] mx-auto lg:mx-0">
        {/* <CircleCheckBig className="w-24 h-24 text-green-900" /> */}
        <img src={success} alt="" className="w-28"/>
        <p className="text-center">
          Your scheme application titled <span className="font-bold">{scheme.scheme_name}</span> has been successfully
          submitted. Your registration number is <span className="font-bold">{scheme.registration_no}</span>. Thank
          you for your submission. You can download your submission using the
          link below:
        </p>
        <Button className="p-2 mt-5 text-xl bg-green-900 hover:bg-green-800" onClick={handlePdfDownload}>Download</Button>
      </div>
    </div>
  );
};

export default SchemeAppliedConfirmationPage;
