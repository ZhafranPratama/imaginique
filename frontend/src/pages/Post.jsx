import Navbar from "../components/navbarHomePage";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Post = () => {
    const [album, setAlbum] = useState([]);
    const [file, setFile] = useState("");
    const [judul, setJudul] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [albumId, setAlbumId] = useState("");
    const [id, setId] = useState("");
    const [preview, setPreview] = useState("");
    const [token, setToken] = useState("");
    const date = new Date();
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

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    };

    const getAlbum = async () => {
        const response = await axios.get(`http://localhost:5000/useralbum/${(await getToken()).userId}`);
        console.log(response);
        setAlbum(response.data)
    }

    const postFoto = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("judul", judul);
        formData.append("deskripsi", deskripsi);
        formData.append("tanggal", date.toISOString().split('T')[0]);
        formData.append("foto", file);
        formData.append("albumId", albumId);
        formData.append("userId", (await getToken()).userId);
        const response =  await axios.post("http://localhost:5000/image", formData, {
                headers: {
                    "Content-type": "multipart/form-data",
                }
            });
        window.location.reload();
        console.log(response)
    }

    return (
        <>
            <Navbar />
            <div className="h-screen mt-[90px] ml-10">
                <div className=" flex items-start">
                    <a href="/post" className=" flex items-start">
                        <div className={lokasi === "/post" ? "ml-[14px] self-center text-[20px] font-LeagueSpartan pl-[15px] pr-[15px] pt-[5px] pb-[5px] bg-black text-white rounded-[50px]" : "ml-2 mr-[16px] self-center text-[20px] font-LeagueSpartan pl-[20px]"}>
                            Foto
                        </div>
                    </a>
                    <a href="/album" className=" flex items-start">
                        <div className={lokasi === "/album" ? "ml-[27px] self-center text-[20px] font-LeagueSpartan pl-[15px] pr-[15px] pt-[5px] pb-[5px] bg-black text-white rounded-[50px]" : "ml-[20px] pt-1 self-center text-[20px] font-LeagueSpartan pl-[20px]"}>
                            Album
                        </div>
                    </a>
                </div>
                <form onSubmit={postFoto} className=" flex flex-row pt-10 pl-[15%] pb-[30px]">
                    <div className=" w-1/3 h-max mr-10">
                        {preview ? (
                            <figure className="rounded-2xl mb-3">
                                <img className=" w-full h-1/2 rounded-2xl" src={preview} alt="Preview Image"/>
                            </figure>
                        ) : (
                            <div class="flex items-center justify-center w-[500px] h-[500px]">
                                <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-full rounded-2xl cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-neutral-400 hover:bg-neutral-600 dark:border-neutral-400 dark:hover:bg-neutral-600">
                                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg class="w-8 h-8 mb-4 text-black dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p class="mb-2 text-sm text-black dark:text-black"><span class="font-semibold">Click to upload</span></p>
                                    </div>
                                    <input id="dropzone-file" type="file" class="hidden" onChange={loadImage}/>
                                </label>
                            </div>
                        )}
                        <input type="file" id="selectedFile" className="hidden" onChange={loadImage}/>
                        {preview ? (
                            <label htmlFor="selectedFile" className="bg-red-500 rounded-[50px] text-white text-xl font-LeagueSpartan px-3 py-2">Change photo</label>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className=" flex flex-col items-start ml-20">
                        <label className="text-[25px] font-LeagueSpartan justify-start">Judul</label>
                        <input type="text" className="w-[400px] h-[60px] border border-black rounded-[20px] text-[20px] pl-5" placeholder="Judul" value={judul} onChange={(e) => setJudul(e.target.value)} />
                        <label className="text-[25px] font-LeagueSpartan justify-start mt-[30px]">Deskripsi</label>
                        <input type="text" className="w-[400px] h-[60px] border border-black rounded-[20px] text-[20px] pl-5" placeholder="Deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
                        <label className="label text-[25px] font-LeagueSpartan justify-start mt-[30px]">Album</label>
                        <div class="select">
                            <select value={albumId} onChange={(e) => setAlbumId(e.target.value)}>
                                <option>Select</option>
                                {album.map((list) => (
                                    <option value={list.AlbumID}>{list.NamaAlbum}</option>
                                ))}
                            </select>
                        </div>
                        <button className="w-[251px] h-[53px] bg-red-500 rounded-[50px] text-white text-2xl font-LeagueSpartan mx-auto mt-[50px]">Upload</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Post;