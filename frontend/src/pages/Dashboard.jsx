import Navbar from "../components/navbarHomePage";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [userId, setUserId] = useState("");
    const [image, setImage] = useState([])
    const navigate = useNavigate();

    useEffect(()=>{
        getToken();
        getImage();
    },[])

    async function getToken () {
        try{
            const response = await axios.get("http://localhost:5000/token")
            return response.data.userId
        }catch(e){
            navigate("/");
            alert("Login terlebih dahulu")
        }
     }

    const getImage = async () => {
        const response = await axios.get("http://localhost:5000/image");
        setImage(response.data);
        console.log(response.data)
    }

    return (
        <>
            <Navbar></Navbar>
            <div className="h-screen mt-[90px] mx-[5%]">
                    <div className="columns-2 gap-4 sm:columns-2 sm:gap-4 md:columns-4 lg:columns-4 pb-10">
                        {image.map((post) => (
                            <a href={`/detail/${post.FotoID}`}>
                                <img className="h-auto w-auto rounded-lg mb-4" src={`http://localhost:5000/images/${post.LokasiFile}`} alt="Foto"/>
                            </a>
                        ))}
                    </div>
                </div>
        </>
    )
}

export default Dashboard;