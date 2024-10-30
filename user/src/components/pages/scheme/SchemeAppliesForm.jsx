// SchemeAppliedForm.js
import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast, Toaster } from "sonner";
import Lottie from "lottie-react";
import loader from "./../../../assets/loader.json";

// Define the validation schema
const schema = z.object({
  name: z.string().min(3, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  mobile: z
    .string()
    .regex(/^[0-9]+$/, { message: "Mobile number must be numeric" })
    .min(10)
    .max(10),
  scheme_name: z.string().min(1, { message: "Scheme name is required" }),
  scheme_code: z.string().min(1, { message: "Scheme code is required" }),
  DOB: z.string().min(1, { message: "Date of birth is required" }),
  gender: z.enum(["male", "female"], { message: "Gender is required" }),
  photo: z.any().refine((file) => file?.length > 0, {
    message: "Password Photo is required",
  }),
  address: z.string().min(1, { message: "Address is required" }),
  aadharNo: z.string().min(12).max(12),
  aadharPhoto: z.any().refine((file) => file?.length > 0, {
    message: "Aadhar card photo is required",
  }),
  panNo: z.string().min(10).max(10),
  panPhoto: z.any().refine((file) => file?.length > 0, {
    message: "Pan card photo is required",
  }),
  nationality: z.string().min(1, { message: "Nationality is required" }),
  occupation: z.string().min(1, { message: "Occupation is required" }),
  income: z.string().min(1, { message: "Income is required" }),
  bank_account_no: z
    .string()
    .min(1, { message: "Bank account number is required" }),
  ifsc_code: z.string().min(1, { message: "IFSC code is required" }),
  bank_name: z.string().min(1, { message: "Bank name is required" }),
  bank_branch: z.string().min(1, { message: "Bank branch is required" }),
  bank_passbook: z.any().refine((file) => file?.length > 0, {
    message: "Bank Passbook is required",
  }),
  govt_officials: z
    .string()
    .min(1, { message: "Please confirm if you are a government official" }),
});

const SchemeAppliedForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const location = useLocation();
  const { scheme_name, scheme_code } = location.state || {};
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("id", id);
    for (let key in data) {
      if (data[key] instanceof FileList) {
        Array.from(data[key]).forEach((file) => formData.append(key, file));
      } else {
        formData.append(key, data[key]);
        console.log(key, data[key]);
        // console.log(formData)
      }
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/scheme/schemeApplied",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.message === "Scheme applied successfully") {
        toast(
          <div className="w-full p-4 text-white bg-green-900 rounded-lg">
            Scheme applied successfully
          </div>
        );
        navigate("/scheme_applied_success", {
          state: { scheme: response.data.data },
        });
        toast(
          <div className="w-full p-4 text-white bg-green-900 rounded-lg">
            Scheme applied successfully
          </div>
        );
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
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
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4 ">
      <Toaster />
      {scheme_name && (
        <h1 className="text-4xl text-center ">
          {scheme_name} Registration Form
        </h1>
      )}

      {/* <Lottie animationData={loader} className="w-80" /> */}

      <fieldset className="border border-green-900 px-[2vw] rounded-md lg:px-[10vw]">
        <legend className="">
          <h1 className="text-xl">Scheme Details</h1>
        </legend>
        <div className="flex flex-wrap gap-10 mt-5 mb-5">
          <div className="flex flex-col mt-5 mb-10">
            <label htmlFor="scheme_name" className="font-semibold mulish">
              Scheme Name
            </label>
            <input
              id="scheme_name"
              type="text"
              defaultValue={scheme_name}
              {...register("scheme_name")}
              className="px-3 py-1 border border-gray-300 rounded t box-shadow lg:w-96 w-80 "
            />
            {errors.scheme_name && (
              <p className="text-sm text-red-500">
                {errors.scheme_name.message}
              </p>
            )}
          </div>
          <div className="flex flex-col mt-5 mb-10">
            <label htmlFor="scheme_code" className="font-semibold mulish">
              Scheme Code
            </label>
            <input
              id="scheme_code"
              type="text"
              defaultValue={scheme_code}
              {...register("scheme_code")}
              className="px-3 py-1 border border-gray-300 rounded box-shadow lg:w-96 w-80"
            />
            {errors.scheme_code && (
              <p className="text-sm text-red-500">
                {errors.scheme_code.message}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      <fieldset className="border border-green-900 px-[2vw] rounded-md lg:px-[10vw]">
        <legend className="">
          <h1 className="text-xl">User Details</h1>
        </legend>
        <div className="flex flex-wrap gap-10 mt-5 mb-10">
          <div className="flex flex-col">
            <label htmlFor="name" className="font-semibold mulish">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your fullname"
              {...register("name")}
              className="px-3 py-1 border border-gray-300 rounded box-shadow lg:w-96 w-80"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold mulish">
              Email
            </label>
            <input
              type="text"
              placeholder="Enter your Email"
              {...register("email")}
              className="px-3 py-1 border border-gray-300 rounded box-shadow lg:w-96 w-80"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="mobile" className="font-semibold mulish">
              Phone Number
            </label>
            <input
              type="number"
              placeholder="Enter your Phone Number"
              {...register("mobile")}
              className="px-3 py-1 border border-gray-300 rounded box-shadow lg:w-96 w-80"
            />
            {errors.mobile && (
              <p className="text-sm text-red-500">{errors.mobile.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="gender" className="font-semibold mulish">
              Gender
            </label>
            <select
              id="gender"
              {...register("gender")}
              className="px-3 py-1 border border-gray-300 rounded box-shadow lg:w-96 w-80"
            >
              <option value="">Choose</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="transgender">Transgender</option>
            </select>
            {errors.gender && (
              <p className="text-sm text-red-500">{errors.gender.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="dob" className="font-semibold mulish">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              {...register("DOB")}
              className="px-3 py-1 border border-gray-300 rounded box-shadow lg:w-96 w-80"
            />
            {errors.DOB && (
              <p className="text-sm text-red-500">{errors.DOB.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="nationality" className="font-semibold mulish">
              Nationality
            </label>
            <select
              id="nationality"
              {...register("nationality")}
              className="px-3 py-1 border border-gray-300 rounded box-shadow lg:w-96 w-80"
            >
              <option value="">Choose</option>
              <option value="Indian">Indian</option>
              <option value="Others">Other</option>
            </select>
            {errors.nationality && (
              <p className="text-sm text-red-500">
                {errors.nationality.message}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      <fieldset className="border border-green-900 px-[2vw] rounded-md lg:px-[10vw]">
        <legend className="">
          <h1 className="text-xl">Personal Details</h1>
        </legend>
        <div className="flex flex-wrap gap-10 mt-5 mb-10">
          <div className="flex flex-col">
            <label htmlFor="aadhaar" className="font-semibold mulish">
              Aadhar Number
            </label>
            <input
              type="number"
              id="aadhaar"
              placeholder="Enter your Aadhar Number"
              {...register("aadharNo")}
              className="px-3 py-1 border border-gray-300 rounded box-shadow lg:w-96 w-80"
            />
            {errors.aadharNo && (
              <p className="text-sm text-red-500">{errors.aadharNo.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="pan" className="font-semibold mulish">
              PAN Number
            </label>
            <input
              type="number"
              id="pan"
              placeholder="Enter your Aadhar Number"
              {...register("panNo")}
              className="px-3 py-1 border border-gray-300 rounded box-shadow lg:w-96 w-80"
            />
            {errors.panNo && (
              <p className="text-sm text-red-500">{errors.panNo.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="address" className="font-semibold mulish">
              Address
            </label>
            <textarea
              {...register("address")}
              className="px-3 py-1 border border-gray-300 rounded box-shadow lg:w-96 w-80"
              id="address"
            ></textarea>
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="occupation" className="font-semibold mulish">
              Occupation
            </label>
            <select
              id="occupation"
              {...register("occupation")}
              className="px-3 py-1 border border-gray-300 rounded box-shadow lg:w-96 w-80"
            >
              <option value="">Choose</option>
              <option value="Farmer">Farmer</option>
              <option value="Business">Business</option>
              <option value="Govt Official">Govt Official</option>
              <option value="SHG Member">SHG GRoup</option>
              <option value="Others">Others</option>
            </select>
            {errors.occupation && (
              <p className="text-sm text-red-500">
                {errors.occupation.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="bank" className="font-semibold mulish">
              Income
            </label>
            <input
              type="number"
              id="pan"
              placeholder="Enter your Income"
              {...register("income")}
              className="px-3 py-1 border border-gray-300 rounded box-shadow lg:w-96 w-80"
            />
            {errors.income && (
              <p className="text-sm text-red-500">{errors.income.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="govt_officials">Are you Govt Employee?</label>
            <select
              name=""
              id="govt_officials"
              {...register("govt_officials")}
              className="px-3 py-1 border border-gray-300 rounded box-shadow lg:w-96 w-80"
            >
              <option value="">Choose</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.govt_officials && (
              <p className="text-sm text-red-500">
                {errors.govt_officials.message}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      <fieldset className="border border-green-900 px-[2vw] rounded-md lg:px-[10vw]">
        <legend className="">
          <h1 className="text-xl">Bank Details</h1>
        </legend>
        <div className="flex flex-wrap gap-10 mt-5 mb-10">
          <div className="flex flex-col">
            <label htmlFor="bank_name" className="font-semibold mulish">
              Bank Name
            </label>
            <input
              type="text"
              id="bank_name"
              placeholder="Enter your Bank Name"
              {...register("bank_name")}
              className="px-3 py-1 border border-gray-300 rounded box-shadow lg:w-96 w-80"
            />
            {errors.bank_name && (
              <p className="text-sm text-red-500">{errors.bank_name.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="bank_branch" className="font-semibold mulish">
              Bank Branch Name
            </label>
            <input
              type="text"
              id="bank_branch"
              placeholder="Enter your Bank Branch Name"
              {...register("bank_branch")}
              className="px-3 py-1 border border-gray-300 rounded box-shadow lg:w-96 w-80"
            />
            {errors.bank_branch && (
              <p className="text-sm text-red-500">
                {errors.bank_branch.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="ifsc_code" className="font-semibold mulish">
              Bank IFSC Code
            </label>
            <input
              type="text"
              id="ifsc_code"
              placeholder="Enter your Bank IFSC Code"
              {...register("ifsc_code")}
              className="px-3 py-1 border border-gray-300 rounded box-shadow lg:w-96 w-80"
            />
            {errors.ifsc_code && (
              <p className="text-sm text-red-500">{errors.ifsc_code.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="bank_account_no" className="font-semibold mulish">
              Bank Account Number
            </label>
            <input
              type="text"
              id="bank_account_no"
              placeholder="Enter your Bank IFSC Code"
              {...register("bank_account_no")}
              className="px-3 py-1 border border-gray-300 rounded box-shadow lg:w-96 w-80"
            />
            {errors.bank_account_no && (
              <p className="text-sm text-red-500">
                {errors.bank_account_no.message}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      <fieldset className="border border-green-900 px-[2vw] rounded-md lg:px-[10vw]">
        <legend className="">
          <h1 className="text-xl">Upload Documents</h1>
        </legend>
        <div className="flex flex-wrap gap-10 mt-5 mb-10">
          <div className="flex flex-col">
            <label htmlFor="photo" className="font-semibold mulish">
              Passport Photo
            </label>
            <input
              type="file"
              id="photo"
              placeholder="Enter your Bank IFSC Code"
              {...register("photo")}
              className="px-3 py-1 border border-gray-300 rounded box-shadow lg:w-96 w-80"
            />
            {errors.photo && (
              <p className="text-sm text-red-500">{errors.photo.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="aadharPhoto" className="font-semibold mulish">
              Aadhar Card
            </label>
            <input
              type="file"
              id="aadharPhoto"
              placeholder="Enter your Bank IFSC Code"
              {...register("aadharPhoto")}
              className="px-3 py-1 border border-gray-300 rounded box-shadow lg:w-96 w-80"
            />
            {errors.aadharPhoto && (
              <p className="text-sm text-red-500">
                {errors.aadharPhoto.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="panPhoto" className="font-semibold mulish">
              PAN Card
            </label>
            <input
              type="file"
              id="panPhoto"
              placeholder="Enter your Bank IFSC Code"
              {...register("panPhoto")}
              className="px-3 py-1 border border-gray-300 rounded box-shadow lg:w-96 w-80"
            />
            {errors.panPhoto && (
              <p className="text-sm text-red-500">{errors.panPhoto.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="bank_passbook" className="font-semibold mulish">
              Bank Passbook
            </label>
            <input
              type="file"
              id="bank_passbook"
              placeholder="Enter your Bank IFSC Code"
              {...register("bank_passbook")}
              className="px-3 py-1 border border-gray-300 rounded box-shadow lg:w-96 w-80"
            />
            {errors.bank_passbook && (
              <p className="text-sm text-red-500">
                {errors.bank_passbook.message}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      <Button>Submit</Button>
    </form>
  );
};

export default SchemeAppliedForm;
