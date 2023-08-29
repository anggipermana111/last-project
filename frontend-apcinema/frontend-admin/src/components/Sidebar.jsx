import React from 'react';
import { RxDashboard } from "react-icons/rx"
import { BiCameraMovie } from "react-icons/bi"
import { ImFilm, ImExit } from "react-icons/im"
import { VscTypeHierarchy } from "react-icons/vsc"
import { FiUser } from "react-icons/fi"
import { TbBrandCinema4D } from "react-icons/tb"
import { MdOutlineChair } from "react-icons/md"
import { IoFastFoodOutline } from "react-icons/io5"
import { RiAdminLine } from "react-icons/ri"
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
// import {useHistory} from "react-router-dom"
import { useLocation } from 'react-router-dom';

function addMenu(name, icon, destination) {
    return { name, icon, destination }
}

const Sidebar = ({ isOpen }) => {
    const menus = []

    menus.push(addMenu("Dashboard", <RxDashboard size={20} />, "/"))
    menus.push(addMenu("Jadwal Tayang", <BiCameraMovie size={20} />, "/schedule"))
    menus.push(addMenu("Movie", <ImFilm size={20} />, "/film"))
    menus.push(addMenu("Genre", <VscTypeHierarchy size={20} />, "/genre"))
    menus.push(addMenu("Admin", <RiAdminLine size={20} />, "/admin"))
    menus.push(addMenu("User", <FiUser size={20} />, "/user"))
    menus.push(addMenu("Studio", <TbBrandCinema4D size={20} />, "/studio"))
    menus.push(addMenu("Kursi", <MdOutlineChair size={20} />, "/kursi"))
    menus.push(addMenu("Makanan", <IoFastFoodOutline size={20} />, "/food"))
    menus.push(addMenu("Pemesanan", <BiCameraMovie size={20} />, "/order"))
    menus.push(addMenu("Exit", <ImExit size={20} />, "/login"))
    const [select, setSelect] = useState(0);
    const location = useLocation(); // Menggunakan useLocation

    const handleMenuClick = (index) => {
        setSelect(index);
        sessionStorage.setItem('selectedMenu', index);
    };

    useEffect(() => {
        const selectedMenuIndex = sessionStorage.getItem('selectedMenu');
        if (selectedMenuIndex !== null) {
            setSelect(parseInt(selectedMenuIndex));
        }
    }, []);

    useEffect(() => {
        const currentPath = location.pathname;
        const selectedIndex = menus.findIndex(menu => menu.destination === currentPath);
        if (selectedIndex !== -1) {
            setSelect(selectedIndex);
        }
    }, [location]); // Menggunakan location sebagai dependensi


    return (
        <aside
            className={`bg-slate-200 text-black font-bold opacity-100 transition duration-300 ease-in-out ${isOpen ? 'translate-x-0 w-80' : '-translate-x-full absolute bottom-0 top-0'
                } overflow-y-scroll `}
        >
            <div>
                <nav>
                    <ul>
                        {
                            menus.map((menu, i) => {
                                return (
                                    <li key={i}>
                                        <Link to={menu.destination} className={`flex gap-3 items-center hover:bg-blue-700/20  ${select == i && 'text-blue-700'} ${menu.name == "Exit" ? 'text-red-500 hover:bg-red-300' : 'hover:text-blue-600'} w-full p-5`} onClick={() => handleMenuClick(i)}>
                                            {menu.icon}
                                            {menu.name}
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
