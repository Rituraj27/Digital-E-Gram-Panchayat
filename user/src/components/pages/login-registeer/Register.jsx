import React, { useState } from "react";
import sms from "./../../../assets/register-sms.png";
import { Button } from "@/components/ui/button";
import { CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, Toaster } from "sonner";

// Define schema using Zod
const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  mobile: z
    .string()
    .length(10, { message: "Mobile number must be exactly 10 digits" })
    .regex(/^[0-9]+$/, { message: "Mobile number is not valid" }),
    // .transform(val => `+91${val}`),
  country: z.string().min(1, { message: "Country is required" }),
  state: z.string().min(1, { message: "State is required" }),
  gender: z.enum(["male", "female"], { message: "Gender is required" }),
});

const RegisterForm = () => {
  const [countryid, setCountryid] = useState("");
  const [stateid, setstateid] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    await axios
      .post("http://localhost:5000/api/v1/user/registerUser", data)
      .then((res) => {
        toast(
          <div className="w-full p-4 text-white bg-green-900 rounded-lg">
            <h1 className="text-md">User registered successfully</h1>
          </div>
        )
      });
  };

  return (
    <div className="lg:h-[70vh] md:h-[100%] mb-20">
      <Toaster/>
      <div className="flex flex-col items-center justify-center mt-10 ">
        <h1 className="text-2xl">Create a DigitalGramSwaaraj Account</h1>
        <p className="text-gray-500">
          Already have an Account?
         <Link to='/userlogin'> <span className="font-semibold text-gray-600">Log In </span></Link>
        </p>
        <div className="flex flex-col items-center justify-center gap-10 mt-10 lg:flex-row md:flex-col sm:flex-col">
          <img src={sms} alt="" className="mt-3 md:mt-0" />

          <div>
            <form
              className="flex flex-col items-center justify-center w-[350px] mx-auto"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                id="name"
                type="text"
                placeholder="Enter your Name"
                {...register("name")}
                className="w-full p-3 py-1 mt-3 border border-gray-500 rounded-sm"
              />
              {errors.name && (
                <p className="text-red-500 text-[12px] items-baseline">{errors.name.message}</p>
              )}

              <select
                {...register("gender")}
                className="w-full p-3 py-1 mt-3 border border-gray-500 rounded-sm"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-[12px]">{errors.gender.message}</p>
              )}

              <input
                id="email"
                type="text"
                placeholder="Enter your Email"
                {...register("email")}
                className="w-full p-3 py-1 mt-3 border border-gray-500 rounded-sm"
              />
              {errors.email && (
                <p className="text-red-500 text-[12px]">{errors.email.message}</p>
              )}

              <input
                type="password"
                placeholder="Enter your Password"
                {...register("password")}
                className="w-full p-3 py-1 mt-3 border border-gray-500 rounded-sm"
              />
              {errors.password && (
                <p className="text-[12px] text-red-500">{errors.password.message}</p>
              )}

              <input
                type="tel"
                placeholder="Enter your Mobile Number"
                {...register("mobile")}
                className="w-full p-3 py-1 mt-3 border border-gray-500 rounded-sm"
              />
              {errors.mobile && (
                <p className="text-red-500 text-[12px]">{errors.mobile.message}</p>
              )}

              <div className="w-full mt-3">
                <CountrySelect
                  onChange={(e) => {
                    setCountryid(e.id);
                    setValue("country", e.name); // Set value for react-hook-form
                  }}
                  placeHolder="Select Country"
                />
              </div>
              {errors.country && (
                <p className="text-red-500 text-[12px]">{errors.country.message}</p>
              )}

              <div className="w-full mt-3">
                <StateSelect
                  style={{ width: "100%" }}
                  countryid={countryid}
                  onChange={(e) => {
                    setstateid(e.id);
                    setValue("state", e.name); // Set value for react-hook-form
                  }}
                  placeHolder="Select State"
                />
              </div>
              {errors.state && (
                <p className="text-red-500 text-[12px]">{errors.state.message}</p>
              )}

              <Button
                className="w-full mt-5 text-xl bg-green-900 hover:bg-green-800"
                type="submit"
              >
                Create new Account
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
