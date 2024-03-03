import Navbar from "../components/navbarHomePage";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CloseImg from "../../public/images/x.png"

const UpdatePost = () => {
    const [album, setAlbum] = useState([]);
    const [file, setFile] = useState("");
    const [judul, setJudul] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [albumId, setAlbumId] = useState("");
    const [id, setId] = useState("");
    const [preview, setPreview] = useState("");
    const [token, setToken] = useState("");
    const { fotoId } = useParams(); 
    const date = new Date();
    const navigate = useNavigate();
    const lokasi = window.location.pathname;

    useEffect(() => {
        getToken();
        getAlbum();
        getImage();
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

    const getImage = async () => {
        const response = await axios.get(`http://localhost:5000/image/${fotoId}`);
        setJudul(response.data.JudulFoto);
        setDeskripsi(response.data.DeskripsiFoto);
        setFile(response.data.LokasiFile);
        setPreview(`http://localhost:5000/images/${response.data.LokasiFile}`);
        setAlbumId(response.data.AlbumID);
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

    const updateFoto = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("judul", judul);
        formData.append("deskripsi", deskripsi);
        formData.append("foto", file);
        formData.append("albumId", albumId);
        const response =  await axios.patch(`http://localhost:5000/image/${fotoId}`, formData, {
                headers: {
                    "Content-type": "multipart/form-data",
                }
            });
        window.location.reload();
        console.log(response)
    }

    const deleteFoto = async (e) => {
        await axios.delete(`http://localhost:5000/image/${fotoId}`)
        navigate("/account");
    }

    return (
        <>
            <Navbar />
            <div className="h-screen mt-[90px] pl-[5%]">
                <div className=" flex items-end">
                    <a href="/account" className=" flex items-start">
                        <img src={CloseImg} alt="" className="w-[30px]"/>
                    </a>
                </div>
                <form onSubmit={updateFoto} className=" flex flex-row pt-10 pl-[15%] pb-[30px]">
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
                        <div className="flex flex-row ml-32 mt-2">
                            <button className="w-[251px] h-[53px] bg-red-500 rounded-[50px] text-white text-2xl font-LeagueSpartan mx-auto">Edit Post</button>
                            <div className="w-[251px] h-[53px] bg-white border border-red-500 rounded-[50px] text-red-500 text-2xl font-LeagueSpartan mx-auto pt-2 text-center ml-2" onClick={deleteFoto}>Delete Foto</div>
                        </div>
                        
                    </div>
                </form>
            </div>
        </>
    )
}

export default UpdatePost;