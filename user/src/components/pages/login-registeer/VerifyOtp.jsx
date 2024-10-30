import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyOtp = ({isAuthenticated , setIsAuthenticated}) => {
  const location = useLocation();
  const { mobile } = location.state || {};
  const navigate = useNavigate();

  // Use the `mobile` number for your OTP verification logic
  console.log("Mobile number for OTP:", mobile);

  const FormSchema = z.object({
    pin: z.string().min(6, {
      message: "Your one-time password must be 6 characters.",
    }),
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await axios
        .post("http://localhost:5000/api/v1/user/auth/verify-otp", {
          mobile,
          otp: data.pin,
        })
        .then((res) => {
          console.log(res);
          if (res.data.message === "OTP verified") {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", res.data.user._id);
            setIsAuthenticated(true);
            navigate("/");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[80vh]">
      <div className="absolute flex items-center justify-center mx-auto transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-center ">
                    One-Time Password
                  </FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription className="text-center">
                    Please enter the one-time password sent to your phone.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-green-900">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default VerifyOtp;
