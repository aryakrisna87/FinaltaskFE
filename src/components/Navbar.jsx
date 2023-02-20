import React from "react";
import movieIc from "../assets/movieIc.svg";
import { Dropdown, Avatar } from "flowbite-react";
import profilePic from "../assets/kanye.jpg";
import Clapper from "../assets/clapperboard.svg";
import Logout from "../assets/logout.svg";
import User from "../assets/user.svg";
import Layer from "../assets/Layer.svg";
import { useNavigate } from "react-router-dom";
import { Register } from "./Register";
import { Login } from "./Login";
import Sheet from "../assets/sheet.svg";

const AfterLogin = () => {
  const user = localStorage.Email;
  const navigate = useNavigate();
  const admin = "adminhb";

  return (
    <div className="bg-black text-white py-5">
      <Dropdown
        color="black"
        arrowIcon={false}
        inline={true}
        label={<Avatar rounded={true} img={profilePic} bordered={true} color="pink" size="lg" />}
      >
        <div className="border-none  w-[12rem]">
          {user == "admin@mail.com" ? (
            <div>
              <Dropdown.Item className="bg-red" onClick={() => navigate("/AddFilm")}>
                <img className="w-[20px]" src={Layer} /> &nbsp; Add Film
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/Transactions")}>
                <img className="w-[20px] text-btnPink" src={Sheet} /> Incoming Transactions
              </Dropdown.Item>
            </div>
          ) : (
            <div>
              <Dropdown.Item onClick={() => navigate("/Profile")}>
                <img className="w-[20px]" src={User} /> &nbsp;Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/MyListFilm")}>
                <img className="w-[20px]" src={Clapper} /> &nbsp; My List Film
              </Dropdown.Item>
            </div>
          )}
          <Dropdown.Item
            onClick={() => {
              navigate("/");
              localStorage.removeItem("token");
            }}
          >
            <img className="w-[20px]" src={Logout} /> &nbsp; Logout
          </Dropdown.Item>
        </div>
      </Dropdown>
    </div>
  );
};

export const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  return (
    <div className="bg-black flex justify-between h-[7rem] mx-[3rem]  ">
      <img onClick={() => navigate("/")} className="cursor-pointer" src={movieIc} alt="icMovie" />
      {token ? (
        <div className="mr-[2rem]">
          <AfterLogin />
        </div>
      ) : (
        <div className="flex">
          <Login />
          <Register />
        </div>
      )}
    </div>
  );
};
export { AfterLogin, Register };
