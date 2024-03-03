import Navbar from "../components/navbarHomePage";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Setting from "../../public/images/gear-solid 1.png"
import Album from "../../public/images/icons8-album-96.png"

const AccountAlbum = () => {
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [image, setImage] = useState([]);
    const [album, setAlbum] = useState([]);
    const lokasi = window.location.pathname;
    const navigate = useNavigate();

    useEffect(() => {
        getToken();
        getAlbum();
    }, [])

    async function getToken() {
        try {
            const response = await axios.get("http://localhost:5000/token")
            setUsername(response.data.name)
            return response.data
        } catch (e) {
            navigate("/");
            alert("Login terlebih dahulu")
        }
    }

    const getImage = async (fotoId) => {
        const response = await axios.get(`http://localhost:5000/image/${fotoId}}`);
    }

    const getAlbum = async () => {
        const response = await axios.get(`http://localhost:5000/useralbum/${(await getToken()).userId}`);
        const albumsData = response.data;
        // Mendapatkan foto pertama dari setiap album
        const albumsWithFirstPhoto = await Promise.all(
          albumsData.map(async (data) => {
            const photosResponse = await axios.get(`http://localhost:5000/albumimage/${data.AlbumID}`);
            const photosData = photosResponse.data;
            const firstPhoto = photosData[0];
            const namaAlbum = data.NamaAlbum;
            const albumId = data.AlbumID;
            return { firstPhoto, namaAlbum, albumId };
          })
        );
        console.log(albumsWithFirstPhoto);
        setAlbum(albumsWithFirstPhoto);
    }

    return (
        <>
            <Navbar></Navbar>
            <div className="h-screen mt-[90px]">
                <div className="flex flex-col items-center">
                    <div className=" w-[200px] h-[200px] text-center text-[45pt] font-LeagueSpartan bg-neutral-400 rounded-full items-center pt-[45pt]">
                        {username[0]}
                    </div>
                    <div className="flex flex-row items-center">
                        <div className=" font-LeagueSpartan text-[30pt] mt-2">
                            {username}
                        </div>
                        <div className="w-[25px] h-[25px] ml-6">
                            <a href="/setting">
                                <img src={Setting} alt="" />
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-row items-center mt-[40px]">
                        <a href="/account">
                            <div className={lokasi === "/account" ? "self-center text-[20px] font-LeagueSpartan pl-[15px] pr-[15px] pt-[5px] pb-[5px] bg-black text-white rounded-[50px]" : "ml-2 mr-[16px] self-center text-[20px] font-LeagueSpartan pl-[20px]"}>
                                Foto
                            </div>
                        </a>
                        <a href="/account/album">
                            <div className={lokasi === "/account/album" ? "ml-[27px] self-center text-[20px] font-LeagueSpartan pl-[15px] pr-[15px] pt-[5px] pb-[5px] bg-black text-white rounded-[50px]" : "ml-[20px] pt-1 self-center text-[20px] font-LeagueSpartan pl-[20px]"}>
                                Album
                            </div>
                        </a>
                    </div>
                    <div className="grid grid-cols-4 gap-4 mx-[10%] mt-[20px]">
                        {album.map((data) => (
                            <a href={`/edit/album/${data.albumId}`}>
                                <div className={data.firstPhoto?.LokasiFile === undefined ? "w-[200px] h-[200px] bg-neutral-400 text-center pt-[25px] rounded-2xl" : "w-[200px] h-[200px]"}>
                                    <img src={data.firstPhoto?.LokasiFile === undefined ? Album : `http://localhost:5000/images/${data.firstPhoto?.LokasiFile}`} alt="" className={data.firstPhoto?.LokasiFile === undefined ? "mt-[12%] ml-[25%]" : "rounded-2xl mx-auto my-auto h-full w-full object-cover"}/>
                                </div>
                                <div className=" font-LeagueSpartan">
                                    {data.namaAlbum}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div></>
    )
}

export default AccountAlbum;