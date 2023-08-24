import { Link } from "react-router-dom";

export default function ListHeaderNav({i,theme,text,select,setSelect, setBurger}) {
    const link = ["/","/about","/contact"]
    return (
        <li className="px-6 py-[5px] relative list-none" onClick={()=>{
            setSelect(i)
            setBurger(false)
        }}>
            <Link
                to={link[i]}
                className={`uppercase text-base font-bold p-[5px] relative ${select==i?`text-[#e00]`:`text-${theme}`}`}
            >
                {text}
            </Link>
        </li>
    )
}