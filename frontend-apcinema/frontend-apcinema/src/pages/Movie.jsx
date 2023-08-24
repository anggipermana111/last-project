import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom"
import video from "../assets/video-button.png"

export default function Movie() {
    const {id} = useParams()
    const [movie, setMovie] = useState()
    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(`http://localhost:8080/api/film/get-film/${id}`)
          .then((response) => response.json())
          .then((data) => {
            // console.log(data.Response);
            setMovie(data.Response)
          });
      }, []);
    return (
        <>
            {/* Banner Section */}
            <section
                style={{ backgroundImage: `url(${movie?.poster})` }}
                className="bg-cover bg-center bg-no-repeat pt-[235px] pb-[20px] relative text-white"
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
                                href={`https://www.youtube.com/embed/${movie?.trailer}`}
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
                                    <span>Release Date : <span className="text-[#0e0]">{movie?.tangal_rilis.slice(0,10)}</span></span>
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
            {/* Bioskop section */}
            <section className="w-5/6 m-auto">
                <h2 className="text-4xl font-bold text-left mb-7">Pilih studio</h2>
                {/* looping daftar studio */}
                {["CGV", "XXI", "Cinema"].map((studio, i) => (
                    <div key={i} className="mb-10">
                        <h3 className="py-[15px] text-xl font-bold border border-[#17305f] border-x-0 mb-2">
                            Bioskop {studio}
                        </h3>
                        {/* <div className="flex flex-wrap justify-start gap-3">
                            {schedules
                                .filter((schedule) => schedule.studio.id === i + 1)
                                .map((schedule) => (
                                    <button
                                        key={schedule.id}
                                        onClick={() => setSelected(schedule)}
                                        className={`py-2 px-5 border border-[#17305f] rounded hover:bg-green-400 cursor-pointer ${schedule === selected && "bg-pink-500"
                                            }`}
                                    >
                                        {new Date(
                                            `${schedule.dates}T${schedule.hours}`
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
                        </div> */}
                    </div>
                ))}
            </section>
        </>
    )
}