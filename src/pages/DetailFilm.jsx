import React, { useState, useEffect } from "react";
import Iframe from "react-iframe";
import { Navbar } from "../components/Navbar";
import { Modal, TextInput } from "flowbite-react";
import Sheet from "../assets/sheet.svg";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { API } from "../api/api";
import jwt from "jwt-decode";
import moment from "moment/";
export const DetailFilm = () => {
    const today = moment().format(" D MMMM YYYY");
    const getToken = localStorage.getItem("token");
    const decode = jwt(getToken);
    const userId = decode.id;
    const { id } = useParams();
    let { data: film } = useQuery("filmCache", async () => {
        const response = await API.get(`/film/` + id);
        return response.data.data;
    });
    const handleTransaction = useMutation(async () => {
        try {
            const response = await API.post("/createtransaction", {
                status: "pending",
                order_date: today,
                film_id: film.ID,
                user_id: userId,
                price: film.Price,
                title: film.title,
            });
            const tokenBaru = response.data.data.token;
            console.log(
                "habis add transaction tokennnnnn : ",
                response.data.data.token
            );

            window.snap.pay(tokenBaru, {
                onSuccess: function (result) {
                    navigate("/profile");
                },
                onPending: function (result) {
                    navigate("/profile");
                },
                onError: function (result) {},
                onClose: function () {
                    alert("you closed the popup without finishing the payment");
                },
            });
        } catch (error) {}
    });
    useEffect(() => {
        const midtransScriptUrl =
            "https://app.sandbox.midtrans.com/snap/snap.js";
        const myMidtransClientKey = "SB-Mid-client-Deb4TihQZiwlgwHA";

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);
    const user = localStorage.Email;
    const [buy, setBuy] = useState(false);
    return (
        <>
            <Navbar />
            <div class="flex gap-2 bg-black h-[45rem] mx-[5rem] mt-[2rem]">
                <div class="basis-1/3 ">
                    <img
                        class="object-cover h-[30rem] w-[20rem] pt-2"
                        src={film?.thumbnail}
                    />
                </div>

                <div class="basis-2/3">
                    <div class="flex flex-row justify-between items-center pb-7 ">
                        <h2 class="text-[30px] font-bold">{film?.title}</h2>
                        <div>
                            {user == "admin@mail.com" || getToken == null ? (
                                <div></div>
                            ) : (
                                <button
                                    onClick={() => setBuy(true)}
                                    class="bg-btnPink w-[6rem] h-[2rem] rounded-md"
                                    type="button"
                                >
                                    Buy Now
                                </button>
                            )}
                        </div>
                    </div>
                    <Iframe
                        url={film?.FilmUrl}
                        width="840px"
                        height="320px"
                        id=""
                        className=""
                        display="block"
                        position="relative"
                    />

                    <div class="pt-5">
                        <h4 class="text-left text-xl font-semibold ">
                            {film?.category}
                        </h4>
                        <h3 class="text-left py-4 text-orange-500 font-bold">
                            IDR {film?.Price.toLocaleString()}
                        </h3>
                        <p class="leading-normal text-justify">
                            {film?.description}
                        </p>
                    </div>
                </div>

                <Modal
                    show={buy}
                    size="md"
                    popup={true}
                    onClose={() => setBuy(false)}
                >
                    <Modal.Body className="bg-black rounded-lg ">
                        <Modal.Header />
                        <div className="space-y-6  pb-4 sm:pb-6  xl:pb-8">
                            <p className="text-[1.2rem] font-bold text-white text-center">
                                Cinema
                                <span className="text-btnPink">Online</span> :
                                0981312323
                            </p>
                            <div>
                                <div className="my-[2rem] space-y-[.2rem]">
                                    <p className="text-[1.5rem] font-semibold">
                                        {" "}
                                        {film?.title}
                                    </p>
                                    <p className="text-[1rem] font-semibold ">
                                        {" "}
                                        Total :{" "}
                                        <span className="text-btnPink">
                                            Rp.{film?.Price.toLocaleString()}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => handleTransaction.mutate()}
                                className="bg-btnPink w-full rounded-md p-[.3rem]"
                            >
                                PAY
                            </button>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
};
