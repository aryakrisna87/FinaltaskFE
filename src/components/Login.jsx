import React, { useContext, useEffect, useState } from "react";
import movieIc from "../assets/movieIc.svg";
import { Modal, Button, TextInput, Dropdown, Avatar } from "flowbite-react";
import profilePic from "../assets/acountLogo.png";
import Clapper from "../assets/clapperboard.svg";
import Logout from "../assets/logout.svg";
import User from "../assets/user.svg";
import Layer from "../assets/Layer.svg";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../api/api";
import { FilmsContext } from "../context/filmsContext";

export const Login = () => {
    const navigate = useNavigate();
    const { setUsers, login, setLogin, setRegister } = useContext(FilmsContext);
    const [formLogIn, setformLogIn] = useState({
        email: "",
        password: "",
    });
    const { email, password } = formLogIn;
    const handleChangeLogIn = (e) => {
        setformLogIn({
            ...formLogIn,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmitLogin = useMutation(async (e) => {
        try {
            e.preventDefault();
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const body = JSON.stringify(formLogIn);
            const responseLogin = await API.post("/login", body, config);
            setformLogIn({
                email: "",
                password: "",
            });

            setLogin(false);
            localStorage.setItem("Email", responseLogin.data.data.email);
            setUsers(responseLogin.data.data.email);
            console.log("ini email", responseLogin.data.data.email);
            alert("Log-In Sukses");
            localStorage.setItem("token", responseLogin.data.data.token);
            navigate(0);
        } catch (error) {
            alert("either password or email is incorrect");

            console.log(error);
        }
    });
    return (
        <div className="grid grid-cols-2 gap-5  content-center">
            <React.Fragment>
                <button
                    onClick={() => setLogin(true)}
                    className="px-[2.5rem] cursor-pointer rounded-lg  px-[.8rem] h-[3rem] w-[9rem] font-bold"
                >
                    Login
                </button>

                <Modal
                    show={login}
                    size="md"
                    popup={true}
                    onClose={() => setLogin(false)}
                >
                    <Modal.Body className="bg-black rounded-lg">
                        <Modal.Header />
                        <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                            <h3 className="text-[3rem] font-bold text-btnPink dark:text-white">
                                Login
                            </h3>

                            <form
                                className="space-y-[1rem]"
                                onSubmit={(e) => handleSubmitLogin.mutate(e)}
                                action=""
                            >
                                <TextInput
                                    onChange={handleChangeLogIn}
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    required={true}
                                />
                                <TextInput
                                    placeholder="Password"
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={handleChangeLogIn}
                                    required={true}
                                />
                                <Button
                                    type="submit"
                                    className="bg-btnPink w-full"
                                >
                                    Login
                                </Button>
                            </form>

                            <div className="flex w-full justify-center text-sm font-medium text-white">
                                Don't have an account?click &nbsp;
                                <span
                                    onClick={() => {
                                        setRegister(true);
                                        setLogin(false);
                                    }}
                                    className="cursor-pointer"
                                >
                                    here
                                </span>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </React.Fragment>
        </div>
    );
};
