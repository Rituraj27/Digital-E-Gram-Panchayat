import React from "react";
import map from "./../assets/map.gif";
import swatchh from './../assets/SHS-English.jpg';



const Dashboard = () => {
  return (
    <div className="flex flex-col justify-center gap-4 lg:flex-row">
      <img src={map} alt="" />
      <div className="flex flex-wrap gap-4 p-3 mt-5 lg:mt-5">
        <img src={swatchh} alt="" />
        <div className=" lg:w-[320px] lg:h-[150px] bg-blue-900 rounded-md p-3 mx-auto w-full">
          <h1 className="text-xl text-white">No Of Application</h1>
          <p className="text-6xl font-bold text-white">10000+</p>
        </div>
        <div className=" lg:w-[320px] lg:h-[150px] bg-green-900 rounded-md p-3 mx-auto w-full">
          <h1 className="text-xl text-white">Approved</h1>
          <p className="text-6xl font-bold text-white">5780</p>
        </div>
        <div className=" lg:w-[320px] lg:h-[150px] bg-red-900 rounded-md p-3 mx-auto w-full">
          <h1 className="text-xl text-white">Rejected</h1>
          <p className="text-6xl font-bold text-white">1050</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
