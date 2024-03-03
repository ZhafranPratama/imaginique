import Navbar from "../components/navbarHomePage";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Arrow from "../../public/images/arrow.png";
import HeartReg from "../../public/images/heart-regular 1.png";
import HeartSolid from "../../public/images/heart-solid 1.png";
import CloseImg from "../../public/images/x.png"

const Detail = () => {
    const [image, setImage] = useState([]);
    const [userPost, setUserPost] = useState("");
    const [comment, setComment] = useState([]);
    const [like, setLike] = useState([]);
    const [id, setId] = useState("");
    const [username, setUsername] = useState("");
    const [komentar, setKomentar] = useState("");
    const date = new Date();
    const { fotoId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getToken();
        getComment();
        getLike();
        getFoto();
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

    const getFoto = async () => {
        const response = await axios.get(`http://localhost:5000/image/${fotoId}`);
        setImage(response.data);
        setUserPost(response.data.user.Username);
    }

    const getComment = async () => {
        const response = await axios.get(`http://localhost:5000/komentar/${fotoId}`);
        setComment(response.data);
    }

    const getLike = async () => {
        const response = await axios.get(`http://localhost:5000/likedetail/${(await getToken()).userId}/${fotoId}`);
        setLike(response.data);
    }

    const postComment = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fotoId", image.FotoID);
        formData.append("userId", (await getToken()).userId);
        formData.append("isi", komentar);
        formData.append("tanggal", date.toISOString().split('T')[0]);
        try {
            await axios.post("http://localhost:5000/komentar", formData, {
                headers: {
                    "Content-type": "multipart/form-data",
                }
            });
            window.location.reload();
        } catch (error) {
            console.log(error.message);
        }
    }

    const postLike = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fotoId", image.FotoID);
        formData.append("userId", (await getToken()).userId);
        formData.append("tanggal", date.toISOString().split('T')[0]);
        await axios.post("http://localhost:5000/postlike", formData, {
            headers: {
                "Content-type": "multipart/form-data",
            }
        });
        window.location.reload();
        console.log(error.message);
    }

    const delLike = async (e) => {
        e.preventDefault()
        await axios.delete(`http://localhost:5000/like/${(await getToken()).userId}/${fotoId}`);
        window.location.reload();
    }


    return (
        <>
            <Navbar />
            <div className="h-screen mt-[90px] mb-[100px] items-center">
                <div className="flex flex-row ml-[15%]">
                    <div className="flex flex-col w-1/3 h-max">
                        <div className="w-max font-LeagueSpartan text-[40px] font-bold ">{userPost}</div>
                        <img className="h-max w-max rounded-lg mb-[20px]" src={`http://localhost:5000/images/${image.LokasiFile}`} alt="image" />
                    </div>
                    <div className=" flex flex-col items-start pt-[2%] pl-[2%]">
                        <a href="/dashboard" className=" ml-[93%]">
                            <img src={CloseImg} alt="" className="h-[50px]"/>
                        </a>
                        <h1 className=" font-LeagueSpartan text-[35px] font-bold">{image.JudulFoto}</h1>
                        <h2 className=" font-LeagueSpartan text-[20px]">{image.DeskripsiFoto}</h2>
                        <h1 className=" font-LeagueSpartan text-[35px] font-bold">Comments</h1>
                        <div className="w-auto h-[150px] flex flex-col border-none overflow-scroll">
                            {comment.map((komen) => (
                                <div key={komen.KomentarID} className=" flex flex-row pb-3">
                                    <div className="w-[30px] h-[30px] text-center font-LeagueSpartan bg-neutral-400 rounded-full mr-2 pt-[3px]">
                                        {komen.user.Username[0]}
                                    </div>
                                    <div className="font-bold mr-2">
                                        {komen.user.Username}
                                    </div>
                                    <div className="mr-2">
                                        {komen.IsiKomentar}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={like === null ? postLike : delLike} className="items-end pl-[93%]">
                            <button className="items-end">
                                <img src={like === null ? HeartReg : HeartSolid} alt="" className="h-[30px] items-end" />
                            </button>
                        </form>
                        <div className="flex flex-row justify-between pb-4">
                            <div className=" flex items-center">
                                <div className=" w-[40px] h-[40px] text-center text-[15pt] font-LeagueSpartan bg-neutral-400 rounded-full items-center pt-[7px]">
                                    {username[0]}
                                </div>
                            </div>
                            <div className="flex items-center ml-1">
                                <form onSubmit={postComment} className=" flex flex-row">
                                    <input type="text" className="w-[400px] h-[40px] bg-neutral-400 rounded-[20px] text-[20px] pl-5 placeholder-neutral-600" placeholder="Tambakan Komentar" value={komentar} onChange={(e) => setKomentar(e.target.value)} />
                                    <button className="ml-1 w-[50px] h-[40px] bg-red-500 rounded-[50px]">
                                        <img className="w-[25px] h-[25px] ml-3" src={Arrow} alt="" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Detail;