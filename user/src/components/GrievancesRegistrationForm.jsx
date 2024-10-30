import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast, Toaster } from "sonner";
import Lottie from "lottie-react";
import loader from './../assets/loader.json';


const schema = z.object({
  name: z.string().min(3, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  mobile: z
    .string()
    .regex(/^[0-9]+$/, { message: "Mobile number must be numeric" })
    .min(10)
    .max(10),
  country: z.string().min(3, { message: "Country is required" }),
  state: z.string().min(3, { message: "State is required" }),
  district: z.string().min(3, { message: "District is required" }),
  address: z.string().min(3, { message: "Address is required" }),
  DOB: z.string().min(3, { message: "Date of birth is required" }),
  gender: z.string().min(3, { message: "Gender is required" }),
  description: z.string().min(3, { message: "Description is required" }),
  grievance_category: z
    .string()
    .min(3, { message: "Grievance Category is required" }),
  grievance_type: z.string().min(3, { message: "Grievance Type is required" }),
  document: z
    .any()
    .refine((file) => file?.length > 0, { message: "Document is required" }),
});

const GrievancesRegistrationForm = ({ isAuthenticated }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)
  const id = localStorage.getItem("id");

 

  const onSubmit = async (data) => {
    setLoading(true);
    console.log("Submitted Data:", data);
  
    const formData = new FormData();
    formData.append("id", id);
  

    for (let key in data) {
      if (data[key] instanceof FileList) {
        if (data[key].length > 0) {
          formData.append(key, data[key][0]); // Append the first file if it's a FileList
        } else {
          formData.append(key, ""); // Handle the case where there is no file selected
        }
      } else {
        formData.append(key, data[key]);
      }
    }  




    
  
    console.log("FormData entries:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/v1/grievances/apply", formData ,{
         headers:{
           "Content-Type":"multipart/form-data"
         }
      });
  
      if (response.data.message === 'Grievances applied successfully') {
        toast(
          <div className="w-full p-4 text-white bg-green-900 rounded-lg">
            Grievances applied successfully
          </div>
        )
        navigate('/grievances_success', { state: { grievance: response.data.data } });
      }
  
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    } finally{
      setLoading(false);
    }
  };


   if (loading) {
    return (
      <div className="flex items-center justify-center w-[100vw] h-[90vh]">
        <Lottie animationData={loader} className="w-40 lg:w-80 md:w-60" />
      </div>
    );
  }
  
  
  
  return isAuthenticated ? (
    <form className="mb-20 px-[5vw]" onSubmit={handleSubmit(onSubmit)}>
      <Toaster/>
      <h1 className="my-4 text-3xl text-center">Grievance Registration Form</h1>
      <fieldset className="border border-green-900 px-[2vw] rounded-md">
        <legend className="">
          <h1 className="text-xl">Personal Details</h1>
        </legend>
        <div className="flex flex-col mt-5 mb-10">
          <div className="flex flex-col justify-between md:flex-col lg:flex-row">
            <div className="lg:w-[30%] mt-3 md:w-full">
              <div className="flex flex-col">
                <label htmlFor="name" className="font-semibold mulish">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your fullname"
                  {...register("name")}
                  className="px-3 py-1 border border-gray-300 rounded box-shadow"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="flex flex-col mt-3">
                <label htmlFor="gender" className="font-semibold mulish">
                  Gender
                </label>
                <select
                  name="gender"
                  id="gender"
                  className="px-3 py-1 border border-gray-300 rounded box-shadow"
                  {...register("gender")}
                >
                  <option value="">Choose</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && (
                  <p className="text-sm text-red-500">
                    {errors.gender.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col mt-3">
                <label htmlFor="country" className="font-semibold mulish">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  defaultValue="India"
                  {...register("country")}
                  className="px-3 py-1 border border-gray-300 rounded box-shadow"
                />
                {errors.country && (
                  <p className="text-sm text-red-500">
                    {errors.country.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col mt-3">
                <label
                  htmlFor="grievance_category"
                  className="font-semibold mulish"
                >
                  Grievance Category
                </label>
                <input
                  type="text"
                  name="grievance_category"
                  id="grievance_category"
                  {...register("grievance_category")}
                  className="px-3 py-1 border border-gray-300 rounded box-shadow"
                />
                {errors.grievance_category && (
                  <p className="text-sm text-red-500">
                    {errors.grievance_category.message}
                  </p>
                )}
              </div>
            </div>

            <div className="lg:w-[30%] mt-3 md:w-full">
              <div className="flex flex-col mt-3">
                <label htmlFor="mobile" className="font-semibold mulish">
                  Mobile Number
                </label>
                <input
                  type="number"
                  name="mobile"
                  id="mobile"
                  {...register("mobile")}
                  className="px-3 py-1 border border-gray-300 rounded box-shadow"
                />
                {errors.mobile && (
                  <p className="text-sm text-red-500">
                    {errors.mobile.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col mt-3">
                <label htmlFor="email" className="font-semibold mulish">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  {...register("email")}
                  className="px-3 py-1 border border-gray-300 rounded box-shadow"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">
                    {" "}
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col mt-3">
                <label htmlFor="state" className="font-semibold mulish">
                  State/UT
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  {...register("state")}
                  className="px-3 py-1 border border-gray-300 rounded box-shadow"
                />
                {errors.state && (
                  <p className="text-sm text-red-500">{errors.state.message}</p>
                )}
              </div>
              <div className="flex flex-col mt-3">
                <label
                  htmlFor="grievance_type"
                  className="font-semibold mulish"
                >
                  Grievance Type
                </label>
                <input
                  type="text"
                  name="grievance_type"
                  id="grievance_type"
                  {...register("grievance_type")}
                  className="px-3 py-1 border border-gray-300 rounded box-shadow"
                />
                {errors.grievance_type && (
                  <p className="text-sm text-red-500">
                    {errors.grievance_type.message}
                  </p>
                )}
              </div>
            </div>

            <div className="lg:w-[30%] mt-3 md:w-full">
              <div className="flex flex-col mt-3">
                <label htmlFor="address" className="font-semibold mulish">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  {...register("address")}
                  placeholder="Enter your address"
                  className="px-3 py-1 border border-gray-300 rounded box-shadow"
                />
                {errors.address && (
                  <p className="text-sm text-red-500">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col mt-3">
                <label htmlFor="DOB" className="font-semibold mulish">
                  Date Of Birth
                </label>
                <input
                  type="date"
                  name="DOB"
                  id="DOB"
                  {...register("DOB")}
                  className="px-3 py-1 border border-gray-300 rounded box-shadow"
                />
                {errors.DOB && (
                  <p className="text-sm text-red-500">{errors.DOB.message}</p>
                )}
              </div>
              <div className="flex flex-col mt-3">
                <label htmlFor="district" className="font-semibold mulish">
                  District
                </label>
                <input
                  type="text"
                  name="district"
                  id="district"
                  {...register("district")}
                  className="px-3 py-1 border border-gray-300 rounded box-shadow"
                />
                {errors.district && (
                  <p className="text-sm text-red-500">
                    {errors.district.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col mt-3">
                <label htmlFor="document" className="font-semibold mulish">
                  Upload Document
                </label>
                <input
                  type="file"
                  name="document"
                  id="document"
                  className="px-3 py-1 border border-gray-300 rounded box-shadow"
                  {...register("document")}
                />
                {errors.document && (
                  <p className="text-sm text-red-500">
                    {errors.document.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-col mt-3">
              <label htmlFor="description" className="font-semibold mulish">
                Description
              </label>
              <textarea
                type="text"
                name="description"
                id="description"
                {...register("description")}
                rows={5}
                className="w-full px-3 py-1 border border-gray-300 box-shadow"
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mt-5">
            <Button className="px-10 mt-5 text-xl text-black bg-transparent border border-black hover:text-green-900 hover:border-green-900 hover:bg-transparent">
              Reset
            </Button>
            <Button
              className="px-10 mt-5 text-xl text-white bg-green-900 border border-black "
              type="submit"
            >
              Submit
            </Button>
          </div>
        </div>
      </fieldset>
    </form>
  ) : (
    <div className="h-[70vh]">
      <h1 className="mt-4 text-2xl text-center">
        Grievance can now be lodged only by registered users..
      </h1>
      <p className="my-2 text-center">
        If you are a registered user, then login to DGS by providing
        Username and Password in User <Link to="/userLogin" className="font-bold text-green-900 ">Login</Link> section.
      </p>
      <p className="my-2 text-center"> Not yet registered! Click here to <Link to="/register" className="font-bold text-green-900 ">register</Link >.</p>
    </div>
  );
};

export default GrievancesRegistrationForm;
