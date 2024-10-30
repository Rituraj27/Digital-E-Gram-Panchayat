import React, { useContext, useState, useEffect } from "react";
import { Button } from "./ui/button";
import { EmployeeContext } from "./context/EmployeeContexr";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { loginEmployee, error, isAuthenticated } = useContext(EmployeeContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      toast(
        <div className="w-full p-4 text-white bg-green-900 rounded-lg">Login successful</div>
      )
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginEmployee(email, password);
  };

  return (
    <div className="relative mt-10 shadow-lg w-[450px] mx-auto p-10 border-b-8 rounded border-b-green-900">
      <Toaster/>
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <h1 className="flex gap-3 text-3xl item-center">Employee User Login</h1>
        <input
          type="email"
          placeholder="Enter your Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 py-1 mt-3 border border-gray-500 rounded-sm"
        />
        <input
          type="password"
          placeholder="Enter your Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 py-1 mt-3 border border-gray-500 rounded-sm"
        />
        <p className="w-full mt-2 text-sm text-right text-gray-500">
          Forgot Password ?
        </p>
        <p className="text-sm text-gray-500">
          Not registered?{" "}
          <Link to='/register'><span className="font-semibold text-md">Register Now</span></Link>
        </p>
        {error && <p className="text-center text-red-900 text-md">{error}</p>}
        <Button
          className="w-full mt-5 text-xl bg-green-900 hover:bg-green-800"
          type="submit"
        >
          Log in with Password
        </Button>
      </form>
    </div>
  );
};

export default Login;
