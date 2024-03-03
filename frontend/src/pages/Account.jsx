import Navbar from "../components/navbarHomePage";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Setting from "../../public/images/gear-solid 1.png"

const Account = () => {
    const [username, setUsername] = useState("");
    const [image, setImage] = useState([])
    const lokasi = window.location.pathname;
    const navigate = useNavigate();

    useEffect(() => {
        getToken();
        getImage();
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

    const getImage = async () => {
        const response = await axios.get(`http://localhost:5000/userimage/${(await getToken()).userId}`);
        setImage(response.data);
        console.log(response.data)
    }

    return (
        <>
            <Navbar></Navbar>
            <div className="h-screen mt-[90px]">
                <div className="flex flex-col items-center">
                    <div className=" w-[200px] h-[200px] text-center text-[45pt] font-LeagueSpartan bg-neutral-400 rounded-full items-center pt-[60px]">
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
                            <div className={lokasi === "/account/album  " ? "ml-[27px] self-center text-[20px] font-LeagueSpartan pl-[15px] pr-[15px] pt-[4px] pb-[5px] bg-black text-white rounded-[50px]" : "ml-[20px] pt-1 self-center text-[20px] font-LeagueSpartan pl-[20px]"}>
                                Album
                            </div>
                        </a>
                    </div>
                    <div className="columns-2 gap-4 sm:columns-2 sm:gap-4 md:columns-4 lg:columns-4 mx-[10%] mt-[20px] pb-10">
                        {image.map((post) => (
                            <a href={`/edit/foto/${post.FotoID}`}>
                                <img className="h-auto w-auto rounded-lg mb-4" src={`http://localhost:5000/images/${post.LokasiFile}`} alt="Foto"/>
                            </a>
                        ))}
                    </div>
                </div>
            </div></>
    )
}

export default Account;