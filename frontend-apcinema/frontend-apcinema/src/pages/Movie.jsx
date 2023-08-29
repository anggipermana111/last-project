import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom"
import video from "../assets/video-button.png"
import { useContext } from "react";
import { AllContext } from "../App";
import { Link } from "react-router-dom";

export default function Movie() {
    const { id } = useParams()
    const [movie, setMovie] = useState()
    const [schedules, setSchedules] = useState()
    const [selected, setSelected] = useState(null);
    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(`http://localhost:8080/api/film/get-film/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setMovie(data.Response)
            });
    }, []);
    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(`http://localhost:8080/api/schedule/get-schedule-by-film/${id}`)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data.Response);
                setSchedules(data.Response)
            });
    }, []);
    return (
        <>
            {/* Banner Section */}
            <section
                style={{ backgroundImage: `url(${movie?.poster})` }}
                className={`bg-cover bg-center bg-no-repeat pt-[235px] pb-[20px] relative `}
            >
                <div className="w-full h-full bg-slate-950/95 absolute top-0 left-0"></div>
                <div className="max-w-[1170px] w-full px-[15px] mx-auto">
                    <div className="relative z-10">
                        <div className="w-[calc(25%-28px)] block absolute top-0 left-0 border border-[#17305f] overflow-hidden rounded-[5px]">
                            <img
                                src={movie?.poster}
                                alt="movie"
                                className="w-full overflow-clip"
                            />
                            <a
                                href={movie?.trailer}
                                className="w-[81px] h-[81px] absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10"
                            >
                                <img
                                    src={video}
                                    alt="movie"
                                    className="w-full align-middle overflow-clip z-40"
                                />
                            </a>
                        </div>
                        <div className="ml-[25%] pt-10">
                            <h3 className="text-4xl font-bold text-left mb-2">{movie?.judul}</h3>
                            <div className=" text-left italic">
                                <p>{movie?.deskripsi}</p>
                                <br />
                                {/* <span>
                                    {movie.genres?.map((genre) => genre.genreName).join(", ")}
                                </span> */}
                            </div>
                            <div className="flex gap-3 flex-col items-start">
                                <div className="text-lg font-bold text-white">
                                    {/* <i class="fas fa-calendar-alt" style={{ margin: "5px" }}></i> */}
                                    <span>Release Date : <span className="text-[#0e0]">{movie?.tangal_rilis.slice(0, 10)}</span></span>
                                </div>
                                <div className="text-sm text-[#9aace5] my-[5px]">
                                    {/* <i style={{ margin: "5px" }}></i> */}
                                    {/* <span>{movie.duration}</span> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Booking Section */}
            <section className="py-[47px] px-0 border border-[#17305f] bg-[#032055] mb-9">
                <div className="max-w-[960px] w-full px-[15px] mx-auto">
                    <div
                        className="flex items-center justify-between"
                        style={{ marginLeft: "25%" }}
                    >
                        <div>
                            <div className="flex flex-col">
                                <div className="flex gap-3 items-center">
                                    <h5 className="text-2xl font-bold">{movie?.rating}</h5>
                                    <div className="flex gap-1">
                                        <i className="fas fa-heart"></i>
                                        <i className="fas fa-heart"></i>
                                        <i className="fas fa-heart"></i>
                                        <i className="fas fa-heart"></i>
                                        <i className="fas fa-heart"></i>
                                    </div>
                                </div>
                                <p className="italic">Users Rating</p>
                            </div>
                        </div>
                        <Link
                            to={`/seat/${selected?.ID}`}
                            className={!selected && "pointer-events-none"}
                        >
                            <button
                                type="button"
                                className={`font-semibold text-white text-base uppercase 
                bg-gradient-to-r from-[#ff4343] via-[#8e52aa] to-[#5560ff] rounded-[30px] h-[50px] w-auto px-[30px] hover:shadow-[0_10px_15px_0_rgba(59,55,188,0.5)] transition duration-300 ${!selected && "bg-gray-500 bg-none"
                                    }`}
                            >
                                Book Tickets
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
            {/* Bioskop section */}
            <section className={`w-5/6 m-auto flex flex-col gap-10 pb-10`}>
                <h2 className="text-4xl font-bold text-left mb-7">Pilih studio</h2>
                {/* looping daftar studio */}
                {["Cinematic", "Laskar", "Garuda"].map((studio, i) => (
                    <div key={i}>
                        <h3 className="py-[15px] text-xl font-bold border border-[#17305f] border-x-0 mb-2">
                            Bioskop {studio}
                        </h3>
                        <div className="flex flex-wrap justify-start gap-3">
                            {schedules?.filter((schedule) => schedule.studio_id === i + 1).map((schedule) => (
                                <button
                                    
                                    key={schedule.ID}
                                    onClick={() => {
                                        selected == schedule?(setSelected(null)):(setSelected(schedule))
                                    }}
                                    className={`py-2 px-5 border border-[#17305f] rounded cursor-pointer active:bg-red-500
                                    ${schedule === selected ? "bg-purple-500 hover:bg-purple-400":"hover:bg-green-400"}`}
                                >
                                    {new Date(
                                        `${schedule.tanggal}T${schedule.jam}`
                                    ).toLocaleString("id-ID", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}{" "}
                                    WIB
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </>
    )
}