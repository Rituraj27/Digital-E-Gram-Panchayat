import React from "react";
import banner from "./../assets/header-banner2.jpg";
import { Mail, MapPinHouse } from "lucide-react";

const Contact = () => {
  return (
    <div>
      <div
        className="flex items-center justify-center"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "150px",
          width: "100%",
        }}
      >
        <h1 className="text-4xl text-white">Contact Us</h1>
      </div>
      <div className="flex flex-col items-center justify-center mb-5">
        <h1 className="my-3 text-center text-md">
          As a partner to the community, we look forward to your comments,
          suggestions and any feedback that will help us provide better service.
        </h1>
        <p className="my-1 text-sm text-center">
          Here are some of the ways to contact us:
        </p>
        <div className="flex flex-col items-center justify-center gap-5 mt-4 lg:flex-row">
          <div className="w-[300px] h-[100px] border border-gray-400 rounded-md flex items-center justify-center gap-2">
            <Mail className="w-16 h-16 p-4 text-white bg-green-900 rounded-full opacity-60" />
            <div className="flex flex-col">
                <h1>Email: info@dgs.gov.in</h1>
                <p>Phone No:9876543210</p>
            </div>
          </div>
          <div className="w-[300px] h-[100px] border border-gray-400 rounded-md flex items-center justify-center gap-2">
            <MapPinHouse className="w-16 h-16 p-4 text-white bg-green-900 rounded-full opacity-60" />
           <div className="flex flex-col">
                <p>
                  National Portal Secretariat
                </p>
                <p>CGO Complex, Lodhi Road,</p>
                <p>New Delhi - 110 003, India.</p>
           </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
