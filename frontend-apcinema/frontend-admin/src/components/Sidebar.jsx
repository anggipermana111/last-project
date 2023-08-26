import React from 'react';
import { RxDashboard } from "react-icons/rx"
import { BiCameraMovie } from "react-icons/bi"
import {ImFilm,ImExit} from "react-icons/im"
import {VscTypeHierarchy} from "react-icons/vsc"
import {FiUser} from "react-icons/fi"
import {TbBrandCinema4D} from "react-icons/tb"
import {MdOutlineChair} from "react-icons/md"
import {IoFastFoodOutline} from "react-icons/io5"
import {BsTicketPerforated} from "react-icons/bs"
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
    return (
        <aside
            className={`bg-slate-200 text-black font-bold opacity-100 transition duration-300 ease-in-out ${isOpen ? 'translate-x-0 w-80' : '-translate-x-full absolute bottom-0 top-0'
                }`}
        >
            <div>
                <nav>
                    <ul>
                        <li>
                            <button className='text-blue-700 hover:bg-blue-700/20 hover:text-blue-600 w-full p-5'>
                                <Link to="/" className='flex gap-3 items-center'>
                                    <RxDashboard size={20} />
                                    Dashboard
                                </Link>
                            </button>
                        </li>
                        <li>
                            <button className='hover:bg-blue-700/20 hover:text-blue-600 w-full p-5'>
                                <Link to="/jadwal-tayang" className='flex gap-3 items-center'>
                                    <BiCameraMovie size={20} />
                                    Jadwal Tayang
                                </Link>
                            </button>
                        </li>
                        <li>
                            <button className='hover:bg-blue-700/20 hover:text-blue-600 w-full p-5'>
                                <Link to="/jadwal-tayang" className='flex gap-3 items-center'>
                                    <ImFilm size={20} />
                                    Movie
                                </Link>
                            </button>
                        </li>
                        <li>
                            <button className='hover:bg-blue-700/20 hover:text-blue-600 w-full p-5'>
                                <Link to="/jadwal-tayang" className='flex gap-3 items-center'>
                                    <VscTypeHierarchy size={20} />
                                    Genre
                                </Link>
                            </button>
                        </li>
                        <li>
                            <button className='hover:bg-blue-700/20 hover:text-blue-600 w-full p-5'>
                                <Link to="/jadwal-tayang" className='flex gap-3 items-center'>
                                    <FiUser size={20} />
                                    User
                                </Link>
                            </button>
                        </li>
                        <li>
                            <button className='hover:bg-blue-700/20 hover:text-blue-600 w-full p-5'>
                                <Link to="/jadwal-tayang" className='flex gap-3 items-center'>
                                    <TbBrandCinema4D size={20} />
                                    Studio
                                </Link>
                            </button>
                        </li>
                        <li>
                            <button className='hover:bg-blue-700/20 hover:text-blue-600 w-full p-5'>
                                <Link to="/jadwal-tayang" className='flex gap-3 items-center'>
                                    <MdOutlineChair size={20} />
                                    Kursi
                                </Link>
                            </button>
                        </li>
                        <li>
                            <button className='hover:bg-blue-700/20 hover:text-blue-600 w-full p-5'>
                                <Link to="/jadwal-tayang" className='flex gap-3 items-center'>
                                    <IoFastFoodOutline size={20} />
                                    Makanan
                                </Link>
                            </button>
                        </li>
                        <li>
                            <button className='hover:bg-blue-700/20 hover:text-blue-600 w-full p-5'>
                                <Link to="/jadwal-tayang" className='flex gap-3 items-center'>
                                    <BsTicketPerforated size={20} />
                                    Pemesanan
                                </Link>
                            </button>
                        </li>
                        <li>
                            <button className='text-red-600 bg-red-700/10 hover:bg-red-700/20 hover:text-red-500 w-full p-5'>
                                <Link to="/jadwal-tayang" className='flex gap-3 items-center'>
                                    <ImExit size={20} />
                                    Exit
                                </Link>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
