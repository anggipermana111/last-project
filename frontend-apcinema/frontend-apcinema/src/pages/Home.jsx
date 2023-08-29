import { useContext } from "react"
import banner2 from "../assets/background2.png"
import { AllContext } from "../App"
import { Link } from "react-router-dom"
import { useEffect } from "react"

export default function Home() {
  useEffect(()=>{
    window.scrollTo(0, 0);
},[])
  const { theme, movies } = useContext(AllContext)

  return (
    <>
      {/* Section Banner */}
      <section className="px-0 py-40 sm:py-44 md:py-52 lg:py-56 relative">
        <div
          className={`absolute top-0 left-0 bottom-0 right-0 bg-fixed bg-cover bg-center bg-no-repeat before:absolute before:top-0 before:left-0 before:bottom-0 before:right-0 banner-${theme}`}
          style={{ backgroundImage: `url(${banner2})` }}
        ></div>
        <div className="w-full px-[15px] mx-auto">
          <div className="relative z-10 my-0 mx-auto text-center max-w-[840px] text-white">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] uppercase mb-[18px] font-[800]">
              <span className="py-1 px-0 block">
                cinematic <span className="text-[#0e0]">screen</span>
              </span>{" "}
              <span className="py-1 px-0 block">
                your <span className="text-[#e0e]">happiness</span>
              </span>
            </h1>
            <p className="text-xs md:text-sm">
              Safe, secure, reliable ticketing.Your ticket to live
              entertainment!
            </p>
          </div>
        </div>
      </section>

      {/* section movie */}
      <section className={`py-[120px] movie-${theme} text-${theme} border-t border-t-gray-600`}>
        <div className="max-w-sm px-10 sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl w-full mx-auto">
          <div>
            <div className="flex justify-between items-center mb-[60px]">
              <div className="flex flex-col items-start">
                <h2 className="text-3xl uppercase mb-[19px] sm:text-4xl md:text-[50px] leading-[60px] -mt-[13px] font-bold">
                  movies
                </h2>
                <p className="-mb-[8px] -mt-[11px]">
                  Be sure not to miss these Movies today.
                </p>
              </div>
            </div>
            {/* tab area movie */}
            <div className="grid cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* looping movie */}
              {movies.map((movie) => {
                return (
                  <Link
                    key={movie.ID}
                    to={`/movie/${movie.ID}`}
                    className={`relative film-${theme} text-white cursor-pointer rounded-md overflow-hidden`}
                  >
                    <img src={movie.poster} alt=""/>
                    <div className="absolute bottom-0 px-3 pb-10 bg-gradient-to-b from-slate-500/10 via-slate-700/30 hover:via-slate-500/30 to-slate-900/70 hover:to-slate-700/70 w-full h-full flex justify-end flex-col gap-3">
                      <h1 className="text-3xl font-bold">{movie.judul}</h1>
                      <p className="italic">
                      {movie.Genres.map((genre) => genre.nama).join(", ")}
                      </p>
                    </div>
                    {/* <div className="py-4 px-2">
                      {movie.genres.map((genre) => genre.genreName).join(", ")}
                    </div> */}
                  </Link>
                );
              })}

              {/* end looping */}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}