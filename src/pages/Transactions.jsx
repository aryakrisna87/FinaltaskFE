import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { API } from "../api/api";
import { useQuery } from "react-query";

const Transactions = () => {
  let { data: transactions } = useQuery("transactionsCache", async () => {
    const response = await API.get("/transactions");
    return response.data.data;
  });
  const [num, setNum] = useState(1);
  const changeColor = (status) => {
    return status === "success"
      ? "text-green-500"
      : status === "pending"
      ? "text-yellow-300"
      : "text-red-600";
  };
  return (
    <div className="min-h-screen ">
      <Navbar />
      <h2 class="text-left text-[30px] ml-[3rem] mt-[3rem] font-bold">Incoming Transaction</h2>
      <div className="w-full flex justify-start mt-[7rem]">
        <table class=" ml-[5rem]  w-[60rem]  text-sm text-left bg-yellow-200">
          <thead class="text-xs text-orange-500 uppercase bg-gray-50 ">
            <tr className="bg-inputBg">
              <th scope="col" class="px-6 py-3">
                No.
              </th>
              <th scope="col" class="px-6 py-3">
                User Name
              </th>
              <th scope="col" class="px-6 py-3">
                Movie
              </th>
              <th scope="col" class="px-6 py-3">
                Order Date
              </th>
              <th scope="col" class="px-6 py-3">
                Status Payment
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions?.map((e, i) => {
              //   const [num, setNum] = useState(1);
              return (
                <tr class="bg-payText border-b ">
                  <td class="px-6 py-4 pl-[30px] "> {i + 1}</td>
                  <td scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                    {e.user.fullname}
                  </td>
                  <td class="px-6 py-4 ">{e.film.title} </td>
                  <td class="px-6 py-4  ">{e.order_date}</td>
                  <td class={`px-6 py-4  ${changeColor(e.status)} `}>{e.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
