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
export const Register = () => {
    const { setLogin, register, setRegister } = useContext(FilmsContext);

    const [formRegis, setFormRegis] = useState({
        fullname: "",
        email: "",
        password: "",
        phone: "",
    });
    const { fullname, email, password, phone } = formRegis;
    const handleChangeRegis = (e) => {
        setFormRegis({
            ...formRegis,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmitRegis = useMutation(async (e) => {
        try {
            e.preventDefault();
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const body = JSON.stringify(formRegis);
            const response = await API.post("/register", body, config);
            setFormRegis({
                fullname: "",
                email: "",
                password: "",
                phone: "",
            });
            alert("Register Berhasil");
            console.log(response);
            setRegister(false);
            setLogin(true);
        } catch (err) {
            alert("Maaf Email Sudah dipakai");
            console.log(err);
        }
    });

    return (
        <div className="grid grid-cols-2 gap-5  content-center">
            <React.Fragment>
                <button
                    onClick={() => setRegister(true)}
                    className="px-[2.5rem] cursor-pointer rounded-lg bg-btnPink px-[.8rem] h-[3rem] w-[9rem] font-bold"
                >
                    Register
                </button>

                <Modal
                    show={register}
                    size="md"
                    popup={true}
                    onClose={() => setRegister(false)}
                >
                    <Modal.Body className="bg-black rounded-lg">
                        <Modal.Header />
                        <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                            <h3 className="text-[3rem] font-bold text-btnPink dark:text-white">
                                Register
                            </h3>

                            <form onSubmit={(e) => handleSubmitRegis.mutate(e)}>
                                <div className="space-y-[1rem]">
                                    <TextInput
                                        onChange={handleChangeRegis}
                                        id="fullname"
                                        name="fullname"
                                        placeholder="Full Name"
                                        required={true}
                                    />
                                    <TextInput
                                        onChange={handleChangeRegis}
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        required={true}
                                    />
                                    <TextInput
                                        onChange={handleChangeRegis}
                                        id="phone"
                                        name="phone"
                                        placeholder="Phone"
                                        required={true}
                                    />
                                    <TextInput
                                        onChange={handleChangeRegis}
                                        placeholder="Password"
                                        id="password"
                                        type="password"
                                        name="password"
                                        required={true}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="bg-btnPink mt-[.5rem] w-full"
                                >
                                    Register
                                </Button>
                            </form>

                            <div className="flex w-full justify-center text-sm font-medium text-white">
                                Already have an account?click &nbsp;
                                <span
                                    onClick={() => {
                                        setRegister(false);
                                        setLogin(true);
                                    }}
                                    className="cursor-pointer "
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
