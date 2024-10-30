import React, { useState } from "react";
import user from "./../../../assets/user.svg";
import admin from "./../../../assets/admin.svg";
import employee from "./../../../assets/employee.svg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Login = ({isAuthenticated}) => {
  const [chooseLogin, setChooseLogin] = useState("");

  return (
    <div className="flex flex-col items-center justify-center mt-10 h-[70vh]">
      <h1 className="text-5xl ">Choose Your Login Type</h1>
      <p className="mb-5 text-gray-500">
        Please select the type of account you want to log into
      </p>
      <div className="flex items-center justify-center gap-10">
        <img
          src={user}
          alt=""
          className={`w-32 transition duration-300  ${
            chooseLogin === "user" ? "grayscale-0" : "grayscale"
          }`}
          onClick={() => setChooseLogin("user")}
        />
        <img
          src={admin}
          alt=""
          className={`w-32 transition duration-300 ${
            chooseLogin === "admin" ? "grayscale-0" : "grayscale"
          }`}
          onClick={() => setChooseLogin("admin")}
        />
        <img
          src={employee}
          alt=""
          className={`transition duration-300 w-44 ${
            chooseLogin === "employee" ? "grayscale-0" : "grayscale"
          }`}
          onClick={() => setChooseLogin("employee")}
        />
      </div>
      {chooseLogin === "user" ? (
       <Link to='/userlogin'>
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-500">Only for Registered User</p>
              <Button className='px-5 mt-3 text-xl uppercase bg-green-900 hover:bg-green-800'>User Login</Button>
            </div>
       </Link>
      ) : (
        ""
      )}
      {chooseLogin === "admin" ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-500">Only for Admin User</p>
          <Button className='px-5 mt-3 text-xl uppercase bg-green-900 hover:bg-green-800'>Admin Login</Button>
        </div>
      ) : (
        ""
      )}
      {chooseLogin === "employee" ? (
        <div className="flex flex-col items-center justify-center">
          <p className="mt-3 text-gray-500">Only for Employed User</p>
          <Button className='px-5 mt-3 text-xl uppercase bg-green-900 hover:bg-green-800'>Employee Login</Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Login;
