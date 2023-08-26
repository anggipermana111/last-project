import React from 'react';

import { GiHamburgerMenu } from "react-icons/gi"
import {IoPersonCircle} from "react-icons/io5"

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center px-10 sticky top-0 z-50">
      <div className="flex items-center justify-between gap-24">
        <h1 className="text-2xl ml-4 font-bold text-blue-700">Admin Cinema</h1>
        <div className="flex items-center gap-10">
        <button
          className="text-gray-600 focus:outline-none"
          onClick={toggleSidebar}
        >
          <GiHamburgerMenu color='black' size={25}/>
        </button>
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 rounded p-2 mr-4"
        />
      </div>
      </div>
      {/* <div className="w-10 h-10 rounded-full overflow-hidden"> */}
          {/* <img
            // src="path_to_profile_image.jpg" // Ganti dengan URL gambar profil
            alt="Profile"
            className="w-full h-full object-cover"
          /> */}
          <IoPersonCircle size={50} color='#888'/>
        {/* </div> */}
    </header>
  );
};

export default Header;
