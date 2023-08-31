import { Link } from "react-router-dom";
import layar from "../assets/screen-thumb.png";
import proceed from "../assets/movie-bg-proceed.jpg";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import SectionTitle from "../components/SectionTitle";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AllContext } from "../App";

function Seat() {
    const { id } = useParams();

    //   const [selected, setSelected] = useState(undefined);
    // untuk menampung data jadwal tayang
    //   untuk menampung kursi yang sudah dipesan
    const [seats, setSeats] = useState([]);
    const [apiSeats, setApiSeats] = useState([])
    
    //   
    const { bookedSeats, setBookedSeats, schedule, setSchedule, price, setPrice } = useContext(AllContext)

    useEffect(()=>{
        setBookedSeats([])
        setSchedule({})
        setPrice(0)
    },[])

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(`http://localhost:8080/api/schedule/get-schedule-by-id/${id}`)
            .then((response) => response.json())
            .then((schedule) => setSchedule(schedule.Response));
    }, []);

    useEffect(() => {
        fetch(
            `http://localhost:8080/api/chair/get-booked-chair/${id}`
        )
            .then((response) => response.json())
            .then((seats) => setSeats(seats.Response));
    }, []);

    useEffect(() => {
        fetch(
            `http://localhost:8080/api/chair/get-chair`
        )
            .then((response) => response.json())
            .then((apiSeats) => setApiSeats(apiSeats.Response));
    }, []);

    useEffect(() => {
        const totalHarga = bookedSeats.reduce((total, bookedSeat) => total + bookedSeat.harga, 0)
        setPrice(totalHarga);
    }, [bookedSeats])

    return (
        <>
            {/* section banner */}
            <section
                className="pt-[212px] pb-[112px] relative bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${schedule.film?.poster})` }}
            >
                <div className="w-full h-full bg-[rgba(46,42,105,0.78)] absolute top-0 left-0"></div>
                <div className="max-w-[1170px] w-full px-[15px] mx-auto">
                    <div className="relative z-10">
                        <div className="text-center">
                            <h3 className="capitalize text-[40px] mb-2 leading-tight font-bold">
                                {schedule.film?.judul}
                            </h3>
                            <div className="text-center italic">
                                {schedule.film?.Genres?.map((genre) => genre.nama)
                                    .join(", ")}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* section title */}
            <section className="py-[40px] bg-[#032055] border border-[#17305f]">
                <div className="max-w-[1170px] w-full px-[15px] py-0 m-auto">
                    <div className="flex items-center justify-between">
                        {/* <Link to={`/movie/${schedule.film?.ID}`}> */}
                        <button
                            type="button"
                            className="font-semibold text-white text-base uppercase 
                bg-gradient-to-r from-[#ff4343] via-[#8e52aa] to-[#5560ff] rounded-[30px] h-[40px] w-auto pr-[30px] pl-[25px] hover:shadow-[0_10px_15px_0_rgba(59,55,188,0.5)] transition duration-300"
                            onClick={() => {
                                history.back()
                            }}
                        >
                            {"<< "}Back
                        </button>
                        {/* </Link> */}
                        <span className="text-center font-bold text-2xl uppercase">
                            Bioskop {schedule.studio?.nama}
                        </span>
                        <span className="text-center font-bold">{new Date(
                            `${schedule.tanggal}T${schedule.jam}`
                        ).toLocaleString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })} WIB</span>
                    </div>
                </div>
            </section>


            {/* Section Movie */}
            <section className="py-[120px]">
                <div className="max-w-[1170px] w-full px-[15px] mx-auto">
                    <div className=" mb-16">
                        <h4 className="uppercase border border-[#17305f] border-x-0 text-4xl font-bold w-1/4 py-3 m-auto mb-12 text-center">
                            Screen
                        </h4>
                        <div className="flex justify-center mb-16">
                            <img src={layar} alt="" />
                        </div>
                        <h4 className="uppercase border border-[#17305f] border-x-0 text-3xl text-blue-400 font-semibold w-1/4 py-3 m-auto mb-12 flex flex-col gap-1 items-center">
                            <span className="block">Seat</span>
                            <span className="text-xs text-white">
                                {"("}35k / seat{")"}
                            </span>
                        </h4>
                        {/* Looping API */}
                        <div className="flex flex-col gap-6">
                            {["A", "B", "C", "D", "E"].map((baris, i) => (
                                <div key={i} className="flex justify-between w-4/6 m-auto gap-10">
                                    <div className="flex justify-around w-2/5">
                                        {["01", "02", "03", "04", ["05"]].map((kolom, i) => (
                                            <button key={i}
                                                onClick={() => {
                                                    if (!bookedSeats.map(bookedseat => bookedseat.kode).includes(`${baris}${kolom}`)) {
                                                        if (bookedSeats.length < 3) {
                                                            setBookedSeats([
                                                                ...bookedSeats,
                                                                apiSeats.find((apiSeat => apiSeat.kode == `${baris}${kolom}`))
                                                            ]);
                                                        } else {
                                                            alert("Maksimal Pemesanan 3 Kursi!");
                                                        }
                                                    } else {
                                                        setBookedSeats(
                                                            bookedSeats.filter(
                                                                (bookedSeat) =>
                                                                    bookedSeat.kode !== `${baris}${kolom}`
                                                            )
                                                        );

                                                    }
                                                }}
                                                className={`w-[50px] h-[50px] rounded border font-bold flex justify-center items-center ${seats.find((seat) => seat.kode == baris + kolom) &&
                                                    "pointer-events-none bg-slate-600"
                                                    } ${bookedSeats.map(bookedseat => bookedseat.kode).includes(`${baris}${kolom}`) ?
                                                        "bg-purple-600 hover:bg-purple-700" : "hover:bg-blue-400"
                                                    } active:bg-red-600`}
                                            >
                                                <span>
                                                    {baris}
                                                    {kolom}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex justify-around w-2/5">
                                        {["06", "07", "08", "09", "10"].map((kolom, i) => (
                                            <button key={i}
                                                onClick={() => {
                                                    if (!bookedSeats.map(bookedseat => bookedseat.kode).includes(`${baris}${kolom}`)) {
                                                        if (bookedSeats.length < 3) {
                                                            setBookedSeats([
                                                                ...bookedSeats,
                                                                apiSeats.find((apiSeat => apiSeat.kode == `${baris}${kolom}`))
                                                            ]);
                                                        } else {
                                                            alert("Maksimal Pemesanan 3 Kursi!");
                                                        }
                                                    } else {
                                                        setBookedSeats(
                                                            bookedSeats.filter(
                                                                (bookedSeat) =>
                                                                    bookedSeat.kode !== `${baris}${kolom}`
                                                            )
                                                        );
                                                    }
                                                }}
                                                className={`w-[50px] h-[50px] rounded border font-bold flex justify-center items-center ${seats.find((seat) => seat.number == baris + kolom) &&
                                                    "pointer-events-none bg-slate-600"
                                                    } ${bookedSeats.map(bookedseat => bookedseat.kode).includes(`${baris}${kolom}`) ?
                                                        "bg-purple-600 hover:bg-purple-700" : "hover:bg-blue-400"
                                                    } active:bg-red-600`}
                                            >
                                                <span>
                                                    {baris}
                                                    {kolom}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* End Looping API */}
                    </div>

                    <div className="flex justify-center gap-3 mb-14 items-center">
                        <span className="w-[50px] h-[50px] rounded border  font-bold flex justify-center items-center">
                            EX
                        </span>
                        <p className="uppercase">: ready</p>
                        <span className="w-[50px] h-[50px] rounded border  font-bold flex justify-center items-center bg-slate-600">
                            EX
                        </span>
                        <p className="uppercase">: booked</p>
                        <span className="w-[50px] h-[50px] rounded border  font-bold flex justify-center items-center bg-purple-600">
                            EX
                        </span>
                        <p className="uppercase">: choosed</p>
                    </div>

                    <div
                        className="py-[32px] px-[40px] relative bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${proceed})` }}
                    >
                        <div className="w-full h-full bg-[rgba(5,0,104,0.8)] absolute top-0 left-0"></div>
                        <div className="flex justify-between items-center relative z-10">
                            <div className="flex flex-col gap-1">
                                <span className="capitalize font-semibold">
                                    You have Choosed Seat
                                </span>
                                <h3 className="text-blue-400 text-4xl font-bold uppercase text-left">
                                    {bookedSeats.map(bookedseat => bookedseat.kode).join(", ")}
                                </h3>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="capitalize font-semibold">total price</span>
                                <h3 className="text-blue-400 text-4xl font-bold">
                                    {price.toLocaleString("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    })}
                                </h3>
                            </div>
                            <Link
                                // to={!hasLogin ? "/login" : `/checkout/${selected?.id}`}
                                to={`/checkout`}
                                className={bookedSeats.length<=0 ? "pointer-events-none":""}
                            >
                                {/* {setTampId(selected?.id)} */}
                                <button
                                    type="button"
                                    className={`font-semibold text-white text-base uppercase 
                bg-gradient-to-r from-[#ff4343] via-[#8e52aa] to-[#5560ff] rounded-[30px] h-[40px] w-auto px-[30px] hover:shadow-[0_10px_15px_0_rgba(59,55,188,0.5)] transition duration-300 ${bookedSeats.length<=0 && "bg-gray-500 bg-none"
                                        }`}
                                >
                                    Proceed
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Seat;
