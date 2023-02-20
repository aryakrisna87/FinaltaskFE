import React from "react";
import { Navbar } from "../components/Navbar";
import { useMutation, useQuery } from "react-query";
import { API } from "../api/api";
import jwt from "jwt-decode";
import profilePic from "../assets/kanye.jpg";

export const Profile = () => {
  const getToken = localStorage.getItem("token");
  const decode = jwt(getToken);
  const user_id = decode.id;
  let { data: user } = useQuery("userCache", async () => {
    const response = await API.get(`/user/` + user_id);
    return response.data.data;
  });
  let { data: transactions } = useQuery("transactionsCache", async () => {
    const response = await API.get("/transactions");
    return response.data.data;
  });
  const changeColor = (status) => {
    return status === "success"
      ? "bg-payText"
      : status === "pending"
      ? "bg-yellow-300"
      : "bg-red-600";
  };

  return (
    <div className="bg-black min-h-screen ">
      <div className="fixed top-[0rem] w-full bg-black z-30">
        <Navbar />
      </div>
      <div class="flex  justify-between   mx-[9rem] mt-[2rem]">
        <div class="fixed mt-[2rem]">
          <h2 class="text-left text-[40px] pb-[20px] pt-[50px] font-semibold">My Profile</h2>
          <div class="flex flex-row gap-6">
            <div>
              <img class="object-cover h-[20rem] w-[15rem] pt-2" src={profilePic} />
            </div>
            <div class="text-left text-payText font-semibold text-[1.2rem] leading-[2rem] ">
              <div>
                <h4 class="text-orange-500">Fullname</h4>
                <p>{user?.fullname}</p>
              </div>
              <div>
                <h4 class="text-orange-500">Email</h4>
                <p>{user?.email}</p>
              </div>
              <div>
                <h4 class="text-orange-500">Phone</h4>
                <p>{user?.phone}</p>
              </div>
            </div>
          </div>
        </div>
        <div class=" relative  left-[46rem] w-[50%]  pl-[15rem] pt-[4rem] ">
          <h2 class="text-[30px] fixed  bg-black h-[3rem] pb-[30px]  text-left  mt-[1rem] font-bold  w-full">
            History transaction
          </h2>
          <div class=" item-center mt-[100px]   space-y-5 gap-6 ">
            {transactions?.map((e) => {
              if (e.user_id === user_id) {
                return (
                  <div class="block w-[500px] p-6 bg-backGroundPay  rounded ">
                    <div class="text-left">
                      <h5 class=" mb-2 text-2xl font-bold tracking-tight ">{e.title}</h5>
                      <p class=" font-bold">{e.order_date}</p>
                      <p class="font-normal text-orange-500 text-bold pb-[10px] font-semibold">
                        Total IDR. {e.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex justify-end ">
                      <p
                        class={`w-[8rem]  h-[2rem] text-[1.1rem] ${changeColor(
                          e.status
                        )} bg-payText text-center text-green-400  bg-transparent-10 text-black`}
                      >
                        {e.status}
                      </p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
