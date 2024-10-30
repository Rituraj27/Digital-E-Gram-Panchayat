import React from "react";
import background from "./../../assets/hero-bg (1).png";
import facebook from "./../../assets/facebook2.png";
import instagram from "./../../assets/instagram1.png";
import whatsapp from "./../../assets/whatsapp.png";
import youtube from "./../../assets/youtube2.png";
import twitter from "./../../assets/twitter.png";
import qrcode from "./../../assets/QRcode.jpg";
import app from "./../../assets/app_store.svg";
import play from "./../../assets/play_store.svg";

const Footer = () => {
  return (
    <div className="bg-green-900">
      <div className="flex items-center justify-center gap-2 pt-4 text-center">
        <h1 className="mr-5 text-3xl text-white">Follow Us</h1>
        <img src={facebook} alt="" className="w-8" />
        <img src={whatsapp} alt="" className="w-8" />
        <img src={youtube} alt="" className="w-8" />
        <img src={instagram} alt="" className="w-8" />
        <img src={twitter} alt="" className="w-8" />
      </div>
      <div className="flex flex-col p-5 mt-5 text-white lg:flex-row lg:justify-evenly">
        <div className="flex flex-col items-center gap-1 text-center">
          <img src={qrcode} alt="" className="w-32" />
          <h1>Download DGS mobile app</h1>
          <p>
            And Continue to Contribute Towards Building a New India on the Move
          </p>
          <div className="flex gap-2">
            <img src={app} alt="" />
            <img src={play} alt="" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl text-white">Home</h1>
          <p>About the Portal</p>
          <p>Site Map</p>
          <p>Privacy Policy</p>
        </div>
        <div>
          <h1 className="text-3xl text-white">About</h1>
          <p>Scheme</p>
          <p>Link to us</p>
          <p>FAQs</p>
          <p>Linking Policy</p>
        </div>
        <div>
          <h1 className="text-3xl text-white">Contact Us</h1>
          <p>
            For any queries, suggestions, or feedback, please email us at:
            dgs@dgs.gov.in
          </p>
          <p>Ph No-9876543210</p>
        </div>
      </div>
      <h1 className="p-4 text-center text-white bg-green-700">Copyright DigitalGramSwaraj ©2024. All Rights Reserved </h1>
    </div>
  );
};

export default Footer;
