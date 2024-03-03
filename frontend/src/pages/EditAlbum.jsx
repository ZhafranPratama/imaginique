import Navbar from "../components/navbarHomePage";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CloseImg from "../../public/images/x.png"

const EditAlbum = () => {
    const [album, setAlbum] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const date = new Date();
    const [id, setId] = useState("");
    const { albumId } = useParams();
    const navigate = useNavigate();
    const lokasi = window.location.pathname;

    useEffect(() => {
        getToken();
        getAlbum();
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

    const getAlbum = async () => {
        const response = await axios.get(`http://localhost:5000/album/${albumId}`);
        setAlbum(response.data.NamaAlbum);
        setDeskripsi(response.data.Deskripsi);
    }

    const editAlbum = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("nama", album);
        formData.append("deskripsi", deskripsi);;
        const response = await axios.patch(`http://localhost:5000/album/${albumId}`, formData, {
            headers: {
                "Content-type": "multipart/form-data",
            }
        });
        window.location.reload();
        console.log(response);
    }

    const deleteAlbum = async (e) => {
        await axios.delete(`http://localhost:5000/album/${albumId}`)
        navigate("/account/album");
    }

    return (
        <>
            <Navbar />
            <div className="h-screen mt-[90px] pl-[5%]">
                <div className=" flex items-end">
                    <a href="/account/album" className=" flex items-start">
                        <img src={CloseImg} alt="" className="w-[30px]" />
                    </a>
                </div>
                <div className="flex flex-row">
                    <form onSubmit={editAlbum} className=" flex flex-col pl-[25%] pt-10 ">
                        <label className="text-[25px] font-LeagueSpartan justify-start">Nama Album</label>
                        <input type="text" className="w-[400px] h-[60px] border border-black rounded-[20px] text-[20px] pl-5" placeholder="Nama Album" value={album} onChange={(e) => setAlbum(e.target.value)} />
                        <label className="text-[25px] font-LeagueSpartan justify-start mt-[30px]">Deskripsi</label>
                        <input type="text" className="w-[400px] h-[60px] border border-black rounded-[20px] text-[20px] pl-5" placeholder="Deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
                        <div className="flex flex-row mt-2">
                            <button className="w-[251px] h-[53px] bg-red-500 rounded-[50px] text-white text-2xl font-LeagueSpartan mx-auto mt-[10px] ml-32">Edit Album</button>
                            <div className="w-[251px] h-[53px] bg-white border border-red-500 rounded-[50px] text-red-500 text-2xl font-LeagueSpartan mx-auto mt-2 pt-2 text-center ml-2" onClick={deleteAlbum}>Delete Album</div>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default EditAlbum;