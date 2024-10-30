import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { set } from "zod";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { UserContext } from "@/components/context/UserContext";

const UserLogin = ({isAuthenticated , setIsAuthenticated}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const [mobile, setMobile] = useState("");

  const navigate = useNavigate();


  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5000/api/v1/user/loginUser", formData)
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", res.data.user._id);
            setIsAuthenticated(true);
            localStorage.setItem("isAuthenticated",isAuthenticated)
            navigate("/");
          }
        });
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  const handleOtpLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5000/api/v1/user/auth/generate-otp", { mobile })
        .then((res) => {
          console.log(res);
          if (res.data.message === "OTP sent successfully") {
            // localStorage.setItem("id", res.data.user._id);
            navigate("/auth/verify-otp", { state: { mobile } });
          }
        });
    } catch (error) {
      console.log(error);
    }
    console.log("clicked");
  };

  return (
    <div className="relative mt-10 h-[80vh]">
      <form
        className="flex flex-col items-center justify-center w-[350px] mx-auto"
        onSubmit={handleOtpLogin}
      >
        <h1 className="text-lg ">Log In to your DigitalGramSwaraj account</h1>
       
        <input
          type="number"
          name="mobile"
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Enter phone number"
          required
          className="w-full p-3 py-1 mt-3 border border-gray-500 rounded-sm focus-outline-none "
        />
        <p className="text-red-500 text-md">{setError}</p>
        <Button
          className="w-full mt-5 text-xl bg-green-900 hover:bg-green-800"
          type="submit"
        >
          Log in with OTP
        </Button>
      </form>

      <form
        className="flex flex-col items-center justify-center w-[350px] mx-auto"
        onSubmit={handleEmailLogin}
      >
        <div className="relative flex items-center justify-center w-full my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative px-4 text-gray-500 bg-white">OR</div>
        </div>
        <input
          type="type"
          placeholder="Enter your Email"
          required
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-3 py-1 mt-3 border border-gray-500 rounded-sm"
        />
        <input
          type="password"
          placeholder="Enter your Password"
          required
          name="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full p-3 py-1 mt-3 border border-gray-500 rounded-sm"
        />
        <p className="w-full mt-2 text-sm text-right text-gray-500">
          Forgot Password ?
        </p>
        <p className="text-sm text-gray-500">
          Not registered with DigitalGramSwaraj account?
          <Link to='/register'><span className="font-semibold text-md">Register Now</span></Link>
        </p>
        <p className="text-red-500 text-md">{error}</p>
        <Button className="w-full mt-5 text-xl bg-green-900 hover:bg-green-800">
          Log in with Password
        </Button>
      </form>
    </div>
  );
};

export default UserLogin;
