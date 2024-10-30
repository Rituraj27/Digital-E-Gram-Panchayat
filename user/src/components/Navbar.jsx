import React, { useState } from "react";
import { Button } from "./ui/button";
import { Menu, ArrowRightFromLine, ChevronDown, CircleUserRound } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  return (
    <div className="lg:px-[5vw] py-2 w-full flex justify-between items-center bg-green-900 text-white text-xl gap-5 z-10 sticky top-0 left-0 h-16 md:px-2 md:gap-2 px-3 ">
      <div className="flex items-center lg:gap-5 md:gap-2">
        <button className="lg:hidden" onClick={toggleMenu}>
          <Menu className="h-7 w-7 " />
        </button>
        <Link to="/" className="hidden lg:block">Home</Link>
        <Link to="/about" className="hidden lg:block">About</Link>
        <Link to="/schemes" className="hidden lg:block">Scheme</Link>
        <Link to="/dashboard" className="hidden lg:block">Dashboard</Link>
        <Link to="/grievances" className="hidden lg:block">Grievances</Link>
        <Link to="/contact" className="hidden lg:block">Contact</Link>
      
      </div>

      <div className="flex items-center gap-2">
        {!isAuthenticated ? (
          <>
            {location.pathname !== "/login" && (
              <Link to="/login">
                <Button className="gap-2 text-xl bg-green-500 lg:px-5 hover:bg-white hover:text-black md:px-3">
                  LOGIN <ArrowRightFromLine className="md:hidden lg:block" />
                </Button>
              </Link>
            )}
            {location.pathname !== "/register" && (
              <Link to="/register">
                <Button className="text-xl bg-transparent hover:bg-white hover:text-black">
                  REGISTER
                </Button>
              </Link>
            )}
          </>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <CircleUserRound className="h-7 w-7 focus:outline-none" />
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
              <Link to='/schemeApplied'><DropdownMenuItem>Scheme Applied</DropdownMenuItem></Link>
              <Link to='/grievancesApplied'><DropdownMenuItem>Grievances</DropdownMenuItem></Link>
              <Link to='/status'><DropdownMenuItem>Status</DropdownMenuItem></Link>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {isMenuOpen && (
        <div className="absolute left-0 w-full bg-green-900 top-16 lg:hidden">
          <Link to="/" className="block px-4 py-2">Home</Link>
          <Link to="/about" className="block px-4 py-2">About</Link>
          <Link to="/schemes" className="block px-4 py-2">Scheme</Link>
          <Link to="/dashboard" className="block px-4 py-2">Dashboard</Link>
          <Link to="/grievances" className="block px-4 py-2">Grievances</Link>
          <Link to="/contact" className="block px-4 py-2">Contact</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
