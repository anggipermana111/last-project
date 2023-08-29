import { Link } from "react-router-dom"
import Error from "../assets/404.png"
import {BsArrowRight} from "react-icons/bs"

export default function ErrorPage() {
  return (
    <div className="w-full py-[100px] flex flex-col gap-5 justify-center items-center bg-slate-900">
      <img className="lg:w-1/2" src={Error} alt="Error Page 404" />
      <div className="flex flex-col justify-center items-center gap-5">
        <h1 className="text-2xl font-bold text-white">Oops.. Looks Like You Got Lost :{"("}</h1>
        <Link to="/">
          <button
            type="button"
            className="bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 rounded-[30px] h-[50px] w-auto px-[50px] hover:shadow-[0_10px_15px_0_rgba(59,55,188,0.5)] transition duration-300 flex items-center gap-5"
          >
            <span className="font-semibold text-white text-base uppercase ">Back To Home</span><BsArrowRight color="white" size={25}/>
          </button>
        </Link>
      </div>
    </div>
  )
}
