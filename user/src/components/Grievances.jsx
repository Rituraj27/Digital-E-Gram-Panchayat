import React from "react";
import Slider from "./Slider-6";
import image1 from "./../assets/baner-cpgrams_1.jpg";
import image2 from "./../assets/baner-cpgrams_3.jpg";
import image3 from "./../assets/baner-cpgrams_4.jpg";
import image4 from "./../assets/baner-cpgrams_5.jpg";
import image5 from "./../assets/baner-cpgrams_6.jpg";
import image6 from "./../assets/baner-cpgrams_7.jpg";
import { ArrowRightFromLine, Dot, Info } from "lucide-react";
import img_status from "./../assets/status.png";
import contact from "./../assets/contact.png";
import login from "./../assets/register.png";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Grievances = () => {
  return (
    <div className="border border-red-900">
      <Slider
        image1={image1}
        image2={image2}
        image3={image3}
        image4={image4}
        image5={image5}
        image6={image6}
      />

      <h1 className="py-2 text-center text-white bg-green-900 rounded-sm">
        Any Grievance sent by email will not be attended to / entertained.
        Please lodge your grievance on this portal.
      </h1>

      <div className="px-[5vw]">
        <h1 className="my-4 text-xl md:text-3xl">About CPGRAMS</h1>
        <p>
          Centralised Public Grievance Redress and Monitoring System (CPGRAMS)
          is an online platform available to the citizens 24x7 to lodge their
          grievances to the public authorities on any subject related to service
          delivery. It is a single portal connected to all the
          Ministries/Departments of Government of India and States. Every
          Ministry and States have role-based access to this system. CPGRAMS is
          also accessible to the citizens through standalone mobile application
          downloadable through Google Play store and mobile application
          integrated with UMANG.
        </p>
        <p className="mt-3">
          The status of the grievance filed in CPGRAMS can be tracked with the
          unique registration ID provided at the time of registration of the
          complainant. CPGRAMS also provides appeal facility to the citizens if
          they are not satisfied with the resolution by the Grievance Officer.
          After closure of grievance if the complainant is not satisfied with
          the resolution, he/she can provide feedback. If the rating is ‘Poor’
          the option to file an appeal is enabled. The status of the Appeal can
          also be tracked by the petitioner with the grievance registration
          number.
        </p>

        <p className="flex items-center gap-2 text-xl font-semibold text-green-900">
          <Info className="w-5 my-5" />
          Issues which are not taken up for redressal :
        </p>
        <p className="flex items-center gap-2 ">
          <Dot />
          RTI Matters
        </p>
        <p className="flex items-center gap-2 ">
          <Dot /> Court related / Subjudice matters
        </p>
        <p className="flex items-center gap-2 ">
          <Dot />
          Religious matters
        </p>
        <p className="flex items-center gap-2">
          <Dot />
          Suggestions
        </p>
        <p className="flex gap-2 ">
          <Dot />
          Grievances of Government employees concerning their service matters
          including disciplinary proceedings etc. unless the aggrieved employee
          has already exhausted the prescribed channels keeping in view the DoPT
          OM No. 11013/08/2013-Estt.(A-III) dated 31.08.2015
        </p>
        <p className="flex items-center gap-2 my-5 text-xl font-semibold text-green-900">
          Note :
        </p>
        <p>
          1.If you have not got a satifactory redress of your grievance within a
          reasonable period of time,relating to Ministries/Departments and
          Organisations under the purview of Directorate of Public
          Grievances(DPG), Cabinet Secretariat, GOI, you may seek help of DPG in
          resolution. Please click here for details.
        </p>
        <p className="my-3">
          2.Government is not charging fee from the public for filing
          grievances. All money being paid by the public for filing grievance is
          going only to M/s CSC only
        </p>
      </div>
      <div className="flex flex-col justify-center gap-4 my-10 md:flex-row">
        <div className="bg-[#80c8ea] w-[300px] h-[250px] flex justify-center items-center flex-col rounded-sm group mx-auto md:mx-0">
          <img src={login} alt="" />
          <Link to='/grievances/grievances_registration_form'><Button className="mt-2 uppercase group-hover:bg-green-900 w-28 ">Register</Button></Link>
        </div>
        <div className="bg-[#e28faa] w-[300px] h-[250px] flex justify-center items-center flex-col rounded-sm group mx-auto md:mx-0">
          <img src={img_status} alt="" />
         <Link to='/status'> <Button className="mt-2 uppercase group-hover:bg-green-900 w-28">view status</Button></Link>
        </div>
        <div className="bg-[#f3cf9b] w-[300px] h-[250px] flex justify-center items-center flex-col rounded-sm group mx-auto md:mx-0">
          <img src={contact} alt="" />
          <Button className="mt-2 uppercase w-28 group-hover:bg-green-900">Contact us</Button>
        </div>
      </div>
    </div>
  );
};

export default Grievances;
