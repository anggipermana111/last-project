export default function ListSocialFooter(props) {
    return (
        <li className="border-slate-500 border w-9 h-9 flex items-center justify-center rounded-full hover:bg-gradient-to-r from-[#5560ff] via-[#aa52a1] to-[#ff4343] transition duration-300 hover:bg-[#31d7a9] cursor-pointer">
            {props.children}
        </li>
    )
}