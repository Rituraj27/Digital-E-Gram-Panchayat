import React, { useContext, useEffect, useState } from "react";
import logo from "./../assets/emblem.svg";
import amrit from "./../assets/logo-amrit2.png";
import swachh from "./../assets/swachh2.png";
import { CircleUserRound, Mail, MailCheck, Send, User } from "lucide-react";
import { EmployeeContext } from "./context/EmployeeContexr";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import notification_icon from "./../assets/notification.png";
import message from "./../assets/message.png";
import { Link } from "react-router-dom";
import moment from "moment";
import { Toaster , toast } from "sonner";


const Header = () => {
  const { isAuthenticated, logoutEmployee } = useContext(EmployeeContext);
  const { getNotification, limitNotification, notificationCount , markAsRead , getLimitNotifications } =
    useContext(EmployeeContext);


  const handleLogout = () => {
    logoutEmployee();
    toast(
      <div className="w-full p-4 text-white bg-green-900 rounded-lg">
        <h1 className="text-md">Logout successfully</h1>
      </div>
    )
  };

  const handleMarkAsRead = async (notificationId) => {
    await markAsRead(notificationId);
      getNotification();
      getLimitNotifications();
  };
  return (
   <div className="px-[1vw] py-2   w-full sticky top-0 z-50 bg-white">
     <div className="toast-container"> <Toaster /></div>
      <div className="flex items-center justify-between border-b border-green-900 ">
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-8 lg:w-10 md:w-6" />
          <div>
            <h1 className="text-2xl text-green-900 md:text-xl jost lg:text-4xl">
              DigitalGramSwaraj
            </h1>
            <p className="hidden text-gray-500 lg:text-md">
              Simplified Work Based Accounting Application for Panchayati Raj
            </p>
          </div>
        </div>
  
        {!isAuthenticated ? (
          <div className="flex gap-5">
            <img src={amrit} alt="" className="w-12 lg:w-32 md:w-24" />
            <img src={swachh} alt="" className="w-12 lg:w-32 md:w-24" />
          </div>
        ) : (
          <div className="relative flex items-center gap-6">
            
            <Popover>
              <PopoverTrigger>
                <Send className="w-8 h-8 mb-1 " />
              </PopoverTrigger>
              <h1 className="absolute flex items-center justify-center w-6 h-6 text-white bg-green-900 rounded-full right-24 -top-3">
                0
              </h1>
              <PopoverContent>Place content for the popover here.</PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger>
                <img src={notification_icon} alt="" className="w-8 h-8 mb-1 " />
                <h1 className="absolute w-6 h-6 text-white bg-green-900 rounded-full right-11 -top-3">
                  {notificationCount}
                </h1>
              </PopoverTrigger>
              <PopoverContent>
              {limitNotification.length > 0 ? (
                  <div>
                    {limitNotification?.map((data, index) => (
                      <div
                        key={index}
                        onClick={() => handleMarkAsRead(data._id)}
                        className="p-1 cursor-pointer hover:bg-gray-100"
                      >
                        <p className="flex items-start gap-2">
                          { data.read ? <MailCheck className="w-20" /> : <Mail className="w-20" />}
                          <span
                            className={`${
                              data.read ? "text-gray-500" : "text-black"
                            }`}
                          >
                            {data?.message}{" "}
                            <span className="mt-1 text-sm text-gray-400 float-end">
                              {moment(data?.createdAt).fromNow()}
                            </span>
                          </span>
                        </p>
                        <hr className="my-2" />
                      </div>
                    ))}
                    {limitNotification.length > 0 && (
                      <Link to="/notifications">
                        <p className="text-center cursor-pointer">View All</p>
                      </Link>
                    )}
                  </div>
                ) : (
                  <p>No Notifications</p>
                )}
              </PopoverContent>
            </Popover>
  
            <DropdownMenu>
              <DropdownMenuTrigger>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <CircleUserRound className="w-8 h-8 focus:outline-none" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>My Account</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to='/profile'><DropdownMenuItem>Profile</DropdownMenuItem></Link>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
  
      </div>
   </div>
  );
};

export default Header;
