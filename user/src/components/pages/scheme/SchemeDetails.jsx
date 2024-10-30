import axios from "axios";
import { ExternalLink } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import facebook from "./../../../assets/facebook.png";
import youtube from "./../../../assets/youtube.png";
import x from "./../../../assets/x.png";
import instagram from "./../../../assets/instagram.png";
import { Link, Element } from "react-scroll";

const SchemeDetails = () => {
  const [scheme, setScheme] = useState([]);
  const { id } = useParams();
  console.log(id);
  const getScheme = async () => {
    await axios
      .get(`http://localhost:5000/api/v1/schemes/single_scheme/${id}`)
      .then((res) => {
        console.log(res.data);
        setScheme(res.data.scheme);
      });
  };

  useEffect(() => {
    getScheme();
  }, []);

  const handleClick = () => {
    window.location.href = `${scheme.scheme_brochure}`;
  };
  return (
    <div className="px-[5vw] flex justify-between gap-10 mt-10">
      <div className="w-1/5  sticky top-[100px] h-[500px] hidden lg:block ">
        <nav className="flex flex-col gap-3">
          <Link
            to="details"
            smooth={true}
            duration={500}
            spy={true}
            activeClass="active"
            offset={-70}
            className="h-10 p-3 text-md hover:bg-[#e5e7eb] rounded-md nav-link"
          >
            Details
          </Link>
          <Link
            to="benefits"
            smooth={true}
            duration={500}
            activeClass="active"
            spy={true}
            offset={-70}
            className="h-10 p-3 text-md hover:bg-[#e5e7eb] rounded-md nav-link"
          >
            Benefits
          </Link>
          <Link
            to="eligibility"
            smooth={true}
            duration={500}
            offset={-70}
            spy={true}
            activeClass="active"
            className="h-10 p-3 text-md hover:bg-[#e5e7eb] rounded-md  "
          >
            Eligibility
          </Link>
          <Link
            to="application"
            smooth={true}
            duration={500}
            activeClass="active"
            spy={true}
            offset={-70}
            className="h-10 p-3 text-md hover:bg-[#e5e7eb] rounded-md nav-link"
          >
            Application Process
          </Link>
          <Link
            to="document"
            smooth={true}
            duration={500}
            activeClass="active"
            spy={true}
            offset={-70}
            className="h-10 p-3 text-md hover:bg-[#e5e7eb] rounded-md nav-link"
          >
            Document Required
          </Link>
          <Link
            to="sources"
            smooth={true}
            duration={500}
            activeClass="active"
            spy={true}
            offset={-70}
            className="h-10 p-3 text-md hover:bg-[#e5e7eb] rounded-md nav-link"
          >
            Sources And References
          </Link>
        </nav>
      </div>

      <div className="w-full lg:w-3/5 ">
        <h1 className="text-3xl mulish-bold">{scheme.scheme_name}</h1>
        <p className="mt-3 text-gray-500 uppercase">{scheme.scheme_dept}</p>

        <Element name="details">
          <h1 className="mt-10 text-2xl mulish-bold">Details</h1>
          <p className="mt-3 text-gray-500">
            Scheme Code : {scheme.scheme_code}
          </p>
          <p className="mt-5">{scheme.scheme_details}</p>
        </Element>

        <Element name="benefits">
          <h1 className="mt-10 text-2xl mulish-bold">Benefits</h1>
          <ul>
            {scheme.scheme_benefits?.map((item, index) => {
              return (
                <li key={index} className="mt-3">
                  {index + 1}. {item}
                </li>
              );
            })}
          </ul>
        </Element>

        <Element name="eligibility">
          <h1 className="mt-10 text-2xl mulish-bold">Elegibilty</h1>
          <ul>
            {scheme.scheme_eligibility?.map((item, index) => {
              return (
                <li key={index} className="mt-3">
                  {index + 1}. {item}
                </li>
              );
            })}
          </ul>
        </Element>

        <Element name="application">
          <h1 className="mt-10 text-2xl mulish-bold">Application Process</h1>
          <p className="mt-3">
            1. Registration on On Digital Gram Swaraj Portal Link : Register
          </p>
          <p className="mt-3">2. Already have an account: Login</p>
          <p className="mt-3">3. Fill in the required details.</p>
        </Element>

        <Element name="document">
          <h1 className="mt-10 text-2xl mulish-bold">Documents Required</h1>
          <ul>
            {scheme.scheme_documents_required?.map((item, index) => {
              return (
                <li key={index} className="mt-3">
                  {index + 1}. {item}
                </li>
              );
            })}
          </ul>
        </Element>

        <Element name="sources" className="mb-96">
          <h1 className="mt-10 text-2xl mulish-bold">Sources and References</h1>
          <p className="flex gap-3 mt-3">
            Guidelines{" "}
            <ExternalLink
              className="text-green-900 hover:scale-110"
              onClick={handleClick}
            />
          </p>
        </Element>
      </div>

      <div className="w-1/5  sticky top-[100px] h-[500px] p-3 hidden lg:block">
        <h1 className="bg-[#e5e7eb] py-3 p-3 font-normal">New and Updates</h1>
        <p className="p-3 mt-1 text-gray-500">
          No new news and updates available
        </p>
        <h1 className="bg-[#e5e7eb] py-3 p-3 font-normal mt-2 ">Share</h1>
        <div className="flex items-center justify-center gap-3 mt-3 ">
          <img
            src={facebook}
            alt=""
            className="transition duration-300 rounded-full hover:-translate-y-1"
          />
          <img
            src={instagram}
            alt=""
            className="transition duration-300 rounded-full hover:-translate-y-1"
          />
          <img
            src={x}
            alt=""
            className="transition duration-300 rounded-full hover:-translate-y-1"
          />
          <img
            src={youtube}
            alt=""
            className="transition duration-300 rounded-full hover:-translate-y-1"
          />
        </div>
      </div>
    </div>
  );
};

export default SchemeDetails;
