import { useContext } from "react";
import logo from "../assets/AP-Logo.png"
import { AllContext } from "../App";
import { LiaFacebookF, LiaTwitter, LiaInstagram, LiaWhatsapp } from "react-icons/lia"
import ListSocialFooter from "./ListSocialFooter";

export default function Footer() {
    const { theme } = useContext(AllContext)
    return (
        <footer className={`footer-${theme} text-${theme} py-5`}>
            <div className={`w-full px-[15px] mx-auto flex flex-col gap-5`}>
                <div className="border-b border-b-slate-600 relative z-10 flex justify-between py-5 px-10">
                    <div className="p-0 logo flex gap-3 items-center text-lg font-bold">
                        <img src={logo} alt="footer" className="w-10 h-10" />
                        <span>
                            AP<span className="text-[#e00]">CINEMA</span>
                        </span>
                    </div>
                    <ul className=" flex justify-between items-center gap-3 lg:gap-8">
                        <ListSocialFooter>
                            <LiaFacebookF size={20} className={`text-${theme}`} />
                        </ListSocialFooter>
                        <ListSocialFooter>
                            <LiaTwitter size={20} className={`text-${theme}`} />
                        </ListSocialFooter>
                        <ListSocialFooter>
                            <LiaWhatsapp size={20} className={`text-${theme}`} />
                        </ListSocialFooter>
                        <ListSocialFooter>
                            <LiaInstagram size={20} className={`text-${theme}`} />
                        </ListSocialFooter>
                    </ul>
                </div>
                <div className="py-[25px] px-10">
                    <div className="relative z-10 justify-between items-center flex flex-col-reverse gap-5 lg:flex-row">
                        <div className="left">
                            <p className="flex flex-col items-center gap-1 md:flex-row">
                                <span>Copyright © 2023.All Rights Reserved </span>
                                <span>By{" "}
                                <a href="#0" className="text-[#00f] font-bold">
                                    Anggi Permana
                                </a></span>
                            </p>
                        </div>
                        <ul className="p-0 flex flex-wrap justify-center items-center gap-6">
                            <li className="py-0 px-[15px]">
                                <a href="#0">About</a>
                            </li>
                            <li>
                                <a href="#0">Terms Of Use</a>
                            </li>
                            <li>
                                <a href="#0">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#0">FAQ</a>
                            </li>
                            <li>
                                <a href="#0">Feedback</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}