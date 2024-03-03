import Navbar from "../components/navbarHomePage";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Album = () => {
    const [album, setAlbum] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const date = new Date();
    const [id, setId] = useState("");
    const navigate = useNavigate();
    const lokasi = window.location.pathname;

    useEffect(() => {
        getToken();
    }, [])

    async function getToken() {
        try {
            const response = await axios.get("http://localhost:5000/token");
            return response.data
        } catch (e) {
            navigate("/");
            alert("Login terlebih dahulu")
        }
    }

    const postAlbum = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("nama", album);
        formData.append("deskripsi", deskripsi);
        formData.append("tanggal", date.toISOString().split('T')[0]);
        formData.append("userId",(await getToken()).userId);
        const response = await axios.post("http://localhost:5000/album", formData, {
            headers: {
                "Content-type": "multipart/form-data",
            }
        });
        window.location.reload();
        console.log(response);
    }

    return (
        <>
            <Navbar />
            <div className="h-screen mt-[90px] ml-10">
                <div className=" flex items-start">
                    <a href="/post" className=" flex items-start">
                        <div className={lokasi === "/post" ? "ml-[14px] self-center text-[20px] font-LeagueSpartan pl-[15px] pr-[15px] pt-[5px] pb-[5px] bg-black text-white rounded-[50px]" : "ml-2 mr-[16px] pt-1 self-center text-[20px] font-LeagueSpartan pl-[20px]"}>
                            Foto
                        </div>
                    </a>
                    <a href="/album" className=" flex items-start">
                        <div className={lokasi === "/album" ? "ml-[27px] self-center text-[20px] font-LeagueSpartan pl-[15px] pr-[15px] pt-[5px] pb-[5px] bg-black text-white rounded-[50px]" : "ml-[20px] self-center text-[20px] font-LeagueSpartan pl-[20px]"}>
                            Album
                        </div>
                    </a>
                </div>
                <form onSubmit={postAlbum} className=" flex flex-col pl-[25%] pt-10">
                    <label className="text-[25px] font-LeagueSpartan justify-start">Nama Album</label>
                    <input type="text" className="w-[400px] h-[60px] border border-black rounded-[20px] text-[20px] pl-5" placeholder="Nama Album" value={album} onChange={(e) => setAlbum(e.target.value)} />
                    <label className="text-[25px] font-LeagueSpartan justify-start mt-[30px]">Deskripsi</label>
                    <input type="text" className="w-[400px] h-[60px] border border-black rounded-[20px] text-[20px] pl-5" placeholder="Deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
                    <button className="w-[251px] h-[53px] bg-red-500 rounded-[50px] text-white text-2xl font-LeagueSpartan mx-auto mt-[50px]">Buat Album</button>
                </form>
            </div>
        </>
    )
}

export default Album;