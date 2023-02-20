import React, { useEffect, useState } from "react";
import Banner from "../assets/banner.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import { API } from "../api/api";
import { useMutation, useQuery } from "react-query";

export const Content = () => {
    const navigate = useNavigate();
    const [buttons, setButtons] = useState("All Movies");
    const [filters, setFilters] = useState("");
    const [category, setCategory] = useState("");

    let { data: films } = useQuery("filmsCache", async () => {
        const response = await API.get("/films");
        return response.data.data;
    });
    const handleSubmitFilter = useMutation(async (e) => {
        try {
            e.preventDefault();
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const responseFilter = await API.get(
                "/filtercategory?category=" + category,
                config
            );
            if (responseFilter.data.data != null) {
                setFilters(responseFilter.data.data);
            }
            console.log(responseFilter.data.data);
        } catch (error) {
            console.log(error);
        }
    });
    useEffect(() => {}, [filters]);
    const result = filters ? filters : films;
    return (
        <div className="pb-[10rem]">
            <div className="bg-black flex justify-center  my-[5rem]">
                <div className="absolute  left-[24rem] space-y-[2rem]  mt-[2.5rem]">
                    <div className="space-y-[-37px] text-[4rem] font-semibold">
                        <p className="text-btnPink ">DEAD </p>
                        <p>POOL </p>
                    </div>
                    <div className="font-bold text-[1.2rem]">
                        <p className="text-white">Action</p>
                        <p className="text-btnPink ">Rp.99.000</p>
                    </div>
                    <article className="w-[50rem] text-white leading-[2rem]">
                        Hold onto your chimichangas, folks. From the studio that
                        brought you all 3 Taken films comes the block-busting,
                        fourth-wall-breaking masterpiece about Marvel Comics’
                        sexiest anti-hero! Starring God’s perfect idiot Ryan
                        Reynolds and a bunch of other "actors," DEADPOOL is a
                        giddy slice of awesomeness packed with more twists than
                        Deadpool’s enemies’ intestines and more action than prom
                        night. Amazeballs!
                    </article>
                </div>
                <div className=" flex justify-center  w-full">
                    <img src={Banner} className="w-[100rem] " />
                </div>
            </div>
            <div className="mx-[10rem] ">
                <h1 className="">List Film</h1>
                <div className="w-full my-[3rem] mb-[3rem] ">
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={13}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper flex"
                    >
                        {films?.map((value) => {
                            return (
                                <SwiperSlide>
                                    <img
                                        onClick={() =>
                                            navigate(`DetailFilm/${value.ID}`)
                                        }
                                        className="w-[400px]"
                                        src={value.thumbnail}
                                        alt="img"
                                    />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};
