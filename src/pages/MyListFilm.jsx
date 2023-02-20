import React from "react";
import { Navbar } from "../components/Navbar";
import { API } from "../api/api";
import { useQuery } from "react-query";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const MyListFilm = () => {
  const navigate = useNavigate();
  const getToken = localStorage.getItem("token");
  const decode = jwt(getToken);
  let { data: transactions } = useQuery("transactionsCache", async () => {
    const response = await API.get("/transactions");
    return response.data.data;
  });
  return (
    <div className="bg-black  min-h-screen">
      <Navbar />
      <h1 className="my-[5rem] ml-[3rem]">My List Film</h1>
      <div className="flex  justify-center">
        <div className="grid grid-cols-6 w-[70%]  gap-[2rem]  ">
          {transactions?.map((e) => {
            if (e.user_id === decode.id && e.status == "success") {
              return (
                <img
                  onClick={() => navigate(`/DetailFilm/${e.film_id}`, { replace: true })}
                  key={e.id}
                  className=" w-[300px] mb-[2rem]"
                  src={e.film.thumbnail}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};
