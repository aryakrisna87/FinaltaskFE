import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import Frame from "../assets/frame.svg";
import { useMutation } from "react-query";
import { API } from "../api/api";
import { useNavigate } from "react-router-dom";

export const AddFilm = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        thumbnail: "",
        price: "",
        film_url: "",
        description: "",
    });
    const [preview, setPreview] = useState(null);
    const handleChange = (e) => {
        const { name, type, value } = e.target;
        setForm({
            ...form,
            [name]: type === "file" ? e.target.files : e.target.value,
        });
        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            // console.log("ini data blob", url);
            setPreview(url);
        }
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append("title", form.title);
            formData.append("price", form.price);
            formData.append("film_url", form.film_url);
            formData.append("description", form.description);
            formData.append("thumbnail", form.thumbnail[0]);

            const response = await API.post("/addfilm", formData);
            alert("Sukses menambahkan film");

            // console.log("berhasil menambahkan film", response);
            if (response) {
                navigate("/");
            }
        } catch (err) {
            alert(err);
            // console.log("gagal upload film", err);
        }
    });
    return (
        <div className="">
            <Navbar />
            <h1 className="my-[1rem] ml-[2rem] font-semibold">Add Film</h1>
            <div className="flex justify-center align-middle">
                <div className=" w-[40%] ">
                    {" "}
                    <form
                        onSubmit={(e) => handleSubmit.mutate(e)}
                        className=" space-y-[1rem] text-[1.21rem]"
                        action=""
                    >
                        <div className="my-[1rem] flex justify-center   ">
                            <img
                                className="w-[300px]  p-[12px] border-[5px] border-white  h-[300px]"
                                src={preview}
                                alt="preview here"
                            />
                        </div>
                        <div className="flex gap-2 justify-between w-full ">
                            <input
                                className="w-full text-[1.2rem] border border-white rounded-lg"
                                id="title"
                                placeholder="Title"
                                name="title"
                                value={form.title}
                                required={true}
                                onChange={handleChange}
                            />

                            <label
                                className=" border-[.1rem] bg-inputBg text-placeHolder border-white rounded-lg flex justify-between w-[15rem]"
                                for="thumbnail"
                            >
                                <img src={Frame} alt="" />
                                Attach Thumbnail
                            </label>
                            <input
                                hidden
                                id="thumbnail"
                                className="bg-white text-black"
                                type="file"
                                name="thumbnail"
                                onChange={handleChange}
                            />
                        </div>
                        <input
                            className="w-full text-[1.2rem] border border-white rounded-lg"
                            id="price"
                            placeholder="Price"
                            required={true}
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                        />
                        <input
                            className="w-full focus:border-red text-[1.2rem] border border-white rounded-lg"
                            id="film_url"
                            placeholder="Link File"
                            name="film_url"
                            value={form.film_url}
                            required={true}
                            onChange={handleChange}
                        />
                        <textarea
                            className="w-full bg-transparent text-[1.2rem] border border-white rounded-lg"
                            id="description"
                            placeholder="Description"
                            required={true}
                            name="description"
                            onChange={handleChange}
                            value={form.description}
                            style={{ resize: "none" }}
                        />
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-btnPink w-[7rem] py-[.3rem] rounded-lg"
                            >
                                Add Film
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
