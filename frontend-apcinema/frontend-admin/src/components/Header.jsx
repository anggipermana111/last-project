import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b border-b-slate-600 py-5 sticky w-full top-0 left-0 z-50 bg-[#0a1e5e] mb-5">
        <div className="w-full px-4 mx-auto max-w-[1170px]">
          <div className="flex justify-between items-center">
            <Link to="/" className="w-[170px] flex items-center gap-2">
              {/* <img src={logo} alt="logo" />{" "} */}
              <span className="text-white text-3xl font-bold">
                Tiket<span className="text-red-600">Go</span>
              </span>
            </Link>
            <nav className="flex flex-wrap gap-5">
              <ul className="flex flex-wrap justify-end items-center m-0 p-0">
                <li className="px-6 py-[5px] relative list-none">
                  <Link
                    to="/schedule"
                    className="uppercase text-[#e9eeff] text-base font-bold p-[5px] relative"
                  >
                    schedule
                  </Link>
                </li>
                <li className="px-6 py-[5px] relative list-none">
                  <Link
                    to="/movie"
                    className="uppercase text-[#e9eeff] text-base font-bold p-[5px] relative"
                  >
                    movie
                  </Link>
                </li>
                <li className="px-6 py-[5px] relative list-none">
                  <Link
                    to="/studio"
                    className="uppercase text-[#e9eeff] text-base font-bold p-[5px] relative"
                  >
                    studio
                  </Link>
                </li>
                <li className="px-6 py-[5px] relative list-none">
                  <Link
                    to="/genre"
                    className="uppercase text-[#e9eeff] text-base font-bold p-[5px] relative"
                  >
                    genre
                  </Link>
                </li>
                <li className="px-6 py-[5px] relative list-none">
                  <Link
                    to="/customer"
                    className="uppercase text-[#e9eeff] text-base font-bold p-[5px] relative"
                  >
                    customer
                  </Link>
                </li>
                <li className="px-6 py-[5px] relative list-none">
                  <Link
                    to="/booking"
                    className="uppercase text-[#e9eeff] text-base font-bold p-[5px] relative"
                  >
                    booking
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
  );
}