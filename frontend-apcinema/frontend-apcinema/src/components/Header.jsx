import { Link } from "react-router-dom";
import { useContext } from "react";
import { AllContext } from "../App";
import ListHeaderNav from "./ListHeaderNav";
import Logo from "../assets/AP-Logo.png"
import { FaSun, FaMoon } from "react-icons/fa"
import { IoClose } from "react-icons/io5"
import { GiHamburgerMenu } from "react-icons/gi"
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function addMenu(name, destination) {
    return { name, destination }
}

export default function Header() {
    const { theme, setTheme, burger, setBurger, select, setSelect, isHasLogin, setIsHasLogin } = useContext(AllContext)
    const location = useLocation()
    const menus = []
    menus.push(addMenu("Home", "/"))
    menus.push(addMenu("About", "/about"))
    menus.push(addMenu("Contact", "/contact"))
    const currentPath = location.pathname
    if(currentPath != "/about" && currentPath != "/contact") {
        localStorage.setItem("home",currentPath)
    }
    menus[0].destination = localStorage.getItem("home")

    useEffect(() => {
        const currentPath = location.pathname;
        const selectedIndex = menus.findIndex(menu => menu.destination === currentPath);
        if (selectedIndex !== -1) {
            setSelect(selectedIndex);
        } else {
            setSelect(0)
        }
    }, [location]); // Menggunakan location sebagai dependensi
    return (
        <>
            <header className={`border-b border-b-slate-600 py-5 fixed w-full top-0 left-0 z-50 header-${theme} backdrop-blur px-4 sm:px-8 md:px-16`}>
                <div className="w-full mx-auto max-w-[1170px]">
                    <div className="flex justify-between items-center">
                        <Link to="/" className="w-[170px] flex items-center justify-center">
                            <img src={Logo} alt="" className="w-9 h-9 md:w-14 md:h-14 rounded-full -mb-1" />
                            <span className={`text-${theme} text-2xl md:text-3xl font-bold`}>
                                AP<span className="text-[#f11]">CINEMA</span>
                            </span>
                        </Link>

                        <div className="lg:hidden cursor-pointer" onClick={() => setBurger(!burger)}>
                            {
                                burger ? <IoClose size={30} color={theme == "dark" ? "white" : "black"} /> : <GiHamburgerMenu size={30} color={theme == "dark" ? "white" : "black"} />
                            }
                        </div>

                        <nav className="hidden lg:flex lg:gap-5">
                            <ul className="flex flex-wrap justify-end items-center m-0 p-0">
                                {
                                    menus.map((menu, i) => {
                                        return <li key={i} className="px-6 py-[5px] relative list-none" >
                                            <Link
                                                onClick={() => {
                                                    setSelect(i)
                                                    setBurger(false)
                                                }}
                                                to={menu.destination}
                                                className={`uppercase text-base font-bold p-[5px] relative ${select == i ? `text-[#e00]` : `text-${theme}`}`}
                                            >
                                                {menu.name}
                                            </Link>
                                        </li>
                                    })
                                }
                                <li>
                                    <button className={`theme theme-${theme} hover:bg-slate-400`} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                                        {
                                            theme === 'light' ? <FaMoon size={18} color="black" title="change to dark mode" /> : <FaSun size={20} color="white" title="change to light mode" />
                                        }
                                    </button >
                                </li>
                            </ul>
                            kjshk
                            {
                                isHasLogin ? (
                                    <button
                                        type="button"
                                        className="font-semibold text-white text-base uppercase bg-gradient-to-r from-[#e00] via-[#c0c] to-[#00e] rounded-[30px] h-[50px] w-auto px-[50px] hover:shadow-[0_10px_15px_0_rgba(59,55,188,0.5)] transition duration-300"
                                        onClick={() => {
                                            setIsHasLogin(false)
                                            localStorage.removeItem("email")
                                        }}
                                    >
                                        Logout
                                    </button>
                                ) : (
                                    <Link to="/register">
                                        <button
                                            type="button"
                                            className="font-semibold text-white text-base uppercase bg-gradient-to-r from-[#e00] via-[#c0c] to-[#00e] rounded-[30px] h-[50px] w-auto px-[50px] hover:shadow-[0_10px_15px_0_rgba(59,55,188,0.5)] transition duration-300"
                                        >
                                            Join Us
                                        </button>
                                    </Link>
                                )
                            }
                        </nav>
                    </div>
                </div>
            </header>

            {/* Tampilan tombol light/dark mode ketika layar kecil */}
            <button className={`lg:hidden fixed top-[18px] md:top-[26px] right-20 md:right-32 z-50 theme theme-${theme} hover:bg-slate-400`} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {
                    theme === 'light' ? <FaMoon size={18} color="black" title="change to dark mode" /> : <FaSun size={20} color="white" title="change to light mode" />
                }
            </button >

            {/* Tampilan navbar ketika layar kecil */}
            {
                burger && (
                    <nav className={`lg:hidden fixed header-${theme} z-50 top-[72px] md:top-[92px] w-full flex justify-center`}>
                        <ul className="flex flex-col items-center gap-5 py-5">
                            {
                                ["Home", "About Us", "Contact"].map((list, i) => {
                                    return <ListHeaderNav key={i} i={i} theme={theme} text={list} select={select} setSelect={setSelect} setBurger={setBurger} />
                                })
                            }
                            <li>
                                <Link to="/register">
                                    <button
                                        type="button"
                                        className="font-semibold text-white text-base uppercase bg-gradient-to-r from-[#e00] via-[#c0c] to-[#00e] rounded-[30px] h-[50px] w-auto px-[50px] hover:shadow-[0_10px_15px_0_rgba(59,55,188,0.5)] transition duration-300"
                                    >
                                        Join Us
                                    </button>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                )
            }
        </>
    )
}