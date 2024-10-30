import React, { useEffect, useState } from "react";
import Slider from "./Slider";
import image1 from "./../../../assets/home_slider1.jpg";
import image2 from "./../../../assets/home_slider2.jpg";
import image3 from "./../../../assets/home_slider3.jpg";
import image4 from "./../../../assets/home_slider4.jpg";
import image5 from "./../../../assets/home_slider5.jpg";
import announcement_icon from "./../../../assets/announcement.svg";
import { Link } from "react-router-dom";
import apply from "./../../../assets/apply.svg";
import search from "./../../../assets/search.svg";
import check from "./../../../assets/check.svg";
import { ArrowRightFromLine } from "lucide-react";
import arrow from "./../../../assets/icons8-arrow.gif";
import box from "./../../../assets/box.svg";
import axios from "axios";

const Home = () => {
  const [announcements, setAnnouncements] = useState([]);
  const getAnnouncements = async () => {
    try {
      await axios
        .get("http://localhost:5000/api/v1/announcement/get_announcement")
        .then((res) => {
          setAnnouncements(res.data.announcement);
          console.log(res)
        })
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    getAnnouncements()
  },[])
  return (
    <div>
      <Slider
        image1={image1}
        image2={image2}
        image3={image3}
        image4={image4}
        image5={image5}
      />

      <div className="flex ">
        <div className="text-white bg-green-900 lg:w-[300px] flex justify-center items-center w-[120px]">
          <h1 className="text-sm md:text-md">Latest Updates</h1>
        </div>
        <marquee
          behavior="scroll"
          direction="left"
          className="flex justify-center gap-3 py-3 text-white bg-black "
        >
          <div className="flex flex-row gap-20 ">
            {
               announcements.map((item) => (
                <div className="flex flex-row items-center gap-3">
                <img src={announcement_icon} alt="" className="w-8" />
                <p>{item.announcement_details}</p>
              </div>
               ))
            }
            
          </div>
        </marquee>
        <div className="text-white bg-green-900 w-[300px]  justify-center items-center hidden lg:block"></div>
      </div>

      <div className="flex flex-col flex-wrap items-center justify-center gap-5 mt-10 mb-5 md:flex-row">
        <div className="w-[300px] h-[100px] bg-green-900 text-white rounded-lg flex flex-col justify-center items-center gap-1 hover:-translate-y-2 transition duration-300 cursor-pointer border-b-8 border-green-600">
          <p>योजनाओं की जानकारी</p>
          <p>Click here for information of scheme</p>
        </div>
        <Link to="/schemes">
          <div className="w-[300px] h-[100px] bg-green-900 text-white rounded-lg flex flex-col justify-center items-center gap-1 hover:-translate-y-2 transition duration-300 cursor-pointer border-b-8 border-green-600 ">
            <p>योजनाओं के लाभार्थी</p>
            <p> Click here for Schemes</p>
          </div>
        </Link>
        <Link to="/scheme_eligibity">
          <div className="w-[300px] h-[100px] bg-green-900 text-white rounded-lg flex flex-col justify-center items-center gap-1 hover:-translate-y-2 transition duration-300 cursor-pointer border-b-8 border-green-600">
            <p>योजनाओं की पात्रता</p>
            <p>Click here for Scheme Eligibility</p>
          </div>
        </Link>
        <div className="w-[300px] h-[100px] bg-green-900 text-white rounded-lg flex flex-col justify-center items-center gap-1 hover:-translate-y-2 transition duration-300 cursor-pointer border-b-8 border-green-600">
          <p>योजनाओं की पहुँच</p>
          <p>Click here for Scheme Penetration</p>
        </div>
      </div>

      <div
        className="mt-10 mb-10"
        style={{
          backgroundImage: `url(${box})`,
        }}
      >
        <p className="text-center text-gray-500">How it works</p>
        <h1 className="text-4xl text-center">
          Easy steps to apply for Government Schemes
        </h1>
        <div className="flex flex-col items-center justify-center gap-10 lg:flex-row">
          <div className="flex flex-col items-center justify-center w-[250px] text-center p-4 border border-gray-500 rounded-md mt-10 h-[200px] border-b-8 border-b-red-900 shadow-2xl hover:border-red-900 hover:-translate-y-4 transition duration-300">
            <img src={check} alt="" />
            <p className="mt-2 text-2xl text-red-900 jost">Enter Details</p>
            <p className="mt-2">
              Start by entering your{" "}
              <span className="font-semibold">basic details!</span>
            </p>
          </div>

          <img src={arrow} alt="" className="hidden lg:block"/>

          <div className="flex flex-col items-center justify-center w-[250px] text-center p-4 border border-gray-500 rounded-md mt-10 h-[200px] border-b-8 border-b-blue-900 shadow-2xl hover:border-blue-900 hover:-translate-y-4 transition duration-300">
            <img src={search} alt="" />
            <p className="mt-2 text-2xl text-blue-900 jost">Search</p>
            <p className="mt-2">
              Our search engine will{" "}
              <span className="font-semibold">find the relevant schemes!</span>
            </p>
          </div>

          <img src={arrow} alt="" className="hidden lg:flex"/>

          <div className="flex flex-col items-center justify-center w-[250px] text-center p-4 border border-gray-500 rounded-md mt-10 h-[200px] border-b-8 border-b-green-900 shadow-2xl hover:border-green-900  hover:-translate-y-4 transition duration-300">
            <img src={apply} alt="" />
            <p className="mt-2 text-2xl text-green-900 jost">Select & Apply</p>
            <p className="mt-2">
              <span className="font-semibold">Select and apply</span> for the
              best suited scheme
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
