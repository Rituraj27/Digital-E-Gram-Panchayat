import axios from "axios";
import React, { useState } from "react";

const Status = () => {
  const [checked, setChecked] = useState("");
  const [scheme, setScheme] = useState("");
  const [grievance, setGrievance] = useState("");
  const [error, setError] = useState("");
  const [resultScheme, setResultScheme] = useState("");

  const handleSchemeSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post("http://localhost:5000/api/v1/user/scheme/checkSchemeStatus", { registration_no: scheme })   
        .then((res) => {
            console.log(res)
            setResultScheme(res.data.schemeApplied)
        })
    } catch (error) {
        
    }
  }

  const handleGrievanceSubmit = async (e) => {
    e.preventDefault();
    console.log(grievance)
  }

  return (
    <div className="flex flex-col items-center h-screen pt-10 mt-5 lg:pt-0">
      <h1 className="mb-4 text-2xl font-semibold text-center">
        Check Status of Scheme or Grievances
      </h1>
      <p className="text-sm text-center text-gray-600">
        Please select whether you want to check the status of your Scheme or
        Grievances below:
      </p>
      <div className="flex items-center gap-3 mt-5">
        <label htmlFor="scheme">Scheme</label>
        <input
          type="radio"
          id="scheme"
          name="status"
          onClick={() => setChecked("scheme")}
        />
        <label htmlFor="grievance">Grievance</label>
        <input
          type="radio"
          id="grievance"
          name="status"
          onClick={() => setChecked("grievance")}
        />
      </div>
      {checked === "scheme" && (
        <form className="" onSubmit={handleSchemeSubmit}>
          <input
            type="text"
            className="p-1 px-5 mt-5 text-xl text-black border border-green-900 "
            placeholder="Enter Registration Number"
            onChange={(e) => setScheme(e.target.value)}
          />
          <button
            className="p-1 px-5 mt-5 text-xl text-white bg-green-900 hover:bg-green-800"
            type="submit"
          >
            Check Status
          </button>
        </form>
      )}
      {checked === "grievance" && (
        <form onSubmit={handleGrievanceSubmit}>
          <input
            type="text"
            className="p-1 px-5 mt-5 text-xl text-black border border-green-900 "
            placeholder="Enter Grievance Number"
            onChange={(e) => setGrievance(e.target.value)}
          />
          <button
            className="p-1 px-5 mt-5 text-xl text-white bg-green-900 hover:bg-green-800"
            type="submit"
          >
            Check Status
          </button>
        </form>
      )}
      {
         resultScheme && 
         <div>
           {
              resultScheme.initial_status === 'pending' && resultScheme.finial_status === 'pending' ? <p className="mt-4 text-green-700">Your initial status is {resultScheme.initial_status}</p> : <p className="mt-4 text-green-700"> Your initial status is {resultScheme.initial_status} . Your final status is {resultScheme.final_status}</p>
           }
         </div>
      }
    </div>
  );
};

export default Status;
