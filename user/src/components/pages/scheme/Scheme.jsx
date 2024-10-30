import React, { useEffect, useState } from "react";
import banner from "./../../../assets/inner-banner02.jpg";
import pdf from "./../../../assets/pdf.svg";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import click_here from "./../../../assets/click-here.gif";
import { Link, useNavigate } from "react-router-dom";

const Scheme = () => {
  const [scheme, setScheme] = useState([]);
  const navigate = useNavigate();
  const listSchemes = async () => {
    try {
      await axios
        .get("http://localhost:5000/api/v1/schemes/list_scheme")
        .then((res) => {
          setScheme(res.data.products);
          console.log(res.data);
          console.log(scheme);
        });
    } catch (error) {
      console.log(error);
      console.log("Something went wrong");
    }
  };

  useEffect(() => {
    listSchemes();
  }, []);

const handleSchemeForm = (scheme_name, scheme_code) =>{
  console.log(scheme_name, scheme_code)
  navigate('/apply' , {state : {scheme_name:scheme_name, scheme_code:scheme_code}})
}

  const handleClick = (pdfUrl) => {
    window.location.href = pdfUrl;
    console.log(pdfUrl)
  };

  return (
    <div className="">
      <img src={banner} alt="" />
      <div className="px-[5vw] py-3">
        <h1 className="text-3xl">Schemes/programmes</h1>
      </div>
      <div className="flex flex-col justify-center mx-auto mt-5 align-middle item-center px-[5vw]">
        <Table>
          <TableHeader className="hover:bg-black">
            <TableRow className="bg-black">
              <TableHead className="w-[100px] text-white">Sl No</TableHead>
              <TableHead className="text-white">Title</TableHead>
              <TableHead className="text-white">Brochure</TableHead>
              <TableHead className="text-white ">Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scheme.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
               <Link to={`/scheme/${item._id}`}> <TableCell className='md:text-xl sm:text-md hover:underline'>{item?.scheme_name}</TableCell></Link>
                <TableCell>
                  <img
                    src={pdf}
                    alt=""
                    className="w-10 cursor-pointer"
                    onClick={() => handleClick(item?.scheme_brochure)}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <img src={click_here} alt="" className="w-20" onClick={()=>handleSchemeForm(item?.scheme_name,item?.scheme_code)}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Scheme;
