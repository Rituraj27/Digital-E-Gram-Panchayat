import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import find from "./../../../assets/find.svg";
import { Button } from "react-scroll";

const SchemeEligibilty = () => {
  return (
    <div className="px-[15vw] py-5">
      <div className="flex flex-col gap-20 p-3 mt-10 md:flex-row ">
        <div>
          <img src={find} alt="" className="w-[500px]"/>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl md:text-3xl">Did you find your perfect scheme ?</h1>
          <p className="mt-3 text-gray-500" >Find the right scheme that aligns with your needs. Whether it's for financial assistance, welfare, or development, explore options designed to support your goals and secure your future
            If you are fulfilling all required criteria mentioned above you can
            start your loan application via checking your eligibility
          </p>
          <Button className="text-white bg-green-900 w-[180px] py-2 rounded-md text-xl mt-7">Check Eligibility</Button>
        </div>
      </div>

      <h1 className="mt-10 mb-3 text-2xl text-center">Check Your Eligibility</h1>

      <Accordion type="single" collapsible className="w-full px-3 ">
        <AccordionItem
          value="item-1"
          className="px-3 border-b-2 border-green-900 "
        >
          <AccordionTrigger>Pradhan Mantri Awas Yojana</AccordionTrigger>
          <AccordionContent className="px-3 text-black bg-white">
            <p>
              1. Families who do not have their own house or if have that have
              zero, one, or maximum two rooms with a kutcha wall and roof as per
              SECC 2011 and native resident of Rajasthan.
            </p>
            <p>
              2. Households that do not have a literate adult above 25 years or
              more of age.
            </p>
            <p>
              3. Households that have no any adult member aged between 16 and 60
              years.
            </p>
            <p>
              4. Families without any physically disabled members and with a
              disabled member.
            </p>
            <p>
              5. Landless candidates who are earning income by daily wages
              labour.
            </p>
            <p>
              6. Applicant who are belongs to Scheduled Caste (SC), Scheduled
              Tribe (ST), and Minority category , are eligible for this scheme.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-2"
          className="px-3 border-b-2 border-green-900"
        >
          <AccordionTrigger>Pradhan Mantri Awas Yojana</AccordionTrigger>
          <AccordionContent className="px-3 text-black bg-white">
            <p>
              1. Families who do not have their own house or if have that have
              zero, one, or maximum two rooms with a kutcha wall and roof as per
              SECC 2011 and native resident of Rajasthan.
            </p>
            <p>
              2. Households that do not have a literate adult above 25 years or
              more of age.
            </p>
            <p>
              3. Households that have no any adult member aged between 16 and 60
              years.
            </p>
            <p>
              4. Families without any physically disabled members and with a
              disabled member.
            </p>
            <p>
              5. Landless candidates who are earning income by daily wages
              labour.
            </p>
            <p>
              6. Applicant who are belongs to Scheduled Caste (SC), Scheduled
              Tribe (ST), and Minority category , are eligible for this scheme.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-3"
          className="px-3 border-b-2 border-green-900"
        >
          <AccordionTrigger>Pradhan Mantri Awas Yojana</AccordionTrigger>
          <AccordionContent className="px-3 text-black bg-white">
            <p>
              1. Families who do not have their own house or if have that have
              zero, one, or maximum two rooms with a kutcha wall and roof as per
              SECC 2011 and native resident of Rajasthan.
            </p>
            <p>
              2. Households that do not have a literate adult above 25 years or
              more of age.
            </p>
            <p>
              3. Households that have no any adult member aged between 16 and 60
              years.
            </p>
            <p>
              4. Families without any physically disabled members and with a
              disabled member.
            </p>
            <p>
              5. Landless candidates who are earning income by daily wages
              labour.
            </p>
            <p>
              6. Applicant who are belongs to Scheduled Caste (SC), Scheduled
              Tribe (ST), and Minority category , are eligible for this scheme.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SchemeEligibilty;
