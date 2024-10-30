import React, { useContext, useState } from "react";
import { EmployeeContext } from "./context/EmployeeContexr";
import profile from "./../assets/profile.svg";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast, Toaster } from "sonner";

const schema = z.object({
  address: z.string().min(3, { message: "Address is required" }),
  aadhar_no: z.string().min(12).max(12),
  pan_no: z.string().min(10).max(10),
  DOB: z.string().min(3, { message: "Date of Birth is required" }),
  profilePic: z
    .any()
    .refine((file) => file?.length > 0, {
      message: "Profile picture is required",
    }),
});

const Profile = () => {
  const { employee, id ,getEmployee } = useContext(EmployeeContext);
  const address = employee.address;

  const [image, setImage] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // const handleImageChange = (e) => {
  //   setValue("profile_pic", e.target.files);
  // };

  const onSubmit = async (data) => {
    console.log(data);
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
      const response = await axios.post(
        "http://localhost:5000/api/v1/employee/editEmployee",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      getEmployee(id);
      toast(
        <div className='w-full p-4 text-white bg-green-900 rounded-lg'> 
          <h1 className="text-md">Profile updated successfully</h1>
        </div>)
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return address ? (
    <div className="pt-10 lg:pt-0">
      <Toaster/>
      <Button className="float-right w-20 px-10 bg-green-900">Edit</Button>
      <h1 className="text-2xl ">Profile Section</h1>
     <div className="flex flex-col items-center gap-5 lg:flex-row lg:justify-center">
        <img
          src={employee?.profilePic}
          alt=""
          className="mt-4 rounded-full w-60"
        />
       <div>
          <p className="justify-start mt-10 text-xl">
            Name: <span className="mt-2 text-2xl">{employee?.name}</span>
          </p>
          <p className="justify-start text-xl">
            DOB: <span className="mt-2 text-2xl">{employee?.DOB}</span>
          </p>
          <p className="text-xl">
            Gender: <span className="mt-2 text-2xl">{employee?.gender}</span>
          </p>
          <p className="text-xl">
            Employee ID: <span className="mt-2 text-2xl">{employee?.adminId}</span>
          </p>
          <p className="text-xl">
            Email: <span className="mt-2 text-2xl">{employee?.email}</span>
          </p>
          <p className="text-xl">
            Phone: <span className="mt-2 text-2xl">{employee?.mobile}</span>
          </p>
          <p className="text-xl w-[60%]">
            Address: <span className="mt-2 text-2xl">{employee?.address}</span>
          </p>
          <p className="text-xl">
            Aadhar No: <span className="mt-2 text-2xl">{employee?.aadhar_no}</span>
          </p>
          <p className="text-xl">
            PAN No: <span className="mt-2 text-2xl">{employee?.pan_no}</span>
          </p>
       </div>
     </div>
    </div>
  ) : (
    <div>
      <h1 className="text-2xl">
        Welcome, <span className="text-3xl">{employee?.name}</span> Complete
        your profile
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-3 mt-5">
          <label className="w-20">Photo:</label>
          <label htmlFor="image">
            <img
              src={!image ? profile : URL.createObjectURL(image)}
              alt=""
              className="w-40 h-40 rounded-full"
            />
            <input
              type="file"
              hidden
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              {...register("profilePic")}
            />
          </label>

          {errors.profile_pic && (
            <p className="text-red-500">{errors.profile_pic.message}</p>
          )}
        </div>
        <div className="flex items-center gap-3 mt-5">
          <label className="w-20">DOB:</label>
          <input
            type="date"
            className="p-2 border border-gray-400 rounded-md w-96"
            {...register("DOB")}
          />
          {errors.DOB && <p className="text-red-500">{errors.DOB.message}</p>}
        </div>
        <div className="flex items-center gap-3 mt-5">
          <label className="w-20">Address:</label>
          <textarea
            name=""
            id=""
            className="border border-gray-400 rounded-md w-96"
            rows={5}
            {...register("address")}
          ></textarea>
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}
        </div>
        <div className="flex items-center gap-3 mt-5">
          <label className="w-20">Aadhar No:</label>
          <input
            type="number"
            className="p-2 border border-gray-400 rounded-md w-96"
            {...register("aadhar_no")}
          />
          {errors.aadhar_no && (
            <p className="text-red-500">{errors.aadhar_no.message}</p>
          )}
        </div>
        <div className="flex items-center gap-3 mt-5">
          <label className="w-20">Pan No:</label>
          <input
            type="number"
            className="p-2 border border-gray-400 rounded-md w-96"
            {...register("pan_no")}
          />
          {errors.pan_no && (
            <p className="text-red-500">{errors.pan_no.message}</p>
          )}
        </div>
        <div className="flex items-center justify-center mt-5 w-96">
          <Button className="px-10 bg-green-900">SUBMIT</Button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
