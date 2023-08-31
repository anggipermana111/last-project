import { useContext } from "react"
import aboutImage from "../assets/man.png"
import { AllContext } from "../App"
import { useEffect } from "react";

export default function About() {
  useEffect(()=>{
    window.scrollTo(0, 0);
},[])
  // const {theme} = useContext(AllContext)
  return (
    <div className="pt-20 px-10 flex flex-col gap-20 md:w-full md:grid md:grid-cols-2 md:p-20 md:gap-32 md:items-center md:pt-36">
      <img
        src={aboutImage}
        alt="About Us"
      />
      <div>
        <h1 className="text-3xl font-semibold  mb-4">
          About Us
        </h1>
        <p className="">
          We are a team of passionate individuals dedicated to creating amazing products. Our mission is to provide the best experience for our users.
        </p>
        <div className="mt-6">
          <h2 className="text-xl font-semibold  mb-2">
            Our Values
          </h2>
          <ul className=" list-disc list-inside">
            <li>Quality</li>
            <li>Innovation</li>
            <li>Customer Satisfaction</li>
          </ul>
        </div>
      </div>
    </div>
  )
}