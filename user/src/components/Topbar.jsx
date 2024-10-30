import React from "react";
import india from "./../assets/india.svg";
import { Phone } from "lucide-react";

const Topbar = () => {
  return (
    <div className="flex justify-between w-full p-3 text-white bg-green-900 px-[5vw]">
      <div className="flex items-center font-normal text-white text-md">
        <img src={india} alt="" className="mr-2 w-7" />
        भारत सरकार | डिजिटल ग्रामसवरज | Government of India
      </div>
      <div className="flex items-center gap-2 text-white">
       <Phone /> 9876543210
      </div>
    </div>
  );
};

export default Topbar;
