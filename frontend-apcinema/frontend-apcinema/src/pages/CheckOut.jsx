import { useContext } from "react";
import background from "../assets/background2.png";
// import { useState } from "react";
// import Footer from "../components/Footer";
// import Header from "../components/Header";
// import SectionTitle from "../components/SectionTitle";
// import { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useContext } from "react";
// import { UserContext } from "../App";
// import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";
import { AllContext } from "../App";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CheckOut() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    const navigate = useNavigate();
    const { schedule, setSchedule, bookedSeats, setBookedSeats, price, setPrice } = useContext(AllContext)
    useEffect(() => {
        if (Object.keys(schedule).length === 0) {
            // console.log(schedule);
            navigate("/")
            alert("Maaf anda belum melakukan pemesanan");
        }
    }, [])

    const handleProceed = async (event) => {
        event.preventDefault();

        const response = await fetch("http://localhost:8080/api/post", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                // "Authorization": "Basic SB-Mid-server-vU0LLU6mFIaP0S6fO4EpEVsx",
            },
            body: JSON.stringify({
                "transaction_details": {
                    "order_id": Math.random().toString(),
                    "gross_amount": price
                }
            }),
        })

        const data = await response.json()

        console.log(data);

        try {
            fetch("http://localhost:8080/api/order/add-order", {
                method: 'POST',
                body: JSON.stringify(
                    {
                        "user_id": 1,
                        "showschedule_id": schedule.ID,
                        "total": price,
                        "Chairs": [...bookedSeats.map(bookedSeat => bookedSeat.kode)]
                    }
                )
            }).then(() => {
                setSchedule({})
                setBookedSeats([])
                setPrice(0)
            })
        } catch (error) {
            console.log(error);
        }

        window.location.href = data.redirect_url;
    };

    return (
        <>
            {/* section banner */}
            <section
                // className=""
                style={{ backgroundImage: `url(${background})` }}
                className="details-banner bg_img bg-cover bg-center bg-no-repeat h-[350px] relative "
            >
                <div className="w-full h-full bg-slate-950/40 absolute top-0 left-0"></div>
            </section>
            {/* section book */}
            <section className="py-[40px] bg-[#032055] border border-[#17305f]">
                <div className="max-w-[1170px] w-full px-[15px] py-0 m-auto">
                    <div className="flex items-center justify-between">
                        {/* <Link to={`/movie/${schedule.movie?.id}`}> */}
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
            {/* Checkout */}
            <div className="max-w-[800px] w-4/5 p-[30px] mx-auto mt-[150px] border border-[#11326f] bg-[#032055]">
                <h4 className="text-center border-b border-dashed border-b-[#11326f] uppercase text-2xl pb-[30px] font-bold">
                    booking summery
                </h4>
                <ul className="border-b border-dashed border-b-[#11326f] flex flex-col gap-3 px-3">
                    <li className="uppercase text-left flex flex-col gap-3 py-3">
                        <h6 className="text-2xl font-semibold">{schedule.film?.judul}</h6>
                        <span className="text-[#9aace5] text-sm">
                            {schedule.film?.Genres
                                .map((genre) => genre.nama)
                                .join(", ")}
                        </span>
                    </li>
                    <li className="uppercase text-left flex flex-col gap-3 py-3">
                        <h6 className="text-2xl font-semibold flex justify-between">
                            <span>Bioskop {schedule.studio?.nama}</span>
                            <span>{bookedSeats.length}</span>
                        </h6>
                        <div className="text-[#9aace5] text-sm flex justify-between">
                            <span>
                                {new Date(`${schedule.tanggal}T${schedule.jam}`).toLocaleString(
                                    "id-ID",
                                    {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    }
                                )}{" "}
                                WIB
                            </span>{" "}
                            <span>Tickets</span>
                        </div>
                    </li>
                    <li className="uppercase text-left flex flex-col gap-3 py-3">
                        <h6 className="text-2xl font-semibold flex justify-between">
                            <span>Tickets Price</span>
                            <span>
                                {price.toLocaleString("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                })}
                            </span>
                        </h6>
                    </li>
                </ul>
                <ul className="border-b border-dashed border-b-[#11326f] flex flex-col gap-5 p-3">
                    <li>
                        <span className="text-[#9aace5] text-sm flex justify-between">
                            <span>price</span>
                            <span>
                                {price?.toLocaleString("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                })}
                            </span>
                        </span>
                        <span className="text-[#9aace5] text-sm flex justify-between">
                            <span>Service Fee</span>
                            <span>Rp 3000</span>
                        </span>
                    </li>
                </ul>
                <div className="p-3">
                    <h6 className="text-2xl font-semibold flex justify-between">
                        <span>Amount Payable</span>
                        <span>
                            {(price + 3000).toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            })}
                        </span>
                    </h6>
                    <button
                        onClick={handleProceed}
                        type="button"
                        className="font-semibold text-white text-base uppercase 
                bg-gradient-to-r from-[#ff4343] via-[#8e52aa] to-[#5560ff] rounded-[30px] h-[50px] w-auto px-[50px] hover:shadow-[0_10px_15px_0_rgba(59,55,188,0.5)] transition duration-300 mt-10"
                    >
                        proceed
                    </button>
                </div>
            </div>
        </>
    );
}

export default CheckOut;
